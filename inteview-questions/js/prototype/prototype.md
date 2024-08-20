### Q1: Explain the difference between **proto** and prototype in JavaScript.

- **`__proto__`** : It points to prototype of an object and is used for inheritance and accessing the prototype chain.

- **`prototype`** : It exists on constructor functions to setup inheritance for objects created by that function, defining shared properties and methods for instances.

### Q2: What is setPrototypeOf()?

- It is a method to set prototype of specified object to another object or null.

### Q3: What is instanceof?

- It checks if an object is instance of specific constructor or its prototype chain.

### Q4: How can you create an object without a prototype in JavaScript?

- You can create an object without a prototype by using Object.create(null).
