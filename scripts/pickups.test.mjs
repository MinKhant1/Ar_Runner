import {test} from 'node:test';
import assert from 'node:assert/strict';
import {CANS_PER_TRAIL,trailLane,canZ,touchesCan} from '../src/pickups.ts';
test('trails remain clear of their car and neighboring rows',()=>{
  for(let lane=0;lane<3;lane++) for(let row=0;row<9;row++){
    assert.notEqual(trailLane(lane,row),lane);
    assert.ok(trailLane(lane,row)>=0&&trailLane(lane,row)<=2);
    for(let i=0;i<CANS_PER_TRAIL;i++)assert.ok(22-canZ(0,i)>3);
    assert.ok(22+canZ(0,0)-canZ(0,CANS_PER_TRAIL-1)>8);
  }
});
test('collection supports continuous steering and swept crossing',()=>{
  assert.equal(touchesCan(.4,1,-1,.5),true);
  assert.equal(touchesCan(2.5,1,-1,.5),false);
  assert.equal(touchesCan(0,1,1,1.5),false);
  assert.equal(touchesCan(0,1,-3,-2),false);
});
