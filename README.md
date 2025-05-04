# JavaScript Async/Await – Structured Notes

## 1. What is `async/await`?

* **`async`/`await`** is syntax introduced in ES2017 (ES8) to simplify working with **promises** in asynchronous operations.
* `async` makes a function return a **Promise**, and `await` can be used to pause the execution of the function until the **Promise** is resolved or rejected.

### Key Points:

* **`async`**: Marks a function as asynchronous, automatically returning a **Promise**. Even if a function doesn't explicitly return a **Promise**, it wraps the result in a **resolved Promise**.
* **`await`**: Pauses the execution of an `async` function until a **Promise** is resolved or rejected. It can only be used inside `async` functions.

```js
async function example() {
  const result = await someAsyncFunction();
  console.log(result);
}
```

## 2. How Does `async/await` Work?

* **`async` functions** always return a **Promise**, which will resolve with the function's return value or reject with an error.
* **`await`** pauses the function's execution until the **Promise** is settled (resolved or rejected). It only works inside `async` functions.

### Example:

```js
async function fetchData() {
  const response = await fetch('https://api.example.com');
  const data = await response.json();
  console.log(data);
}

fetchData();
```

* The function `fetchData` doesn't block the thread while waiting for the **fetch request**. Instead, it lets the event loop handle other operations until the promise resolves.

## 3. Suspension in the Call Stack

* **Suspension in the call stack** refers to the temporary halting of the execution of a function when `await` is encountered.

### Explanation:

* When `await` is used, JavaScript temporarily suspends the execution of the current function. The function is paused, and JavaScript proceeds to handle other tasks, such as handling other events or running other functions.
* Once the **Promise** is settled (resolved or rejected), the function resumes from where it was suspended and continues execution.

### Example:

```js
async function example() {
  console.log("Start");

  // Suspends the function's execution here
  const data = await fetch('https://api.example.com');

  console.log("End");
}

example();
```

* **Step 1**: `console.log("Start")` is executed first.

* **Step 2**: The `await` pauses the function, and the function is suspended in the call stack.

* **Step 3**: JavaScript can run other code while waiting for the fetch operation.

* **Step 4**: When the fetch promise resolves, the function resumes from where it was suspended, and `console.log("End")` is executed.

* This suspension ensures the function doesn’t block other code execution (like rendering UI or handling user input), making **async/await** a great tool for writing **non-blocking** code.

## 4. Error Handling with `try/catch`

* One of the main advantages of `async/await` is simplified error handling with `try/catch` blocks, similar to synchronous code.

### Example:

```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}

fetchData();
```

* **`try` block**: Tries to execute the code and waits for promises to resolve using `await`.
* **`catch` block**: Handles any errors if the promise rejects or if an error occurs within the `try` block.

## 5. Parallel vs Sequential Execution

* **Sequential Execution**: When `await` is used in a loop or sequentially in functions, it waits for each promise to settle before continuing to the next. This can result in slower performance if there are multiple asynchronous tasks.

* **Parallel Execution**: By using **`Promise.all()`**, you can run multiple promises in parallel instead of sequentially, making the code run faster.

### Sequential Execution Example:

```js
async function fetchSequential() {
  const result1 = await fetchData1();
  const result2 = await fetchData2();
  console.log(result1, result2);
}
```

* Here, `fetchData2()` will not start until `fetchData1()` is completed.

### Parallel Execution Example:

```js
async function fetchParallel() {
  const [result1, result2] = await Promise.all([fetchData1(), fetchData2()]);
  console.log(result1, result2);
}
```

* **`Promise.all()`** allows both `fetchData1()` and `fetchData2()` to run in parallel, speeding up execution.

## 6. `async/await` with Non-Promise Values

* If `await` is used with a value that is not a **Promise**, it resolves immediately with that value.

### Example:

```js
async function example() {
  const value = await 42;  // Resolves immediately
  console.log(value);  // 42
}

example();
```

* **Note**: Even though `42` is not a **Promise**, it is treated like a resolved **Promise** with the value `42`.

## 7. `Promise.allSettled()` vs `Promise.any()`

| Feature     | `Promise.allSettled()`                                                      | `Promise.any()`                                         |
| ----------- | --------------------------------------------------------------------------- | ------------------------------------------------------- |
| Behavior    | Waits for all promises to either resolve or reject.                         | Returns the first resolved promise, ignores rejections. |
| When to use | When you want the result of all promises, regardless of success or failure. | When you care only about the first successful promise.  |

### Example of `Promise.allSettled()`:

```js
Promise.allSettled([promise1, promise2])
  .then((results) => {
    console.log(results);  // An array of results, even if some promises reject
  });
```

### Example of `Promise.any()`:

```js
Promise.any([promise1, promise2])
  .then((result) => {
    console.log(result);  // First resolved promise, regardless of others
  })
  .catch((error) => {
    console.log(error);  // If all promises reject
  });
```

## 8. Performance Considerations

* **Sequential Execution**: Using `await` sequentially in a loop can cause slow performance because it waits for each promise to resolve one by one.

* **Parallel Execution**: **`Promise.all()`** or **`Promise.allSettled()`** can help run multiple promises in parallel, improving performance.

```js
// Sequential:
async function fetchSequential() {
  await fetchData1();
  await fetchData2();
}

// Parallel:
async function fetchParallel() {
  await Promise.all([fetchData1(), fetchData2()]);
}
```

## 9. Common Pitfalls to Avoid

* **Forget to Use `await`**: If you forget to use `await` in an `async` function, the promise will return immediately, and you may not get the expected results.

  ```js
  async function example() {
    const result = fetchData();  // Forget to use await
    console.log(result);  // Promise is logged, not the resolved data
  }
  ```

* **Not Handling Rejections**: If a promise is rejected and no error handling is in place (e.g., `catch`), it could lead to unhandled promise rejections.

  ```js
  async function example() {
    const result = await fetchData();
    console.log(result);
  }

  example().catch((error) => console.error(error));  // Handle errors
  ```

---

### Conclusion

* **`async/await`** simplifies asynchronous code, making it more readable and easier to manage.
* **Suspension in the call stack** means that when `await` is used, the execution of the function is paused and control is returned to the event loop. Once the promise resolves, the function resumes execution, allowing for non-blocking code execution.
* Understanding how **parallel vs sequential execution** and **performance optimization** work with **`async/await`** is essential for writing efficient and effective asynchronous code.
