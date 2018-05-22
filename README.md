## Introduction
In this lesson, we'll discuss `import` and `export`, ES6 keywords that allow us to share code across multiple files within a given program.

## Objectives
1. Understand why it's important to split up our programs into smaller files (modules)
2. Learn how `import` and `export` support our ability to build modular code
3. Understand the different ways to export code (named exports and default exports)

## Modular Code

Maintaining single-responsibility is key to writing clean and DRY code, as our applications grow in size its important to separate our code into easy to read, reusable segments. This separation makes our programs easier to navigate and our code easier to debug.

In React, we work with components -- which can be expressed with code in multiple ways. The most common is via the React class component syntax:

```js
class Hogwarts extends React.Component {
  
   render() {
     return (
       <div className="Hogwarts">
         Harry. Did you put your name in the Goblet of Fire?
       </div>
     )
    }
  }
```

Since React applications can grow to significant sizes, we want to make sure we keep it organized. In an effort to do just this, it's standard practice to give each of these components their own file. it is not uncommon to see a React program file tree that looks something like this:

```bash
├── README.md
├── public
└── src
     ├── App.js
     ├── Hogwarts.js
     └── Houses.js
``` 
     
In the example above we see that our components are modular (they have their own files), and that we can keep them organized this way. Now, all we have to do is figure out how to make use of the code defined in one file within another. Well, this is dirt easy to do in React! Introducing IMPORT EXPORT.

![import-meme](https://memegenerator.net/img/instances/11027875/yo-dawg-we-heard-you-like-to-import-data-so-we-put-an-export-feature-into-your-data-import-maps-so-y.jpg)

### Import Export
On a fundamental level, `import` and `export` enable us to use modules in other modules, which becomes increasingly important as we build out larger programs.

Sectioning off our programs into smaller components is good practice, as it supports the single-responsibility principle as well as making our code easier to debug. Can you imagine trying to find one line that's breaking our entire program, when there are 1000 lines of code?

Let's look at an example of how importing/exporting can be used from a high level. Circling back on our Hogwarts file tree:

```bash
 ├── README.md
 ├── public
 └── src
     ├── App.js
     ├── Hogwarts.js
     └── houses
         ├── Gryffindor.js
         ├── Slytherin.js
         ├── Hufflepuff.js
         └── Ravenclaw.js
``` 

Hogwarts School of Witchcraft and Wizardry has four houses that make up its student and teacher population. If we were making a react App, we might want to have the `Hogwarts` component make use of every house component. To do this, we would need to make sure to `export` the house components so they are available for `import` in the rest of our react application. The code might look like this:

First, we `export`:

```
import React from 'react'

export default class Gryffindor extends React.Component {

  render(){
    return(
      <div>GRYFFINDOR, HOME TO HERMIONE GRANGER</div>
    )
  }
}
```

...and then, we `import`:

```
import React from 'react'
import Gryffindor from './houses/Gryffindor'
import Slytherin from './houses/Slytherin'
import Ravenclaw from './houses/Ravenclaw'
import Hufflepuff from './houses/Hufflepuff'

export default class Hogwarts extends React.Component {
  render(){
    return(
      <div>
        <Gryffindor />
        <Ravenclaw />
        <Hufflepuff />
        <Slytherin />
      </div>
    )
  }
}
```

We `import` and `export` files by declaring their relative path to the file that we are currently in. We do this to ensure that we are accurately referencing a local module.

### Default export
A default export means that we're exporting only one thing from a file, in our case an entire React component. We use `export default` to move components from their respective files and access them from other locations in our program.

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

### Named exports
Default export is great because it allows us export the contents of an entire file with minimal hassle, but what if we only wanted to export explicit pieces of code, like functions, from a module? Named exports allow us to export several specific things at once.

```js
// In a file called `Gryffindor.js`

export function colors(){
	console.log("Scarlet and Gold")
}

function values(){
	console.log("Courage, Bravery, Nerve and Chivalry")					
}

 export function mascot(){
	console.log("The Lion")	
}
```
We can then use `import` to access any exported functions throughout our program.

```js
// In a file called 'Hogwarts.js'

import {colors, mascot} from './houses/Gryffindor.js'

colors() 
// prints 'Scarlet and Gold'
mascot() 
// prints 'The Lion'
```
