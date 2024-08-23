// 1. Deep Clone an object in JS?
var obj1 = {
  a: 1,
  b: {
    c: [1, 2],
    d: {
      e: 3,
    },
  },
};

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  let clone = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}

const clonedObj = deepClone(obj1);
clonedObj.b.d.e = 5;

console.log(clonedObj);

console.log(obj1);
