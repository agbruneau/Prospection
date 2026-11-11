-- Filtre Lua Pandoc pour le Compendium 2027
-- Gère les boîtes sémantiques (synthese-executive, fil-rouge, encadre-sectoriel, adr),
-- les alertes GitHub (+alerts), les largeurs proportionnelles de tableaux,
-- ainsi que les bannières de parties et sauts de chapitre.

local box_configs = {
  ["synthese-executive"] = { kind = "executive", default_title = "Synthèse exécutive" },
  ["fil-rouge"]          = { kind = "filrouge",  default_title = "Fil rouge — Groupe Boréal" },
  ["encadre-sectoriel"]  = { kind = "sectoriel", default_title = "Éclairage sectoriel" },
  ["adr"]                = { kind = "adr",       default_title = "Décision d'architecture (ADR)" },
  ["note"]               = { kind = "note",      default_title = "Note architecturale" },
  ["important"]          = { kind = "important", default_title = "Point critique" },
  ["tip"]                = { kind = "tip",       default_title = "Pratique recommandée" },
  ["warning"]            = { kind = "warning",   default_title = "Mise en garde" },
  ["caution"]            = { kind = "caution",   default_title = "Risque élevé" },
}

local function escape_typst_string(s)
  if not s then return "" end
  return s:gsub("\\", "\\\\"):gsub('"', '\\"')
end

function Image(el)
  if FORMAT:match("typst") then
    if not el.src:match("^/") and not el.src:match("^https?://") then
      el.src = "/" .. el.src
    end
  end
  return el
end

local function longest_unbroken_token(s)
  local max_tok = 4
  -- Découpe sur espaces et séparateurs sécables (_ / . -)
  for tok in s:gmatch("[^%s_/%-%.]+") do
    local char_len = utf8.len(tok) or #tok
    if char_len > max_tok then
      max_tok = char_len
    end
  end
  return max_tok
end

function Table(el)
  local ncols = #el.colspecs
  if ncols == 0 then
    return el
  end

  local max_lens = {}
  local max_toks = {}
  for j = 1, ncols do
    max_lens[j] = 6
    max_toks[j] = 4
  end

  local function scan_rows(rows)
    if not rows then return end
    for _, row in ipairs(rows) do
      local col_idx = 1
      for _, cell in ipairs(row.cells) do
        local span = cell.col_span or 1
        local txt = pandoc.utils.stringify(cell.contents or {})
        local ulen = utf8.len(txt) or #txt
        local per_col_len = math.ceil(ulen / math.max(1, span))
        local tok_len = math.ceil(longest_unbroken_token(txt) / math.max(1, span))
        for k = 0, span - 1 do
          local target = col_idx + k
          if target <= ncols then
            if per_col_len > max_lens[target] then
              max_lens[target] = per_col_len
            end
            if tok_len > max_toks[target] then
              max_toks[target] = tok_len
            end
          end
        end
        col_idx = col_idx + span
      end
    end
  end

  if el.head and el.head.rows then
    scan_rows(el.head.rows)
  end
  for _, body in ipairs(el.bodies or {}) do
    scan_rows(body.head)
    scan_rows(body.body)
  end
  if el.foot and el.foot.rows then
    scan_rows(el.foot.rows)
  end

  local weights = {}
  local sum_weights = 0.0
  for j = 1, ncols do
    local clamped = math.max(8, math.min(115, max_lens[j]))
    local content_w = clamped ^ 0.54
    -- Garantit assez de largeur pour le plus long mot non sécable (ex: [BLOQUANT] ou CamelCase)
    local tok_floor = math.min(22, max_toks[j]) * 0.42
    local w = math.max(content_w, tok_floor)
    weights[j] = w
    sum_weights = sum_weights + w
  end

  local new_colspecs = {}
  for j, spec in ipairs(el.colspecs) do
    local align = spec[1]
    if align == pandoc.AlignDefault then
      align = pandoc.AlignLeft
    end
    local width = math.floor((weights[j] / sum_weights) * 1000 + 0.5) / 1000
    new_colspecs[j] = { align, width }
  end
  el.colspecs = new_colspecs
  return el
end

function Pandoc(doc)
  if not FORMAT:match("typst") then
    return doc
  end
  local new_blocks = {}
  local in_part_opener = false
  for _, b in ipairs(doc.blocks) do
    if b.t == "Header" and b.level == 1 then
      if in_part_opener then
        new_blocks[#new_blocks + 1] = pandoc.RawBlock("typst", "\n]\n")
        in_part_opener = false
      end
      if b.classes:includes("partie-titre") then
        new_blocks[#new_blocks + 1] = pandoc.RawBlock("typst", "#pagebreak(weak: true)\n#v(0.2cm)")
        new_blocks[#new_blocks + 1] = b
        new_blocks[#new_blocks + 1] = pandoc.RawBlock(
          "typst",
          "#v(0.05cm)\n#block(width: 100%)[\n#set text(size: 10pt)\n#set par(leading: 0.66em, spacing: 0.88em)\n"
        )
        in_part_opener = true
      else
        new_blocks[#new_blocks + 1] = pandoc.RawBlock("typst", "#pagebreak(weak: true)")
        new_blocks[#new_blocks + 1] = b
      end
    else
      new_blocks[#new_blocks + 1] = b
    end
  end
  if in_part_opener then
    new_blocks[#new_blocks + 1] = pandoc.RawBlock("typst", "\n]\n")
  end
  doc.blocks = new_blocks
  return doc
end

function Div(el)
  for cls, cfg in pairs(box_configs) do
    if el.classes:includes(cls) then
      local title = el.attributes["title"]
      local content = el.content

      if not title and #content > 0 and content[1].t == "Div" and content[1].classes:includes("title") then
        title = pandoc.utils.stringify(content[1])
        local new_content = {}
        for i = 2, #content do
          new_content[#new_content + 1] = content[i]
        end
        content = new_content
      end
      if not title or title == "" then
        title = cfg.default_title
      end

      if FORMAT:match("typst") then
        local typst_title = title
          :gsub("^Synthèse exécutive%s*—%s*", "")
          :gsub("^Fil rouge%s*—%s*", "")
        local result = {}
        result[#result + 1] = pandoc.RawBlock(
          "typst",
          string.format('#compendium-box(kind: "%s", title: "%s")[\n', cfg.kind, escape_typst_string(typst_title))
        )
        for _, b in ipairs(content) do
          result[#result + 1] = b
        end
        result[#result + 1] = pandoc.RawBlock("typst", "\n]\n")
        return result
      elseif FORMAT:match("html") then
        local header_div = pandoc.Div(
          { pandoc.Para({ pandoc.Strong({ pandoc.Str(title) }) }) },
          pandoc.Attr("", { "compendium-box-header" })
        )
        local body_blocks = { header_div }
        for _, b in ipairs(content) do
          body_blocks[#body_blocks + 1] = b
        end
        return pandoc.Div(body_blocks, pandoc.Attr(el.identifier, { "compendium-box", "box-" .. cfg.kind }))
      end
    end
  end
  return el
end
