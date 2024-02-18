function genTokenData(projectNum) {
  let data = {};
  let hash = "0x";
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }
  data.hash = hash;
  data.tokenId = (
    projectNum * 1000000 +
    Math.floor(Math.random() * 1000)
  ).toString();
  return data;
}
let tokenData = genTokenData(109);

console.log(tokenData.hash);

let xs = Uint32Array.from(
  [0, 0, 0, 0].map((_, i) => parseInt(tokenData.hash.substr(i * 8 + 2, 8), 16))
);
const R = () => {
  let s,
    t = xs[3];
  xs[3] = xs[2];
  xs[2] = xs[1];
  xs[1] = s = xs[0];
  t ^= t << 11;
  t ^= t >>> 8;
  xs[0] = t ^ s ^ (s >>> 19);
  return xs[0] / 0x100000000;
};
const RN = (a, b) => a + (b - a) * R();
const RI = (a, b) => ~~RN(a, b + 1);
const RV = (v) => v[RI(0, v.length - 1)];

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);
}
