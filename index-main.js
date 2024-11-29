const jobs = Array.from({ length: 100 }).map(() => 100000000);

const s = performance.now();

for (let job of jobs) {
  let count = 0;
  for (let i = 0; i < job; i++) {
    count++;
  }
}

const e = performance.now();

console.log('main thread ', e - s);
