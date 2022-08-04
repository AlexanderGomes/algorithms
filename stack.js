//stacks

//array based Stack
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  clear() {
    this.items = [];
  }
}

const stack = new Stack();
stack.push(4);
stack.push(6);
stack.push(32);
stack.push(3);
stack.push(3);
stack.pop();
stack.pop();
console.log(stack);
console.log(stack.size());
console.log(stack.peek());
console.log(stack.isEmpty());

//object based stack

class Stacks {
  constructor() {
    this.count = 0;
    this.items = {};
  }
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }
  size() {
    return this.count;
  }
  isEmpty() {
    return this.count === 0;
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }
  clear() {
    this.items = {};
    this.count = 0;
  }
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }
}

const stacks = new Stacks();
stacks.push(2);
stacks.push(4);
stacks.push(8);
stacks.push(7);
stacks.pop();
stacks.pop();
stacks.clear();
stacks.toString();
stacks.push(3);
stacks.push(8);
stacks.push(7);
console.log(stacks);
console.log(stacks.size());
console.log(stacks.isEmpty());
console.log(stacks.peek());

//Converting decimal number to binary

function decimalToBinary(decNumber) {
  const remStack = new Stack();

  let number = decNumber;
  let rem;
  let binaryString = "";

  while (number > 0) {
    rem = Math.floor(number % 2);
    remStack.push(rem);
    number = Math.floor(number / 2);
  }
  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }
  return binaryString;
}

console.log(decimalToBinary(81377662));

//base converter algorithm

function baseConverter(decNumer, base) {
  const remStack = new Stack();
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let number = decNumer;
  let rem;
  let baseString = "";

  if (!(base >= 2 && base <= 36)) {
    return "";
  }
  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }
  return baseString;
}

console.log(baseConverter(100345, 2));
console.log(baseConverter(100345, 8));
console.log(baseConverter(100345, 16));
console.log(baseConverter(100345, 35));

