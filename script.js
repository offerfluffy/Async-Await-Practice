// Async/await must be together
// Only affects Promise receiver
// Can put await infront of any function that returns a Promise
// Any function can be converted to async
// All async functions return a Promise by default (wraps primitives into a Promise)
// Error handling with try/catch

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(46);
    }, 10);
  });
}

function onSuccess(result) {
  console.log("Success", result);
}

function onFailure(err) {
  console.log("Err", err);
}

async function start() {
  try {
    const result = await getData();
    onSuccess(result)
  } catch (err) {
    onFailure(err)
  }
}

async function start2() {
  const result = await getData()
    // .then((result) => console.log(result))
    .catch((err) => onFailure(err));

  // cathces the error but the rest of the code still runs
  onSuccess(result)
}

start();
start2();
