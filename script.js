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
  console.log("Data:", result);
}

function onFailure(err) {
  console.log("Err:", err);
}

async function start() {
  try {
    const result = await getData();
    onSuccess(result);
  } catch (err) {
    onFailure(err);
  }
}

async function start2() {
  const result = await getData()
    // .then((result) => console.log(result))
    .catch((err) => onFailure(err));

  // cathces the error but the rest of the code still runs
  onSuccess(result);
}

// start();
// start2();

// 1)

async function getGreeting() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("Hello, World!");
    }, 1000);
  });
}

async function mainFunction() {
  const result = await getGreeting();
  console.log(result);
}

// mainFunction();

// 2)

async function simulateNetworkRequest(num) {
  const random = Math.floor(Math.random() * 2);

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (random === 1) {
        resolve(`Fetched Data ${num}`);
      } else {
        reject("Error");
      }
    }, 1000);
  });
}

async function getDataNetwork() {
  try {
    const data = await simulateNetworkRequest();
    onSuccess(data);
  } catch (error) {
    onFailure(error);
  }
}

// getDataNetwork()

// 3)

async function fetchUserData() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("Fetched User Data");
    }, 1000);
  });
}

async function fetchPostData() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("Posted Data");
    }, 1300);
  });
}

async function paralleExecution() {
  try {
    const result = await Promise.all([fetchUserData(), fetchPostData()]);
    onSuccess(result);
  } catch (error) {
    onFailure(error);
  }
}

// paralleExecution()

// 4)

async function sequentialExecution() {
  try {
    const userData = await fetchUserData();
    const userPosts = await fetchPostData();

    onSuccess({ userData, userPosts });
  } catch (error) {
    onFailure(error);
  }
}

// sequentialExecution()

// 5)

async function simulateDelay(min, max) {
  const time = Math.round(Math.random() * (max - min) + min) * 1000;
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(`Resolved in ${time}ms`);
    }, time);
  });
}

async function delayInvocation() {
  try {
    const result = await simulateDelay(1, 3);
    onSuccess(result);
  } catch (error) {
    onFailure(error);
  }
}

// delayInvocation()

// 6)

async function timeoutReject() {
  const start = new Date();

  const data = await simulateDelay(1, 4);

  const end = new Date();
  const timeInSeconds = (end - start) / 1000;

  if (timeInSeconds > 3) {
    throw new Error("Timeout");
  }

  return data;
}

// timeoutReject().then(onSuccess).catch(onFailure);

// 7)

async function promiseAny(arr) {
  try {
    const result = await Promise.any(arr);

    onSuccess(result);
  } catch (error) {
    onFailure(error);
  }
}

// promiseAny([
//  simulateNetworkRequest(1),
//  simulateNetworkRequest(2),
//  simulateNetworkRequest(3),
// ])

// 8)

async function fetchDataInLoop(callback, times) {
  const results = [];

  for (let i = 0; i < times; i++) {
    const result = await callback();
    results.push(result);
  }

  return results;
}

// fetchDataInLoop(fetchUserData, 3).then(onSuccess)

// 9)

async function allSettled(arr) {
  const result = await Promise.allSettled(arr);
  onSuccess(result);
}

allSettled([
  simulateNetworkRequest(1),
  simulateNetworkRequest(2),
  simulateNetworkRequest(3),
]);
