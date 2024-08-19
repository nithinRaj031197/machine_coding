### Question: What is the purpose of the compose and pipe functions in JavaScript?

Explanation:

- compose and pipe are higher-order functions used for function composition in JavaScript.
- compose takes multiple functions as arguments and returns a new function that applies these functions from right to left.
- pipe, on the other hand, applies the functions from left to right.
- Both compose and pipe are commonly used in functional programming to create new functions by combining existing ones in a specific order.

```javascript
function add(num) {
  return num + 5;
}

function sub(num) {
  return num - 2;
}

function multiply(num) {
  return num * 5;
}

function compose(...args) {
  return function (init) {
    // let result = init;
    // for(let i=args.length-1; i>=0; i--){
    //      result = args[i](result)
    // }
    // return result
    return args.reduceRight((acc, fn) => {
      return (acc = fn(acc));
    }, init);
  };
}

function pipe(...args) {
  return function (init) {
    // let result = init
    // for (let i=0; i<args.length; i++){
    //     result = args[i](result)
    // }
    // return result
    return args.reduce((acc, fn) => {
      return (acc = fn(acc));
    }, init);
  };
}

const solution = compose(add, sub, multiply);
console.log(solution(4));

const equate = pipe(add, sub, multiply);
console.log(equate(4));
```
