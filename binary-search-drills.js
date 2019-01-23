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

    if (this.key > key) {
      if (this.left === null) {
        this.left = new BinaryTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null){
        this.right = new BinaryTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  _findLargest() {
    if (this.right) return this.right._findLargest();
    else return this;
  }
  remove(key) {
    if (this.key === key) {
      const parent = this.parent;
      if (!this.left && !this.right) {
        // remove if no children
        if (parent.left.key === key) parent.left = null;
        else parent.right = null;
      } else if (this.left && this.right) {
        // remove if two children
        const largest = this.left._findLargest();
        if (largest.parent.left === largest) largest.parent.left = null;
        else largest.parent.right = null;
        largest.parent = parent;
        largest.right = this.right;
        largest.left = this.left;
      } else {
        // remove if one child
        if (this.left) {
          this.left.parent = parent;
          this.left = null;
        } else {
          this.right.parent = parent;
          this.right = null;
        }
      }
    } else if (this.key > key) {
      if (this.left === null) {
        // key is not in the tree
        throw new Error('Key Error');
      } else {
        this.left.remove(key);
      }
    } else {
      if (this.right === null) {
        // key is not in the tree
        throw new Error('Key Error');
      } else {
        this.right.remove(key);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this;
    }

    if (this.key > key) {
      if (!this.left) {
        throw new Error('Key Error');
      } else {
        return this.left.find(key);
      }
    } else {
      if (!this.right) {
        throw new Error('Key Error');
      } else {
        return this.right.find(key);
      }
    }
  }
}

function main() {
  const tree = new BinaryTree();
  tree.insert(1, 'first');
  tree.insert(3, 'third');
  tree.insert(6, 'first');
  tree.insert(4, 'first');

  // console.log(tree.find(6));

}

main();