//Queue algorithms

class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const result = this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.count - this.lowestCount;
  }
  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }
}

const queue = new Queue();
queue.enqueue("Sander");
queue.enqueue("Gomes");
queue.enqueue("alex");
queue.enqueue("malu");
// queue.enqueue(queue.dequeue())
// queue.dequeue();

// console.log(queue.toString());
// console.log(queue.size());
// console.log(queue.isEmpty());
// console.log(queue.lowestCount)

//hotPotato game

function hotPotato(elementsList, num) {
  const queue = new Queue();
  const elemitatedList = [];

  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i]);
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    elemitatedList.push(queue.dequeue());
  }

  return {
    elminated: elemitatedList,
    winner: queue.dequeue(),
  };
}

//  const names = ['sander', 'malu', 'alex', 'silvana', 'gomes', 'maxymus']
//  const result = hotPotato(names, 5)

//  result.elminated.forEach(name => {
//   console.log(`${name} was eleminated from the game`)
//  })

//  console.log(`The winner is: ${result.winner}`)



// Deque data Structure
class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }

  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }

    const result = this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    return result;
  }

  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.count - this.lowestCount;
  }
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }
}

const deque = new Deque();
// deque.addBack('sander')
// deque.addBack('gomes')
// deque.addBack('malu')
// deque.addBack('hamir')
// deque.addFront('alex')
// console.log(deque.toString())
// console.log(deque.isEmpty())

//Palindrome cheker

function palindromeChecker(aString) {
  if (
    aString === undefined ||
    aString === null ||
    (aString !== null && aString.length === 0)
  ) {
    return false;
  }

  const deque = new Deque();
  const loweString = aString.toLowerCase().split('').join('');
  let isEqual = true;
  let firstChar, lastChar;

  for (let i = 0; i < loweString.length; i++) {
    deque.addBack(loweString[i]);
  }

  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) {
      isEqual = false;
    }
  }

  return isEqual;
}


console.log('casas', palindromeChecker('asa'))


