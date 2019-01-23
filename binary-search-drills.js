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

  findLargest() {
    if (this.right) return this.right.findLargest();
    else return this;
  }
  findSmallest() {
    if (this.left) return this.left.findSmallest();
    else return this;
  }
  remove(key) {
    if (this.key === key) {
      const parent = this.parent;
      if (!this.left && !this.right) {
        // remove if no children
        if (parent.left && parent.left.key === key) parent.left = null;
        else parent.right = null;
      } else if (this.left && this.right) {
        // remove if two children
        const largest = this.left.findLargest();
        if (largest.parent.left === largest) largest.parent.left = null;
        else largest.parent.right = null;
        if (parent.left && parent.left.key === key) parent.left = largest;
        else parent.right = largest;
        largest.parent = parent;
        largest.right = this.right;
        largest.left = this.left;
        this.right.parent = largest;
      } else {
        // remove if one child
        if (this.left) {
          if (parent.left && parent.left.key === key) parent.left = this.left;
          else parent.right = this.left;
          this.left.parent = parent;
          this.left = null;
        } else {
          if (parent.left && parent.left.key === key) parent.left = this.right;
          else parent.right = this.right;
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

  inOrderTraversal() {
    if (!this.left && !this.right) return [this.value];

    else {
      let leftArr = [];
      if (this.left) leftArr = this.left.traverseTree();
      // console.log('left: ', leftArr);
      let rightArr = [];
      if (this.right) rightArr = this.right.traverseTree();
      // console.log('right: ', rightArr);
      return leftArr.concat(this.value).concat(rightArr);
    }
  }
}

function height(tree) {
  //traversing down each child
  //saving the height of each child 
  //use a max function to find the largest of each childs height
  //if height is only one, return 1
  if (!tree.left && !tree.right) return 0;

  let leftChildTree = 0;
  if (tree.left) leftChildTree = height(tree.left);

  let rightChildTree = 0;
  if (tree.right) rightChildTree = height(tree.right);
  
  return Math.max(rightChildTree, leftChildTree) + 1;
}

function traverseTree(tree) {
  if (!tree.left && !tree.right) return [tree.value];

  else {
    let leftArr = [];
    if (tree.left) leftArr = traverseTree(tree.left);
    // console.log('left: ', leftArr);
    let rightArr = [];
    if (tree.right) rightArr = traverseTree(tree.right);
    // console.log('right: ', rightArr);
    return leftArr.concat(tree.value).concat(rightArr);
  }
}
function isBST(tree) {
  // check max of left is less than current and min of right is greater than current
  // recursively call isBST on tree.left and tree.right to make sure it continues all the way through
  if (!tree.left && !tree.right) return true;
  if ((tree.left && tree.left.findLargest.value > tree.value) || (tree.right && tree.right.findSmallest.value < tree.value)){
    return false;
  }
  let isLeftBST = true;
  if (tree.left) isLeftBST = isBST(tree.left);
  let isRightBST = true;
  if (tree.right) isRightBST = isBST(tree.right);
  return (isLeftBST && isRightBST);
}
function traversalForThirdLargest(tree) {
  if (!tree.left && !tree.right) return [tree.value];

  else {
    let leftArr = [];
    if (tree.left && (!tree.right || !tree.right.right)) leftArr = traversalForThirdLargest(tree.left);
    // console.log('left: ', leftArr);
    let rightArr = [];
    if (tree.right) rightArr = traversalForThirdLargest(tree.right);
    // console.log('right: ', rightArr);
    return leftArr.concat(tree.value).concat(rightArr);
  }
}
function thirdLargest(tree) {
  const arr = traversalForThirdLargest(tree);
  return arr[arr.length - 3];
}
function isBalanced(tree) {
  if (!tree.left && !tree.right) return true;
  let heightL = 0;
  let balL = true;
  if (tree.left) {
    heightL = height(tree.left);
    balL = isBalanced(tree.left);
  }
  let heightR = 0;
  let balR = true;
  if (tree.right) {
    heightR = height(tree.right);
    balR = isBalanced(tree.right);
  }
  return ((Math.abs(heightL-heightR) <= 1) && balL && balR);
}

function main() {
  const tree = new BinaryTree(2, '2');
  tree.insert(5, '5');
  tree.insert(3, '3');
  tree.insert(7, '7');
  tree.insert(4, '4');
  tree.insert(0, '0');
  tree.insert(6, '6');
  tree.insert(1, '1');
  // tree.insert(4.5, '4.5');


  console.log(isBalanced(tree));
  // console.log(tree.find(6));
}

main();