# dreadlocks2
Dread-free locks that drive consistency.

### Summary

* Create and use keys to identify objects:
  * `let key1 = hash(whatever)`
  * `let key2 = {whatever: 'whatever'}`
  * `let key3 = Symbol('whatever')`
* Create key sets for keys involved in each task:
  * `const keySet = [key1, key2, key3]`
* Lock these key sets
  * `Dread.lock(keySet).then(task)`
* Release these key sets once you're done.
  * `Dread.release(keySet)`

### Perks

* Respects `FIFO` (first-in-first-out) flow:
  * Iterates on queue on every release.
* Uses `Map` so you can use anything as a key.
  * `Map` has higher limits than `Object`.

### Use Cases:

* Database consistency & transactions.
* Ensuring order in execution of tasks that wish to modify possibly similar objects or entities.

### Changelog

* v2.x
  * Removed setInterval, smarter locking mechanism.
* v1.x
  * Uses setInterval, has immediate-locking mechanism.

---

### class `Dreadlock`
* constructor ()
* method `lock` (`items`)
  * `items` array of keys to lock
  * RETURNS Promise, resolves on lock success
* method `release` (`items`)
  * `items` array of keys to release
  * RETURNS Promise, resolves on release success
* property `size`
  * RETURNS current size of instance `Map`
* property `length`
  * RETURNS current size of instance `Array` queue
---

### Usage:

* Install:
```
npm install dreadlocks2 --save
yarn add dreadlocks2
```
```
const Dreadlock = require('dreadlocks2');
```

* Create instance:
```
const Dread = new Dreadlock();
```

* Lock your keys anywhere in your code:
```
const keySet1 = ['key1', 'key2', 'key3'];
Dread.lock(keySet1)
  .then(() => {
    console.log('Working with keySet1.');
    // Use your keySet1 keys here
    console.log('Done with keySet1.');
    return Dread.release(keySet1);
  })
  .then(() => {
    console.log('keySet1 released.');
  });
```
```
const keySet2 = ['key1', 'key4', 'key5'];
Dread.lock(keySet2)
  .then(() => {
    console.log('Working with keySet2.');
    // Use your keySet2 keys here
    console.log('Done with keySet2.');
    return Dread.release(keySet2);
  })
  .then(() => {
    console.log('keySet2 released.');
  });
```
* See the magic:
```
Working with keySet1.
Done with keySet1.
keySet1 released.
Working with keySet2.
Done with keySet2.
keySet2 released.
```

---

## License

Attribution 4.0 International (CC BY 4.0)

* https://creativecommons.org/licenses/by/4.0/
* https://creativecommons.org/licenses/by/4.0/legalcode.txt

![cc](https://creativecommons.org/images/deed/cc_blue_x2.png) ![by](https://creativecommons.org/images/deed/attribution_icon_blue_x2.png)