# Contraste WCAG et distance sous simulation CVD (Machado et al. 2009, sévérité 1.0) pour paires candidates.
import math
OI={'orange':'#E69F00','bleu_ciel':'#56B4E9','vert_bleute':'#009E73','jaune':'#F0E442','bleu':'#0072B2','vermillon':'#D55E00','pourpre':'#CC79A7'}
def rgb(h): return [int(h[i:i+2],16)/255 for i in (1,3,5)]
def lin(c): return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def delin(c): c=min(max(c,0),1); return 12.92*c if c<=0.0031308 else 1.055*c**(1/2.4)-0.055
def L(h): r,g,b=map(lin,rgb(h)); return 0.2126*r+0.7152*g+0.0722*b
def cr(a,b): la,lb=sorted([L(a),L(b)],reverse=True); return (la+0.05)/(lb+0.05)
M={'protan':[[0.152286,1.052583,-0.204868],[0.114503,0.786281,0.099216],[-0.003882,-0.048116,1.051998]],
   'deutan':[[0.367322,0.860646,-0.227968],[0.280085,0.672501,0.047413],[-0.011820,0.042940,0.968881]],
   'tritan':[[1.255528,-0.076749,-0.178779],[-0.078411,0.930809,0.147602],[0.004733,0.691367,0.303900]]}
def sim(h,m):
    v=[lin(c) for c in rgb(h)]; o=[sum(m[i][j]*v[j] for j in range(3)) for i in range(3)]; return [delin(c) for c in o]
def lab(c):  # sRGB gamma -> CIELAB D65
    r,g,b=[lin(x) for x in c]
    X=(0.4124*r+0.3576*g+0.1805*b)/0.95047; Y=0.2126*r+0.7152*g+0.0722*b; Z=(0.0193*r+0.1192*g+0.9505*b)/1.08883
    f=lambda t: t**(1/3) if t>0.008856 else 7.787*t+16/116
    return 116*f(Y)-16, 500*(f(X)-f(Y)), 200*(f(Y)-f(Z))
def dE(a,b): return math.dist(lab(a),lab(b))
print('Contraste vs blanc / vs #121212')
for k,h in OI.items(): print(f'  {k:12s} {h} {cr(h,"#FFFFFF"):.2f} {cr(h,"#121212"):.2f}')
pairs=[('vermillon','orange'),('vermillon','bleu'),('orange','bleu'),('vermillon','bleu_ciel'),('orange','pourpre'),('bleu','pourpre'),('vermillon','pourpre'),('orange','vert_bleute')]
print('DeltaE76 (normal / protan / deutan / tritan)')
for a,b in pairs:
    ha,hb=OI[a],OI[b]; n=dE(rgb(ha),rgb(hb))
    s=[dE(sim(ha,M[t]),sim(hb,M[t])) for t in ('protan','deutan','tritan')]
    print(f'  {a}-{b}: {n:.0f} / '+' / '.join(f'{x:.0f}' for x in s))
