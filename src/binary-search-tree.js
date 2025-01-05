const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }

    let currentNode = this.rootNode;

    while (currentNode) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let currentNode = this.rootNode;
    
    while (currentNode) {
      if (data === currentNode.data) return currentNode;
      currentNode = data < currentNode.data ? currentNode.left : currentNode.right;
    }
    return null;
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      node.data = this.min(node.right);
      node.right = this.removeNode(node.right, node.data);
    }
    return node;
  }

  min(node = this.rootNode) {
    if (!node) return null;
    while (node.left) node = node.left;
    return node.data;
  }


  max(node = this.rootNode) {
    if (!node) return null;
    while (node.right) node = node.right;
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};
