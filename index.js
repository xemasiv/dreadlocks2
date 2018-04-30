class Dreadlock {
  constructor() {
    this._lock = new Map();
    this._queue = [];
  }
  lock(items) {
    let dread = this;
    let p = new Promise(resolve => {
      if (items.every(item => dread._lock.has(item) === false) === true) {
        items.map(item => dread._lock.set(item));
        resolve();
      } else {
        dread._queue.push({
          items,
          resolve
        });
      }
    });
    return p;
  }
  release(items) {
    let dread = this;
    let p = new Promise(resolve => {
      items.map(item => dread._lock.delete(item));
      for (var i = 0; i < dread._queue.length; i++) {
        if (
          dread._queue[i].items.every(
            item => dread._lock.has(item) === false
          ) === true
        ) {
          dread._queue[i].items.map(item => dread._lock.set(item));
          dread._queue[i].resolve();
          dread._queue.splice(i, 1);
        }
      }
      resolve();
    });
    return p;
  }
  get size() {
    return this._lock.size;
  }
  get length() {
    return this._queue.length;
  }
}
module.exports = Dreadlock;
