class LinkedList {
    constructor() {
      this.headNode = null;
      this.tailNode = null;
    }
  
    append(key, value) {
      let node = new Node();
      node.value = value;
      node.key = key;
      if (!this.tailNode) {
        this.tailNode = node;
        this.headNode = node;
      } else {
        this.tailNode.nextNode = node;
        this.tailNode = node;
      }
    }
    prepend(value) {
      let node = new Node();
      node.value = value;
      node.key = key;
      if (!this.headNode) {
        this.headNode = node;
        this.tailNode = node;
      } else {
        node.nextNode = this.headNode;
        this.headNode = node;
      }
    }
    size() {
      let current = this.headNode;
      let res = 0;
      if (current == null) {
        return 0;
      } else
        while (current !== null) {
          res += 1;
          current = current.nextNode;
        }
      return res;
    }
    head() {
      return this.headNode;
    }
    tail() {
      return this.tailNode;
    }
    at(index) {
      if (index >= this.size()) {
        throw new Error("this index is bigger than the list's size!");
      } else if (this.size == 0) {
        throw new Error("the list is empty!");
      } else {
        let currentNode = this.headNode;
        for (let i = 0; i < index; i++) {
          currentNode = currentNode.nextNode;
        }
        return currentNode.value;
      }
    }
    pop() {
      if (this.size() == 0 || this.size() == 1) {
        this.headNode = null;
        this.tailNode = null;
      } else {
        let aux = this.at(this.size() - 2);
        aux.nextNode = null;
        this.tailNode = aux;
      }
    }
    contains(value) {
      if (this.size() == 0) {
        throw new Error("the list is empty!");
      } else {
        let current = this.headNode;
        while (current !== null) {
          if (current.value == value) {
            return true;
          } else {
            current = current.nextNode;
          }
        }
        return false;
      }
    }
    containsKey(key) {
      if (this.size() == 0) {
        throw new Error("the list is empty!");
      } else {
        let current = this.headNode;
        while (current !== null) {
          if (current.key == key) {
            return true;
          } else {
            current = current.nextNode;
          }
        }
        return false;
      }
    }
    find(value) {
      if (this.size() == 0) {
        throw new Error("the list is empty!");
      } else {
        let current = 0;
        let currentNode = this.headNode;
        while (currentNode !== null) {
          if (currentNode.value == value) {
            return current;
          } else {
            currentNode = currentNode.nextNode;
            current += 1;
          }
        }
        return null;
      }
    }
    findKey(key) {
      if (this.size() == 0) {
        throw new Error("the list is empty!");
      } else {
        let current = 0;
        let currentNode = this.headNode;
        while (currentNode !== null) {
          if (currentNode.key == key) {
            return current;
          } else {
            currentNode = currentNode.nextNode;
            current += 1;
          }
        }
        return null;
      }
    }
    toString() {
      if (this.headNode == null) {
        return "null";
      } else {
        let res = "";
        let current = this.headNode;
        while (current !== null) {
          res += "(" + current.value + ") -> ";
          current = current.nextNode;
        }
        return res + " null";
      }
    }
    insertAt(key, value, index) {
      if (index > this.size()) {
        throw new Error("this index is bigger than the list's size!");
      } else if (this.headNode === null) {
        this.append(key, value);
      } else {
        let current = 0;
        let currentNode = this.headNode;
        let afterCurrentNode = this.headNode;
        while (current < index - 1) {
          current += 1;
          currentNode = currentNode.nextNode;
          afterCurrentNode = currentNode.nextNode;
        }
        let insert = new Node();
        insert.nextNode = afterCurrentNode;
        insert.value = value;
        insert.key = key;
        currentNode.nextNode = insert;
      }
    }
    removeAt(index) {
      if (index >= this.size()) {
        throw new Error("this index is bigger than the list's size!");
      } else {
        let current = 0;
        let currentNode = this.headNode;
        let afterCurrentNode = this.headNode;
        while (current < index - 1) {
          current += 1;
          currentNode = currentNode.nextNode;
          afterCurrentNode = currentNode.nextNode;
        }
        currentNode.nextNode = afterCurrentNode.nextNode;
      }
    }
  }
  class Node {
    constructor() {
      this.key = null;
      this.value = null;
      this.nextNode = null;
    }
  }
  

class HashMap {
  constructor() {
    this.size = 0;
    this.bucketNumber = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.bucketNumber)
      .fill(null)
      .map(() => new LinkedList());
  }
  static hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }
  set(key, value) {
    let index = HashMap.hash(key) % this.bucketNumber;
    if (this.buckets[index].headNode === null) {
      this.size += 1;
      if (this.bucketNumber * this.loadFactor <= this.size) {
        this.bucketNumber *= 2;
      }
      this.buckets[index].append(key, value);
    } else if (this.buckets[index].containsKey(key)) {
      this.buckets[index].removeAt(this.buckets[index].findKey(key));
      this.buckets[index].append(key, value);
    } else {
      this.buckets[index].append(key, value);
    }
  }
  get(key) {
    let index = HashMap.hash(key) % this.bucketNumber;
    let a = this.buckets[index].findKey(key);
    if (a) {
      return this.buckets[index].at(a);
    } else return null;
  }
  has(key) {
    let index = HashMap.hash(key) % this.bucketNumber;
    return this.buckets[index].containsKey(key);
  }
  remove(key) {
    let index = HashMap.hash(key) % this.bucketNumber;
    let a = this.buckets[index].findKey(key);
    if (a) {
      a = this.buckets[index].removeAt(a);
      return true;
    } else return false;
  }
  length() {
    return this.size;
  }
  clear() {
    this.size = 0;
    this.bucketNumber = 16;
    this.buckets = new Array(this.bucketNumber)
      .fill(null)
      .map(() => new LinkedList());
  }
  keys() {
    let list = [];
    for (let i of this.buckets) {
      if (i.headNode !== null) {
        let current = i.headNode;
        while (current !== null) {
          list.push(current.key);
          current = current.nextNode;
        }
      }
    }
    return list;
  }
  values() {
    let list = [];
    for (let i of this.buckets) {
      if (i.headNode !== null) {
        let current = i.headNode;
        while (current !== null) {
          list.push(current.value);
          current = current.nextNode;
        }
      }
    }
    return list;
  }
  entries() {
    let list = [];
    for (let i of this.buckets) {
      if (i.headNode !== null) {
        let current = i.headNode;
        while (current !== null) {
          list.push([current.key, current.value]);
          current = current.nextNode;
        }
      }
    }
    return list;
  }
}
const test = new HashMap()
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

