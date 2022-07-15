class MinHeap {
  storage: number[];
  size: number;

  constructor(nums?: number[]) {
    this.storage = [];
    this.size = 0;
    if (nums) {
      for (const num of nums) {
        this.insert(num);
      }
    }
  }

  private getLeftChildIndex(index: number) {
    return 2 * index + 1;
  }

  private getRightChildIndex(index: number) {
    return 2 * index + 2;
  }

  private getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  private hasLeftChild(index: number) {
    return this.getLeftChildIndex(index) < this.size;
  }

  private hasRightChild(index: number) {
    return this.getRightChildIndex(index) < this.size;
  }

  private hasParent(index: number) {
    return this.getParentIndex(index) >= 0;
  }

  private leftChild(index: number) {
    return this.storage[this.getLeftChildIndex(index)];
  }

  private rightChild(index: number) {
    return this.storage[this.getRightChildIndex(index)];
  }

  private parent(index: number) {
    return this.storage[this.getParentIndex(index)];
  }

  getMin() {
    return this.storage[0];
  }

  private swap(index1: number, index2: number) {
    let temp = this.storage[index1];
    this.storage[index1] = this.storage[index2];
    this.storage[index2] = temp;
  }

  popMin() {
    if (this.size == 0) throw new Error("Empty Heap");
    let data = this.storage[0];
    this.storage[0] = this.storage[this.size - 1];
    this.size -= 1;
    this.heapifyDown(0);
    return data;
  }

  private heapifyDown(index: number) {
    let smallest = index;
    if (
      this.hasLeftChild(index) &&
      this.storage[smallest] > this.leftChild(index)
    )
      smallest = this.getLeftChildIndex(index);
    if (
      this.hasRightChild(index) &&
      this.storage[smallest] > this.rightChild(index)
    )
      smallest = this.getRightChildIndex(index);
    if (smallest != index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  insert(data: number) {
    this.storage[this.size] = data;
    this.size += 1;
    this.heapifyUp(this.size - 1);
  }

  private heapifyUp(index: number) {
    if (this.hasParent(index) && this.parent(index) > this.storage[index]) {
      this.swap(index, this.getParentIndex(index));
      this.heapifyUp(this.getParentIndex(index));
    }
  }
}

class KthLargest {
  minheap: MinHeap;
  k: number;
  constructor(k: number, nums: number[]) {
    this.minheap = new MinHeap(nums);
    this.k = k;
    while (this.minheap.size > k) {
      this.minheap.popMin();
    }
  }

  add(val: number) {
    this.minheap.insert(val);
    if (this.minheap.size > this.k) {
      this.minheap.popMin();
    }
    return this.minheap.getMin();
  }
}
