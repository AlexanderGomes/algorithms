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
    if (this.head == null) { // {3}
      this.head = node;
    } else {
      current = this.head; // {4}
      while (current.next != null) { // {5} get last item
        current = current.next;
      }
      // and assign next to new element to make the link
      current.next = node; // {6}
    }
    this.count++; // {7}
  }

  removeAt(index) {
    // check for out-of-bounds values
    if (index >= 0 && index < this.count) { // {1}
      let current = this.head; // {2}
      //removing first item
      if (index === 0) { // {3}
        this.head = current.next;
      } else {
        let previous; // {4}
        for (let i = 0; i < index; i++) { // {5}
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

}

const list = new LinkedList();
list.push(1);
list.push(2);
list.push(4);


