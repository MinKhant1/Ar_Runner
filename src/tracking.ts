type Landmark = {x:number; y:number; visibility?:number};
export function horizontalPosition(mode:'Body'|'Hand', landmarks:Landmark[]|undefined):number|null {
  if(!landmarks)return null;
  const ids=mode==='Body'?[11,12]:[0,5,9,13,17];
  // Hand landmarks do not carry pose visibility confidence (it may be zero).
  if(!ids.every(i=>landmarks[i]&&Number.isFinite(landmarks[i].x)&&Number.isFinite(landmarks[i].y)))return null;
  if(mode==='Body'&&!ids.every(i=>(landmarks[i].visibility??0)>.5))return null;
  return 1-ids.reduce((sum,i)=>sum+landmarks[i].x,0)/ids.length;
}
