// Node class

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// tree class
class Bst {
  constructor() {
    this.root = null;
  }

  // helper method which creates a new node to
  // be inserted and calls insertNode

  insert(data) {
    var newNode = new Node(data);
    // if the root is null set the data being recieved to be the root
    if (this.root === null) {
      this.root = newNode;
    } else {
      //otherwise keepp iterating ultil you find the right location
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    // if the data is less than the node
    // data move left of the tree
    if (newNode.data < node.data) {
      // if left is null insert node here
      if (node.left === null) node.left = newNode;
      // if left is not null recur until
      // null is found
      else this.insertNode(node.left, newNode);
    }

    // if the data is more than the node
    // data move right of the tree
    else {
      // if right is null insert node here
      if (node.right === null) node.right = newNode;
      // if right is not null recur until
      // null is found
      else this.insertNode(node.right, newNode);
    }
  }

  remove(data) {
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node, key) {
    // if the root is null then tree is
    // empty
    if (node === null) return null;
    // if data to be delete is less than
    // roots data then move to left subtree
    else if (key < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    }

    // if data to be delete is greater than
    // roots data then move to right subtree
    else if (key > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    }

    // if data is similar to the root's data
    // then delete this node
    else {
      // deleting node with no children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // deleting node with one children
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // Deleting node with two children
      // minimum node of the right subtree
      // is stored in aux
      var aux = this.findMinNode(node.right);
      node.data = aux.data;

      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }

  // from the smallest to the largest
  inorder(node) {
    if (node !== null) {
      this.inorder(node.left);
      console.log(node.data);
      this.inorder(node.right);
    }
  }

// visits the node prior to its descendant
  preorder(node) {
    if (node !== null) {
      console.log(node.data);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

//post-order visits the node after it visits its descendants
  postorder(node) {
    if (node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.data);
    }
  }

  findMinNode(node) {``
    // if left of a node is null
    // then it must be minimum node
    if (node.left === null) return node;
    else return this.findMinNode(node.left);
  }

  findMaxNode(node) {
    // if left of a node is null
    // then it must be minimum node
    if (node.right === null) return node;
    else return this.findMaxNode(node.right);
  }

  getRootNode() {
    return this.root;
  }

  search(node, data)
  {
     // if trees is empty return null
      if(node === null)
          return null;
   
      // if data is less than node's data
      // move left
      else if(data < node.data)
          return this.search(node.left, data);
   
      // if data is less than node's data
      // move left
      else if(data > node.data)
          return this.search(node.right, data);
   
      // if data is equal to the node data
      // return node
      else
          return node;
  }

}

var BST = new Bst();

BST.insert(15);
BST.insert(25);
BST.insert(10);
BST.insert(7);
BST.insert(22);
BST.insert(17);
BST.insert(13);
BST.insert(5);
BST.insert(9);
BST.insert(27);

// var root = BST.getRootNode();

// var root = BST.getRootNode();
// BST.preorder(root);

var root = BST.getRootNode();
// BST.postorder(root);

// BST.remove(5);
// BST.inorder(root);
var a = BST.findMinNode(root)

console.log(a)


