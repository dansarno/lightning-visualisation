class MinHeap {
  constructor() {
    this.items = [];
    this.size = 0;
  }

  peek() {
    if (this.size == 0) {
      throw new Error('Heap is empty')
    } else {
      return this.items[0];
    }
  }

  poll() {
    if (this.size == 0) {
      throw new Error('Heap is empty')
    } else {
      let result = this.items[0];
      let end = this.items.pop();
      this.items[0] = end;
      this.size--;
      this.heapifyDown();
      return result;
    }
  }

  add(item) {
    this.items.push(item);
    this.size++;
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.size - 1;
    while (this.hasParent(index) && this.getParent(index) > this.items[index]) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.getRightChild(index) < this.getLeftChild(index)) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      if (this.items[index] < this.items[smallerChildIndex]) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }

  getLeftChildIndex(parentIndex) {
    return floor((2 * parentIndex) + 1);
  }

  getRightChildIndex(parentIndex) {
    return floor((2 * parentIndex) + 2);
  }

  getParentIndex(childIndex) {
    return floor((childIndex - 1) / 2);
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.size;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.size;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  getLeftChild(index) {
    return this.items[this.getLeftChildIndex(index)];
  }

  getRightChild(index) {
    return this.items[this.getRightChildIndex(index)];
  }

  getParent(index) {
    return this.items[this.getParentIndex(index)];
  }

  swap(index_a, index_b) {
    let temp = this.items[index_a];
    this.items[index_a] = this.items[index_b];
    this.items[index_b] = temp;
  }
}