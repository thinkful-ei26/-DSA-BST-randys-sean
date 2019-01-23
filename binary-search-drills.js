'use strict';

class BinaryTree {
  constructor(key, value, parent=null) {
    this.parent = parent;
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }

    if (key < this.key) {
      if (this.left === null) {
        this.left = new BinaryTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else if (this.right === null){
      this.right = new BinaryTree(key, value, this);
    } else {
      this.right.insert(key, value);
    }
  }

  


}

function main() {
  const tree = new BinaryTree();
  tree.insert(1, 'first');
  tree.insert(3, 'first');
  tree.insert(6, 'first');
  tree.insert(4, 'first');

  console.log(tree);
}

main();