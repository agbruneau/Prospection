-- Filtre Lua Pandoc pour le Compendium 2027
-- Gère les boîtes sémantiques (synthese-executive, fil-rouge, encadre-sectoriel, adr),
-- les alertes GitHub (+alerts), ainsi que les bannières de parties et sauts de chapitre.

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

function Header(el)
  if FORMAT:match("typst") and el.level == 1 then
    local is_part = el.classes:includes("partie-titre")
    if is_part then
      return {
        pandoc.RawBlock("typst", "#pagebreak(weak: true)\n#v(2.2cm)"),
        el,
        pandoc.RawBlock("typst", "#v(0.5cm)\n#line(length: 100%, stroke: 1.5pt + rgb(\"#1e3a5f\"))\n#v(0.6cm)")
      }
    else
      return {
        pandoc.RawBlock("typst", "#pagebreak(weak: true)"),
        el
      }
    end
  end
  return el
end

function Div(el)
  for cls, cfg in pairs(box_configs) do
    if el.classes:includes(cls) then
      local title = el.attributes["title"]
      local content = el.content

      -- Pour les alertes GitHub générées par +alerts, le 1er bloc est souvent un Div(.title)
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
        local result = {}
        result[#result + 1] = pandoc.RawBlock(
          "typst",
          string.format('#compendium-box(kind: "%s", title: "%s")[\n', cfg.kind, escape_typst_string(title))
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
