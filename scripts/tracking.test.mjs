import {test} from 'node:test';
import assert from 'node:assert/strict';
import {horizontalPosition} from '../src/tracking.ts';
test('hands accept zero visibility and use mirrored palm center',()=>{
  const hand=Array.from({length:21},()=>({x:.3,y:.5,visibility:0}));
  assert.equal(horizontalPosition('Hand',hand),.7);
  assert.equal(horizontalPosition('Hand',undefined),null);
  assert.equal(horizontalPosition('Hand',[]),null);
});
test('pose still requires visible shoulders',()=>{
  const pose=Array.from({length:33},()=>({x:.5,y:.5,visibility:0}));
  assert.equal(horizontalPosition('Body',pose),null);
  pose[11].visibility=pose[12].visibility=.9;
  assert.equal(horizontalPosition('Body',pose),.5);
});
