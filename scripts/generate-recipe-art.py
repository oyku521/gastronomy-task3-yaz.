"""Build deterministic, recipe-specific original SVG food illustrations (no remote assets)."""
import json, math, random
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
recipes = json.loads((ROOT/'data.js').read_text().split('const recipes = ',1)[1].rstrip(';\n'))
OUT = ROOT/'images'/'recipes'
OUT.mkdir(exist_ok=True)
COLORS={'tomato':'#dc6048','pepper':'#e4a337','carrot':'#e99540','pumpkin':'#d78c38','broccoli':'#527943','spinach':'#426b45','parsley':'#4c7545','lettuce':'#82a55a','cucumber':'#80a96e','zucchini':'#7f9b58','avocado':'#b4bc67','chickpeas':'#e7c782','beans':'#e8dbb5','lentils':'#a18b50','quinoa':'#e0cfa4','buckwheat':'#a28a63','rice':'#eee4ce','brownRice':'#c4a574','potato':'#dfb762','sweetPotato':'#d88440','chicken':'#ce985e','beef':'#92583f','tofu':'#e4c797','salmon':'#ee967b','fish':'#f1dec1','tuna':'#c39989','feta':'#fff5dd','egg':'#e8b840','mushroom':'#ab8c72','onion':'#bba0a8','banana':'#e5cf90','berries':'#976379','apple':'#d69c65','walnut':'#946b43','almond':'#b88a5a','gfOats':'#c4a16c','chia':'#5f5549'}
def el(tag, **a):return '<'+tag+' '+' '.join(f'{k.replace("_","-")}="{v}"' for k,v in a.items())+'/>'
def circle(x,y,r,c,**a):return el('circle',cx=x,cy=y,r=r,fill=c,**a)
def ellipse(x,y,rx,ry,c,**a):return el('ellipse',cx=x,cy=y,rx=rx,ry=ry,fill=c,**a)
def path(d,c='none',**a):return el('path',d=d,fill=c,**a)
def ingredient(key,x,y,size,rng):
 c=COLORS.get(key,'#d3ba83'); s=size
 if key in ('spinach','parsley','lettuce'):
  return path(f'M{x-s} {y+s} Q{x-1.5*s} {y-s} {x+s} {y-s} Q{x+1.5*s} {y+s} {x-s} {y+s}',c)+path(f'M{x-s} {y+s} L{x+s*.65} {y-s*.6}',stroke='#d0d7a1',stroke_width=1.6)
 if key in ('cucumber','zucchini','banana'):
  return circle(x,y,s,c)+circle(x,y,s*.75,'#e2e5af')+''.join(ellipse(x+math.cos(a)*s*.35,y+math.sin(a)*s*.35,1.4,2.6,'#acb77a') for a in (0,2.1,4.2))
 if key=='tomato':
  return circle(x,y,s,c)+path(f'M{x} {y} L{x+s*.8} {y-s*.5} A{s*.9} {s*.9} 0 0 1 {x+s*.7} {y+s*.5} Z','#f2b477')+circle(x-s*.3,y-s*.3,s*.15,'#f7c18e')
 if key=='broccoli':return path(f'M{x-3} {y+s} L{x+3} {y-s*.4}',stroke='#94a465',stroke_width=7)+''.join(circle(x+dx*s,y+dy*s,s*.6,c) for dx,dy in ((-.5,0),(.5,0),(0,-.5)))
 if key in ('mushroom',):return path(f'M{x-s} {y} Q{x-s} {y-s*1.8} {x+s} {y} Z',c)+el('rect',x=x-s*.23,y=y,width=s*.46,height=s*.85,rx=2,fill='#dfcbb0')
 if key in ('walnut','almond'):return ellipse(x,y,s*.6,s,c,transform=f'rotate(30 {x} {y})')+path(f'M{x} {y-s*.6} q{-s*.4} {s*.5} 0 {s*1.2}',stroke='#e5bd7e',stroke_width=1.5)
 if key in ('quinoa','rice','brownRice','buckwheat','gfOats','lentils'):return ellipse(x,y,s*.6,s*.3,c,transform=f'rotate({rng.randrange(180)} {x} {y})')
 if key=='berries':return circle(x,y,s,c)+circle(x-s*.2,y-s*.25,s*.22,'#b892a2')+circle(x+s*.25,y+s*.1,s*.1,'#e2c7cf')
 if key=='egg':return ellipse(x,y,s*1.8,s*1.35,'#fff7e3')+circle(x+s*.15,y,s*.65,'#edb33e')+ellipse(x,y-s*.23,s*.22,s*.13,'#f7d778')
 if key in ('chickpeas','beans'):return ellipse(x,y,s,s*.8,c)+path(f'M{x-s*.2} {y-s*.3} q{-s*.4} {s*.5} {s*.3} {s*.7}',stroke='#be9c5f',stroke_width=1.3)
 if key=='apple':return path(f'M{x-s} {y+s*.5} Q{x} {y-s*1.8} {x+s} {y+s*.5} Z',c,stroke='#ead0a0',stroke_width=3)
 return el('rect',x=x-s*.8,y=y-s*.65,width=s*1.6,height=s*1.3,rx=s*.3,fill=c,transform=f'rotate({rng.randrange(-35,36)} {x} {y})')+path(f'M{x-s*.4} {y-s*.3} l{s*.65} 0',stroke='#fff1ce',stroke_opacity='.35',stroke_width=2)

def art(r):
 rng=random.Random(r['id']); ids=[i['id'] for i in r['ingredients']]; method=r['method']; category=r['category']; idx=int(r['id'][1:]); bg=['#f0e7d9','#e6ebe2','#efe0d5','#e6e8eb','#ede5d8','#e9e1e6'][idx%6]; accent=['#b47e5f','#6e856a','#b59a63','#7d8d97'][idx%4]
 s=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420"><title>{r["name"]["en"].replace("&","&amp;")} — original illustration</title><defs><filter id="shadow"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#34352c" flood-opacity=".18"/></filter><radialGradient id="ceramic"><stop stop-color="#fffdf3"/><stop offset=".82" stop-color="#f8f3e7"/><stop offset="1" stop-color="#dcd8ca"/></radialGradient></defs>',el('rect',width=600,height=420,fill=bg)]
 # Folded napkin, table details and utensil give each arrangement its own silhouette.
 s += [path('M0 0H145L190 420H0Z',accent,opacity='.17'),path('M22 0L67 420M34 0L79 420',stroke=accent,stroke_width=2,opacity='.2')]
 s += [path('M520 110V306',stroke='#a59e8e',stroke_width=7,stroke_linecap='round'),ellipse(520,100,13,24,'#c4bdae'),ellipse(517,96,7,16,'#dfd8c7')]
 content=[]
 if category=='soup':
  primary=next((k for k in ids if k in ('tomato','pumpkin','carrot','broccoli','spinach','zucchini','lentils','beans','chicken')),ids[0]); fill={'tomato':'#cb674b','pumpkin':'#e1a54e','carrot':'#dfa34e','broccoli':'#8caa71','spinach':'#84925c','zucchini':'#acb78a','lentils':'#d7a55b','beans':'#bf8e60','chicken':'#d8bd7f'}[primary]
  content += [ellipse(300,233,159,136,'url(#ceramic)'),ellipse(300,213,143,116,'#d8d1c0'),ellipse(300,210,132,106,fill),path('M228 210c12-46 120-57 135-6s-83 64-103 23 57-39 63-7',stroke='#f8e5b5',stroke_width=5,stroke_linecap='round',opacity='.75')]
  for _ in range(12):
   a=rng.random()*6.28; rad=rng.uniform(30,93);content.append(ingredient('parsley' if _%3 else primary,300+math.cos(a)*rad,210+math.sin(a)*rad*.7,5,rng))
  s += [path('M250 60q-15-20 1-38m38 35q-15-20 1-38m38 42q-15-20 1-38',stroke='#fffaf0',stroke_width=4,stroke_linecap='round',opacity='.8')]
 elif method in ('chill','ricePudding') or (category=='dessert' and method in ('blend','bowl')) or r['id']=='r007':
  for j,(x,y) in enumerate(((235,195),(365,223))):
   cocoa='cocoa' in ids; cream='#89604c' if cocoa else '#f5ead0'; fruit='#916077' if 'berries' in ids else '#cdbb85';
   content += [el('rect',x=x-65,y=y-70,width=130,height=174,rx=23,fill='#fff9ee',stroke='#cec8ba',stroke_width=3),el('rect',x=x-57,y=y-27,width=114,height=111,rx=15,fill=cream),el('rect',x=x-57,y=y+12,width=114,height=19,fill=fruit,opacity='.7'),ellipse(x,y-31,57,16,cream)]
   if 'chia' in ids:
    for _ in range(40):content.append(ellipse(x+rng.uniform(-48,48),y+rng.uniform(-18,75),1.3,2,'#736552'))
   for k in range(6):content.append(ingredient('berries' if 'berries' in ids else 'banana',x-35+k*13,y-40+(-1)**k*5,9,rng))
 elif method=='pancake':
  content += [ellipse(300,272,175,94,'url(#ceramic)')]
  fritter='zucchini' in ids; cocoa='cocoa' in ids
  for j in range(4):
   y=270-j*22;c='#8c9a57' if fritter else '#81583f' if cocoa else '#cc995b'; content += [el('rect',x=194+j*3,y=y-17,width=214-j*5,height=23,rx=16,fill=c),ellipse(301,y-17,107-j*2.5,37,'#a7b473' if fritter else '#996b4b' if cocoa else '#e1b576')]
  if not fritter:content += [path('M240 177q60-24 117 4l-14 12q-3 21-12 18l-4-22q-25 7-40-2l-4 21q-10 12-14-6l-2-19Z','#ae7442',opacity='.8')]
  for j in range(5):content.append(ingredient('parsley' if fritter else 'banana',260+j*20,170+(-1)**j*7,10,rng))
 elif method=='fruitBake':
  content += [el('rect',x=138,y=93,width=324,height=253,rx=30,fill='#aa7153'),el('rect',x=153,y=108,width=294,height=223,rx=22,fill='#f3e4c8')]
  if 'gfOats' in ids:
   for _ in range(120):content.append(ingredient('gfOats',rng.uniform(172,428),rng.uniform(128,309),rng.uniform(3,8),rng))
  for x,y in ((220,172),(370,184),(292,266)):
   content += [ellipse(x,y,43,37,'#c78b4e'),ellipse(x,y-8,35,26,'#e2b876'),circle(x,y-10,12,'#9b6841'),ingredient('walnut',x,y-10,10,rng)]
 else:
  tray=method in ('roast','chickenBake'); skillet=method in ('skillet','omelette','chickenSkillet','beefSkillet'); plate=method=='fishBake'
  if tray:content += [el('rect',x=117,y=76,width=364,height=274,rx=30,fill='#6d7771'),el('rect',x=131,y=90,width=336,height=246,rx=23,fill='#d9c5a3'),path('M105 159V266m387-107V266',stroke='#596660',stroke_width=12,stroke_linecap='round')]
  elif skillet:content += [path('M407 281L501 356',stroke='#3d4642',stroke_width=28,stroke_linecap='round'),circle(290,207,150,'#3b4841'),circle(290,207,137,'#566053'),circle(290,207,127,'#a27b4d' if 'tomato' not in ids else '#b7714c')]
  elif plate:content += [ellipse(300,220,183,132,'url(#ceramic)'),ellipse(300,220,153,104,'#e8e3d1')]
  else:content += [circle(300,214,161,'url(#ceramic)'),circle(300,214,139,'#e2dbc7'),circle(300,214,129,'#f1e6c9' if 'yogurt' in ids else '#e4d2a9')]
  grain=next((k for k in ids if k in ('rice','brownRice','quinoa','buckwheat')),None)
  if grain:
   for j in range(190):
    a=rng.random()*6.28;rad=math.sqrt(rng.random())*115;content.append(ingredient(grain,300+math.cos(a)*rad,214+math.sin(a)*rad,4,rng))
  if method=='pasta':
   sauce='#c56b4c' if 'tomato' in ids else '#e3d6a9' if 'yogurt' in ids or 'milk' in ids else '#87a16a'
   for j in range(38):
    a=rng.random()*6.28;rad=rng.uniform(0,102);x=300+math.cos(a)*rad;y=214+math.sin(a)*rad*.85
    content.append(path(f'M{x-17} {y-10} q40 -22 32 9 t-30 15',stroke=sauce,stroke_width=9,stroke_linecap='round'))
  elif method in ('blend','dip') or r['id']=='r066':
   c='#a1b06e' if 'avocado' in ids else '#e3c88f' if 'chickpeas' in ids else '#ebe5ce' if 'yogurt' in ids else '#bb9e71';content += [ellipse(300,211,115,94,c),path('M232 211c0-55 127-65 130-1s-99 55-97 10 62-39 65-4',stroke='#b89458' if c!='#ebe5ce' else '#cbd0aa',stroke_width=5,stroke_linecap='round')]
  foods=[k for k in ids if k in COLORS and k not in ('egg','salmon','fish','onion')]
  # Fill with relevant, recognizable ingredients, avoiding garnish dominating the dish.
  if method not in ('blend','dip'):
   count=85 if category=='salad' or method=='warmBowl' else 48
   for j in range(count):
    k=foods[j%len(foods)] if foods else 'potato'; a=rng.random()*6.28;rad=math.sqrt(rng.random())*108;x=290+math.cos(a)*rad;y=211+math.sin(a)*rad*(.8 if plate else 1)
    if tray:x=rng.uniform(154,442);y=rng.uniform(112,315)
    size=4 if k in ('rice','brownRice','quinoa','buckwheat','gfOats','lentils') else rng.uniform(16,23) if k in ('chicken','potato','sweetPotato','tofu','beef') else rng.uniform(11,17)
    content.append(ingredient(k,round(x,1),round(y,1),size,rng))
  if 'salmon' in ids or 'fish' in ids:
   c='#ee9f7f' if 'salmon' in ids else '#ead9ac';content += [path('M229 178Q283 145 367 188L345 271Q272 282 221 238Z',c,stroke='#bf8059',stroke_width=3)]
   for j in range(5):content.append(path(f'M{235+j*23} {183+j*2}l-12 60',stroke='#f8d0ab',stroke_width=4))
   content += [circle(373,165,22,'#ebcd6b'),circle(373,165,17,'#f7e6a4'),path('M373 148v34m-17-17h34',stroke='#fff6ce',stroke_width=2)]
  if method=='omelette':
   content.append(path('M185 195A110 110 0 0 1 398 204Q300 305 185 195Z','#e9ba55',stroke='#d29b3c',stroke_width=3))
   for j in range(10):content.append(ingredient('mushroom' if 'mushroom' in ids else 'feta' if 'feta' in ids else 'potato',rng.uniform(227,357),rng.uniform(182,216),8,rng))
  elif 'egg' in ids and method=='skillet':
   for x,y in ((249,188),(330,238)):content.append(ingredient('egg',x,y,21,rng))
  if method=='blend' or method=='dip':
   for j in range(8):content.append(ingredient('parsley',rng.uniform(267,330),rng.uniform(185,234),5,rng))
 s.append('<g filter="url(#shadow)">'+''.join(content)+'</g>')
 # Herb sprig outside the serving vessel.
 s.append(path('M78 335q25-8 40-42',stroke='#71845b',stroke_width=2))
 for j in range(4):s.append(ingredient('parsley',87+j*8,325-j*9,7,rng))
 s.append('</svg>');return ''.join(s)
for recipe in recipes:(OUT/(recipe['id']+'.svg')).write_text(art(recipe))
print(f'Generated {len(recipes)} distinct recipe illustrations in {OUT}')
