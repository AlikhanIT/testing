const { workerData, parentPort } = require("worker_threads");

if(workerData === 1) {
  setInterval(() => {
    parentPort.postMessage(`${new Date()} Что то делается`);
  }, 60000);
}

parentPort.on("message", (msg) => {
  console.log("Port of express out of worker", msg);
});


