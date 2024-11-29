const { Worker, isMainThread } = require("worker_threads");


function chunk(array, n) {
  const chunks = [];
  for (let i = 0; i < array.length; i += n) {
    chunks.push(array.slice(i, i + n));
  }
  return chunks;
}

function run(jobs, concurrentWorkers) {
  const chunks = chunk(jobs, concurrentWorkers);

  const tick = performance.now();
  let completed = 0;

  chunks.forEach((data, i) => {
    const worker = new Worker('./worker.js');
    worker.postMessage(data);

    worker.on('message', () => {
        // console.log('done ', i);

        completed += 1;

        if (completed === chunks.length) {
          const tock = performance.now();
          console.log('main thread ', tock - tick);
          process.exit();
        }
    });
  })
}


const jobs = Array.from({ length: 100 }).map(() => 100000000);

run(jobs, 12)
