const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const geometry=source.slice(source.indexOf('const specs='),source.indexOf('function persist()'));
const sandbox={Math,Number,Array,JSON,localStorage:{getItem:()=>null},matchMedia:()=>({matches:false}),document:{},MAX_BOUNCES:6};
vm.createContext(sandbox);
vm.runInContext(geometry+';this.result={levels,trace,intersections};',sandbox);
const {levels,trace,intersections}=sandbox.result;
let count=0;
for(const [i,l] of levels.entries()){
 assert(l.targets.length>=2,`Secteur ${i+1}: au moins 2 cibles`);
 const alive=l.targets.map(t=>({...t}));
 for(const a of l.a){
  const path=trace(l,a);
  assert.equal(path.length,7);
  for(const p of path){assert(p.len>0);assert(p.x2>=39.999&&p.x2<=960.001);assert(p.y2>=39.999&&p.y2<=580.001);}
  for(const e of intersections(path,alive))alive[e.id].alive=false;
 }
 assert(alive.every(t=>!t.alive),`Secteur ${i+1}: résoluble dans l’objectif`);
 count+=l.targets.length;
}
const simple={p:[500,310],walls:[]};
const path=trace(simple,0);
assert.equal(path[0].x2,960);assert.equal(path[1].x2,40);assert.equal(path[1].dx,-1);
const corner=trace(simple,Math.atan2(270,460));
assert(corner[1].dx<0&&corner[1].dy<0,'Un coin inverse les deux axes');
const robot={x:700,y:310,alive:true,shield:true,id:0};
assert.equal(intersections(path.slice(0,1),[robot]).length,0,'Blindage protégé du tir direct');
assert.equal(intersections(path,[robot]).length,1,'Blindage détruit après rebond');
assert.equal(intersections(path,[{...robot,shield:false}])[0].b,0);
assert.equal(intersections(path,[{...robot,alive:false}]).length,0);
console.log(`OK : 12 secteurs, ${count} cibles, solutions au par, murs, coin, blindage et cibles détruites.`);
