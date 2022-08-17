function defaultEquals(a, b) {
  return a === b;
}

class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }

  push(element) {
    const node = new Node(element); // {1}
    let current; // {2}
    if (this.head == null) {
      // {3}
      this.head = node;
    } else {
      current = this.head; // {4}
      while (current.next != null) {
        // {5} get last item
        current = current.next;
      }
      // and assign next to new element to make the link
      current.next = node; // {6}
    }
    this.count++; // {7}
  }

  removeAt(index) {
    // check for out-of-bounds values
    if (index >= 0 && index < this.count) {
      // {1}
      let current = this.head; // {2}
      //removing first item
      if (index === 0) {
        // {3}
        this.head = current.next;
      } else {
        let previous; // {4}
        for (let i = 0; i < index; i++) {
          // {5}
          previous = current; // {6}
          current = current.next; // {7}
        }
        // link previous with current's next: skip it to remove
        previous.next = current.next; // {8}
      }
      this.count--; // {9}
      return current.element;
    }
    return undefined; // {10}
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      // {1}
      let node = this.head; // {2}
      for (let i = 0; i < index && node != null; i++) {
        // {3}
        node = node.next;
      }
      return node; // {4}
    }
    return undefined; // {5}
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      // {1}
      const node = new Node(element);
      if (index === 0) {
        // add on first position
        const current = this.head;
        node.next = current; // {2}
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1); // {3}
        const current = previous.next; // {4}
        previous.next = node; // {5}
        node.next = current; // {6}
      }
      this.count++; // update size of list
      return true;
    }
    return false; // {7}
  }

  indexOf(element) {
    let current = this.head; // {1}
    for (let i = 0; i < this.count && current != null; i++) {
      // {2}

      if (this.equalsFn(element, current.element)) {
        // {3}
        return i; // {4}
      }

      current = current.next; // {5}
    }

    return -1; // {6}
  }

  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.size() === 0;
  }

  getHead() {
    return this.head;
  }

  toString() {
    if (this.head == null) {
      // {1}
      return "";
    }
    let objString = `${this.head.element}`; // {2}
    let current = this.head.next; // {3}
    for (let i = 1; i < this.size() && current != null; i++) {
      // {4}
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString; // {5}
  }
}

const list = new LinkedList();
// list.push(1);
// list.push(2);
// list.insert(3, 1)

// console.log(list.getElementAt(0))

// // // Doubly linked lists // // //

class DoublyNode extends Node {
  // {1}
  constructor(element, next, prev) {
    super(next, element); // {2}
    this.prev = prev; // {3} NEW
  }
}

class DoublyLinkedList extends LinkedList {
  // {4}
  constructor(equalsFn = defaultEquals) {
    super(equalsFn); // {5}
    this.tail = undefined; // {6} NEW
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) {
          // {1} NEW
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head; // {2}
          current.prev = node; // {3} NEW
          this.head = node; // {4}
        }
      } else if (index === this.count) {
        // last item NEW
        current = this.tail; // {5}
        current.next = node; // {6}
        node.prev = current; // {7}
        this.tail = node; // {8}
      } else {

        const previous = this.getElementAt(index - 1); // {9}
        current = previous.next; // {10}

        node.next = current; // {11}
        node.prev = previous; // {14} NEW

        previous.next = node; // {12}
        current.prev = node; // {13} NEW
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next; // {1}
        // if there is only one item, then we update tail as well NEW
        if (this.count === 1) {
          // {2}
          this.tail = undefined;
        } else {
          this.head.prev = undefined; // {3}
        }
      } else if (index === this.count - 1) {
        // last item NEW
        current = this.tail; // {4}
        this.tail = current.prev; // {5}
        this.tail.next = undefined; // {6}
      } else {
        current = this.getElementAt(index); // {7}
        const previous = current.prev; // {8}
        // link previous with current's next - skip it to remove
        previous.next = current.next; // {9}
        current.next.prev = previous; // {10} NEW
      }
      this.count--;
      return current.element;
    }
    return true;
  }
}

const double = new DoublyLinkedList();
list.push(15);
console.log('list.toString() => ', list.toString());
list.push(16);
console.log('list.toString() => ', list.toString());
list.push(17);
console.log('list.toString() => ', list.toString());
console.log('insert element 13 pos 0 => ', list.insert(13, 0));
console.log('list.toString() => ', list.toString());
console.log('insert element 18 pos 4 => ', list.insert(18, 4));
console.log('list.toString() => ', list.toString());
console.log('list.removeAt(0) => ', list.removeAt(3));
console.log('list.toString() => ', list.toString());
console.log('list.removeAt(list.size() - 1) => ', list.removeAt(list.size() - 1));
console.log('list.toString() => ', list.toString());
console.log('index of element => ', list.indexOf(15));
console.log('head => ', list.getHead());
console.log('insert element 18 pos 4 => ', list.insert(4, 3));
console.log('list.toString() => ', list.toString()); 













// // // Circular Linked List // // //

class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) {
          this.head = node; // {1}
          node.next = this.head; // {2} NEW
        } else {
          node.next = current; // {3}
          current = this.getElementAt(this.size()); // {4}
          // update last element
          this.head = node; // {5}
          current.next = this.head; // {6} NEW
        }
      } else {
        // no changes in this scenario
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        if (this.size() === 1) {
          this.head = undefined;
        } else {
          const removed = this.head; // {1}
          current = this.getElementAt(this.size()); // {2} NEW
          this.head = this.head.next; // {3}
          current.next = this.head; // {4}
          current = removed; // {5}
        }
      } else {
        // no need to update last element for circular list
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element; // {6}
    }
    return undefined;
  }
}



 