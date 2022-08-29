// for the second hash table
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
  




  

  // Hash table with linked list dealing with collision.
  function defaultToString(item) {

    if (item === null) {
      return "NULL";
    } else if (item === undefined) {
      return "UNDEFINED";
    } else if (typeof item === "string" || item instanceof String) {
      return `${item}`;
    }
    return item.toString(); // {1}

  }

  // change the format of the output of the defaultToString function
  class ValuePair {
    constructor(key, value) {
      this.key = key;
      this.value = value;
    }
    toString() {
      return `[#${this.key}: ${this.value}]`;
    }
  }


  class HashTableSeparateChaining {

    constructor(toStrFn = defaultToString) {
      this.toStrFn = toStrFn;
      this.table = {};
    }
    

    put(key, value) {
      if (key != null && value != null) {
        const position = this.hashCode(key);
        if (this.table[position] == null) {
          // {1}
          this.table[position] = new LinkedList(); // {2}
        }
        this.table[position].push(new ValuePair(key, value)); // {3}
        return true;
      }
      return false;
    }
  
    get(key) {
      const position = this.hashCode(key);
      const linkedList = this.table[position]; // {1}
      if (linkedList != null && !linkedList.isEmpty()) {
        // {2}
        let current = linkedList.getHead(); // {3}
        while (current != null) {
          // {4}
          if (current.element.key === key) {
            // {5}
            return current.element.value; // {6}
          }
          current = current.next; // {7}
        }
      }
      return undefined; // {8}
    }
  
    remove(key) {
      const position = this.hashCode(key);
      const linkedList = this.table[position];
      if (linkedList != null && !linkedList.isEmpty()) {
        let current = linkedList.getHead();
        while (current != null) {
          if (current.element.key === key) {
            // {1}
            linkedList.remove(current.element); // {2}
            if (linkedList.isEmpty()) {
              // {3}
              delete this.table[position]; // {4}
            }
            return true; // {5}
          }
          current = current.next; // {6}
        }
      }
      return false; // {7}
    }

  
    loseloseHashCode(key) {
      if (typeof key === "number") {
        // {1}
        return key;
      }
      const tableKey = this.toStrFn(key); // {2}
      let hash = 0; // {3}
  
      for (let i = 0; i < tableKey.length; i++) {
        hash += tableKey.charCodeAt(i); // {4}
      }
      return hash % 37; // {5}
    }
  
    hashCode(key) {
      return this.loseloseHashCode(key);
    }
  
    toString() {
      if (this.isEmpty()) {
        return "";
      }
      const keys = Object.keys(this.table);
      let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
      for (let i = 1; i < keys.length; i++) {
        objString = `${objString},{${keys[i]} => ${this.table[
          keys[i]
        ].toString()}}`;
      }
      return objString;
    }
  
    
    size() {
      return Object.keys(this.table).length;
    }
  
    isEmpty() {
      return this.size() === 0;
    }
  }
  
  const hashs = new HashTableSeparateChaining();
  
  hashs.put("Gandalf", "gandalf@email.com");
  hashs.put("Gandalf", "gandalf@email.com");
  
  hashs.put("John", "johnsnow@email.com");
  hashs.put("sander", "gomes@email.com");
  hashs.put("Tyrion", "tyrion@email.com");


  console.log(hashs.toString());