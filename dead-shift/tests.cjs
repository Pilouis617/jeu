// Deterministic engine tests. Run with Node.js: node tests.cjs
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const noop=()=>{},element=()=>({style:{},dataset:{},classList:{add:noop},addEventListener:noop,focus:noop,querySelector:()=>({focus:noop}),firstElementChild:{classList:{add:noop}},getContext:()=>({fillRect:noop}),setAttribute:noop});
const elements=new Map(),document={getElementById:id=>{if(!elements.has(id))elements.set(id,element());return elements.get(id)},createElement:element,addEventListener:noop,pointerLockElement:null};
const sandbox={document,window:{addEventListener:noop},matchMedia:()=>({matches:true}),localStorage:{getItem:()=>null,setItem:noop},requestAnimationFrame:noop,Math:Object.create(Math),Float32Array,Infinity};sandbox.Math.random=()=>.51;
let code=fs.readFileSync(__dirname+'/index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
// Instrument only this in-memory test copy; the delivered game exposes no cheats.
code=code.replace('menu();requestAnimationFrame(frame);',`window.test={reset,update,shoot,reload,switchGun,buy,shop,startWave,finish,buildFlow,move,cast,clearAt,spawn,
get:()=>({p,enemies,flow,mode,wave,pending,score,credits,owned,ammo,reserve,reloadTimer,damageBoost,armor}),
set: values=>{if(values.enemies!==undefined)enemies=values.enemies;if(values.pending!==undefined)pending=values.pending;if(values.credits!==undefined)credits=values.credits;if(values.wave!==undefined)wave=values.wave;if(values.mode!==undefined)mode=values.mode;if(values.shotTimer!==undefined)shotTimer=values.shotTimer;}};`);
vm.runInNewContext(code,sandbox);const t=sandbox.window.test;
t.reset();t.buildFlow();let reachable=0,open=0;for(let y=0;y<16;y++)for(let x=0;x<16;x++){if(sandbox.window.DeadShift.geometry.MAP[y][x]==='0'){open++;if(t.get().flow[y][x]<999)reachable++}}assert.equal(reachable,open,'Every floor cell reachable by enemies');
assert(!t.clearAt(.5,.5),'outer wall solid');assert(t.clearAt(3.5,3.5));const o={x:1.25,y:1.25};t.move(o,-.2,0);assert.equal(o.x,1.25,'Player cannot enter wall');assert(Math.abs(t.cast(3.5,3.5,0).d-11.5)<1e-9);
t.get().p.a=0;t.set({enemies:[{x:4.5,y:3.5,hp:20,max:20,speed:0,attack:9,flash:0}],pending:1});t.shoot();assert.equal(t.get().enemies.length,0,'Shot kills visible enemy');assert.equal(t.get().score,100);assert.equal(t.get().credits,40);assert.equal(t.get().ammo[0],11);
t.reload();assert(t.get().reloadTimer>0);for(let i=0;i<110;i++)t.update(.01);assert.equal(t.get().ammo[0],12,'Reload refills magazine');assert.equal(t.get().reserve[0],Infinity);
t.set({shotTimer:0,enemies:[{x:6.5,y:4.5,hp:100,max:100,speed:0,attack:9}]});t.get().p.x=5.5;t.get().p.y=4.5;t.get().p.a=0;t.shoot();assert.equal(t.get().enemies[0].hp,100,'Wall blocks shots');
t.set({credits:600});t.shop();t.buy('shotgun');assert(t.get().owned[1]);assert.equal(t.get().credits,420);t.buy('smg');assert(t.get().owned[2]);assert.equal(t.get().credits,200);t.buy('armor');assert.equal(t.get().armor,1);assert.equal(t.get().credits,80);t.buy('armor');assert.equal(t.get().credits,80,'Duplicate armor purchase blocked');t.buy('damage');assert.equal(t.get().damageBoost,1,'Insufficient credits blocked');
t.set({wave:4});t.startWave();assert.equal(t.get().wave,5);assert(t.get().enemies.some(e=>e.boss),'Wave five has boss');
t.set({mode:'playing',enemies:[],pending:0});t.update(.01);assert.equal(t.get().mode,'won','Clearing final wave wins');
t.reset();const p=t.get().p;t.set({pending:1,enemies:[{x:p.x+.3,y:p.y,hp:99,max:99,attack:0,speed:0}]});p.hp=1;t.update(.01);assert.equal(t.get().mode,'lost');assert.equal(t.get().p.hp,0);
console.log('PASS: reachable map, wall collisions, ray distances, enemy hits, blocked shots, score, reload, shop purchases, credits, boss spawn, victory and defeat.');
