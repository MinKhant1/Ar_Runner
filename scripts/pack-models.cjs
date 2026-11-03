// Preserve source GLTFs and package their buffers/textures into self-contained GLBs.
const fs = require('node:fs');
const path = require('node:path');
const sources = [
  'characters/Casual_Male',
  'environment/roads/road_straight',
  'environment/buildings/building_G_withoutBase',
  'obstacles/car_stationwagon',
];
for (const source of sources) {
  const filename = path.join('public/assets/models', source + '.gltf');
  const doc = JSON.parse(fs.readFileSync(filename, 'utf8'));
  const parts = [];
  let length = 0;
  function append(bytes) {
    const offset = length;
    parts.push(bytes);
    length += bytes.length;
    const padding = (4 - length % 4) % 4;
    if (padding) { parts.push(Buffer.alloc(padding)); length += padding; }
    return offset;
  }
  function read(uri) {
    if (uri.startsWith('data:')) return Buffer.from(uri.slice(uri.indexOf(',') + 1), 'base64');
    return fs.readFileSync(path.resolve(path.dirname(filename), decodeURIComponent(uri)));
  }
  const offsets = doc.buffers.map(buffer => append(read(buffer.uri)));
  for (const view of doc.bufferViews || []) {
    view.byteOffset = (view.byteOffset || 0) + offsets[view.buffer];
    view.buffer = 0;
  }
  for (const image of doc.images || []) {
    if (!image.uri) continue;
    const bytes = read(image.uri);
    const offset = append(bytes);
    image.mimeType ||= image.uri.endsWith('.jpg') ? 'image/jpeg' : 'image/png';
    image.bufferView = doc.bufferViews.length;
    doc.bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: bytes.length });
    delete image.uri;
  }
  doc.buffers = [{ byteLength: length }];
  const json = Buffer.from(JSON.stringify(doc));
  const jsonLength = Math.ceil(json.length / 4) * 4;
  const header = Buffer.alloc(20);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(28 + jsonLength + length, 8);
  header.writeUInt32LE(jsonLength, 12);
  header.writeUInt32LE(0x4e4f534a, 16);
  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(length, 0);
  binHeader.writeUInt32LE(0x004e4942, 4);
  const output = filename.replace(/\.gltf$/, '.glb');
  fs.writeFileSync(output, Buffer.concat([header, json, Buffer.alloc(jsonLength-json.length, 32), binHeader, ...parts]));
  console.log(output);
}
