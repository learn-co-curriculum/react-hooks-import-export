## Modular Code
As we've discussed before, maintaining single-responsibility is key to writing clean and DRY code, and React was built to support this practice.

In React, we work with components -- classes that contain individual functions, or groups of functions, and that are designed to accomplish specific tasks.

This empowers the creation of modular code, where units of our programs are clearly labeled and organized by being sectioned off into their own files.

What's great about components, however, is that they are reusable and relatable. This means that we'll want that we'll want to make use of one component inside another file. So how do we do this? With importing and exporting!

We `import` and `export` files by declaring their relative path to the file that we are currently in. We do this so that Node knows we are referencing a local module, as opposed to one found in `node_modules`, or in the global modules.

### Named exports
Named exports allow us to export several things at once. This is useful for utility modules or libraries. This is particularly helpful when we have a function or object that we want to reuse across components.

```js
// In a file called `sortingHat.js`

export let sortingHat = (student) => {
  if (student.name === 'Hermione') {
    return 'Gryffindor'
  } else if (student.name === 'Luna') {
    return 'Ravenclaw'
  } else if (student.name === 'Draco') {
    return 'Slytherin'
  } else {
    return 'Hufflepuff'
  }
}
```
```js
// In a file in the same directory

import {sortingHat} from './sortingHat'
console.log(sortingHat('Hermione')) // prints 'Gryffindor'
```
### Default export
A default export means that we're exporting only one thing from a file. We use `export default` to move components from their respective files and access them from other locations in our program.

To do this, we call `export default` on a reference to what we want to export. This can be done when defining the class itself such as `export default class Hogwarts extends React.Component {}` or by calling `export default Hogwarts` at the end of the file.

```js
// In a file called `hogwarts.js`

import React from 'react';
class Hogwarts extends React.Component {
  constructor = (props) => {
    super(props)
  }
  render() {
    return (
      <div className="Hogwarts">
        <div className="students-list">
          <p>{student.name}</p>
          <img src={student.img} alt="student image"></img>
        </div>
      </div>
    );
  }
}
export default Hogwarts;
```
We can then use `import Hogwarts from './hogwarts'` to access the component throughout our program.

```js
// In a file in the same directory

import Hogwarts from './hogwarts.js';
import ReactDOM from 'react-dom';
ReactDOM.render(
  <Hogwarts />,
  document.getElementById('root')
);

```
You'll mostly be using this method. It's important to correctly export your components, otherwise the tests can't access the code you've written, causing them to fail!
