// hash table implementation

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

class HashTable {
    constructor(toStrFn = defaultToString) {
      this.toStrFn = toStrFn;
      this.table = {};
    }

    loseloseHashCode(key) {
        if (typeof key === 'number') { // {1}
   return key; }
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

   put(key, value) {
    if (key != null && value != null) { // {1}
      const position = this.hashCode(key); // {2}
      this.table[position] = new ValuePair(key, value); // {3}
      return true;
}
    return false;
  }

}


