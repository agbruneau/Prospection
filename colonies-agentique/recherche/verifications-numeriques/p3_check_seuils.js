// Verification rapide : champ moyen vs simulation agent du modele a seuils fixes (forme discrete).
// Parametres par defaut = Theraulaz 1998 (alpha=3, delta=1, p=0.2) ; valeurs 1996 non lues.
const T=(s,th)=>s<=0?0:s*s/(s*s+th*th);
function mf(f,th1,th2,p,r){let lo=0,hi=1e6;for(let i=0;i<200;i++){const m=(lo+hi)/2;const g=(1-f)*T(m,th1)/(T(m,th1)+p)+f*T(m,th2)/(T(m,th2)+p)-r;g>0?hi=m:lo=m;}const s=(lo+hi)/2;return {s,x1:T(s,th1)/(T(s,th1)+p),x2:T(s,th2)/(T(s,th2)+p)};}
function abm(N,f,th1,th2,p,alpha,delta,steps,seed){
  let st=seed>>>0;const rnd=()=>{st=(st*1664525+1013904223)>>>0;return st/4294967296;};
  const nMaj=Math.round(f*N);const th=[...Array(N)].map((_,i)=>i<nMaj?th2:th1);const act=new Array(N).fill(false);
  let s=0,accMaj=0,accMin=0,accAll=0,cnt=0;
  for(let t=0;t<steps;t++){let nAct=0;
    for(let i=0;i<N;i++){ if(act[i]){ if(rnd()<p) act[i]=false; } else if(rnd()<T(s,th[i])) act[i]=true; if(act[i]) nAct++; }
    s=Math.max(0,s+delta-alpha*nAct/N); // ponytail: plancher a 0 = choix d'implementation, a confirmer dans le texte 1996
    if(t>steps/2){cnt++;accAll+=nAct/N;let a=0,b=0;for(let i=0;i<N;i++){if(act[i]){i<nMaj?a++:b++;}}accMaj+=nMaj?a/nMaj:0;accMin+=(N-nMaj)?b/(N-nMaj):0;}}
  return {all:accAll/cnt,maj:accMaj/cnt,min:accMin/cnt};}
const p=0.2,alpha=3,delta=1,r=delta/alpha;
console.log("Ratio x_maj(f_exp)/x_maj(f_base), champ moyen");
for(const k of [4,5,6,8,10,12]){const row=[];for(const fb of [0.05,0.25])for(const fe of [0.67,0.9])row.push(`fb=${fb},fe=${fe}:${(mf(fe,1,k,p,r).x2/mf(fb,1,k,p,r).x2).toFixed(1)}`);console.log(`th2/th1=${k}  `+row.join("  "));}
console.log("\nChamp moyen vs ABM (N=1000, th1=10, th2=80, 20000 pas, moyenne 2e moitie, 5 graines)");
for(const f of [0.05,0.25,0.5,0.9]){const m=mf(f,10,80,p,r);let A={all:0,maj:0,min:0};for(let g=1;g<=5;g++){const o=abm(1000,f,10,80,p,alpha,delta,20000,g*7919);A.all+=o.all/5;A.maj+=o.maj/5;A.min+=o.min/5;}
console.log(`f=${f} MF: maj=${m.x2.toFixed(3)} min=${m.x1.toFixed(3)} | ABM: all=${A.all.toFixed(3)} maj=${A.maj.toFixed(3)} min=${A.min.toFixed(3)}`);}
// auto-verification : fraction active totale -> delta/alpha
const o=abm(1000,0.25,10,80,p,alpha,delta,20000,42);console.assert(Math.abs(o.all-r)<0.02,"fraction active != delta/alpha");console.log("\nassert all~delta/alpha OK:",o.all.toFixed(3));
