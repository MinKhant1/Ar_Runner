export const CANS_PER_TRAIL = 7;
export const CAN_SPACING = 1.8;
// Each trail shares a recycled car row, but uses an adjacent, clear lane.
export function trailLane(carLane: number, rowIndex: number) {
  return (carLane + 1 + rowIndex % 2) % 3;
}
export function canZ(rowZ: number, index: number) {
  return rowZ + 5 + index * CAN_SPACING;
}
export function touchesCan(playerX: number, lane: number, previousZ: number, z: number) {
  return Math.abs(playerX - (lane - 1) * 2.5) < .85 && previousZ < .8 && z >= -.8;
}
