# React Modular Code

## Introduction
In this lesson we'll discuss the ES6 keywords `import` and `export`, and how they allow us to share modularized code across multiple files within a JavaScript application.

## Objectives
1. Understand why it's important to split up our code into smaller files (modules)
2. Learn how `import` and `export` support our ability to build modular code
3. Understand the different ways to import and export code

## Modular Code
<!-- What is modular code, what does it mean -->
Modular code is code that is separated into segments (modules), where each file is responsible for a feature or specific functionality.

<!-- Why is it import  -->
Developers separate their code into modules for many reasons:
* Adhere to the single-responsiblity principle
  * Each module is responsible for accomplishing a certain piece of functionality, or adding a specific feature to the application.  
* Make code easy to navigate
  * Modules that are separated and clearly named make code more read-able for other developers, which is important when sharing a code base with a team.
* Render code easier to debug
  * When errors are raised, all the code effected by that given error should be isolated in one module, making it easier to debug the code.
* Produce clean and DRY code
  * Modules can be reused and repurposed throughout applications, making larger applications less computationally expensive.

<!-- What does that look like in React ? (Components)-->
React makes the modularization of applications really easy, by introducing the component structure.

<!-- Create react component -->
```js
class Hogwarts extends React.Component {
  render() {
    return (
      <div className="Hogwarts">
        "Harry. Did you put your name in the Goblet of Fire?"
      </div>
    )
  }
}
```
<!-- Component File tree  -->
It's standard practice to give each of these components their own file. It is not uncommon to see a React program file tree that looks something like this:

<!-- File tree  -->
```bash
├── README.md
├── public
└── src
     ├── App.js
     ├── Hogwarts.js
     └── Houses.js
```

<!-- How can we access these components throughout our programs? import/export -->
Now, all we have to do is figure out how to access the code defined in one file within a different file. Well, this is pretty easy to do in React! Introducing IMPORT EXPORT!

![import-meme](https://memegenerator.net/img/instances/11027875/yo-dawg-we-heard-you-like-to-import-data-so-we-put-an-export-feature-into-your-data-import-maps-so-y.jpg)


## Import and Export
On a fundamental level, `import` and `export` enable us to use code from one module in other locations across our projects, which becomes increasingly important as we build out larger applications. Let's look at how we can do this:

## Export
Exporting a component, or module of code, allows us to call upon that `export` in other files, and use the embedded code within other modules. There are two ways to `export` code in JavaScript: we can use the `export default` syntax <!-- is command the right word here?  --> or we can explicitly name our exports.

### Export Default
We can only use `export default` once per module; however, the syntax allows us to disregard naming conventions when we want to import the given module.

For example:
```js
// src/houses/HagridsHouse.js
import React from 'react'

function whoseHouse() {
  console.log(`HAGRID'S HOUSE!`)
}

export default whoseHouse
```
We can then use `import` to make use of that function elsewhere. `export default` allows us to name the exported code whatever we want when importing it. For example, `import nameThisAnything from './HagridsHouse.js'` will provide us with the same code as `import whoseHouse from './HagridsHouse.js'`-- which is called aliasing!
```js
// src/Hogwarts.js
import whoseHouse from './house.js'
import ReactDOM from 'react-dom'

render() {
  return (
    whoseHouse()
    // > `HAGRID'S HOUSE!`,
    document.getElementById('root')
  )
}
```
If we can `export default` functions, we can `export default` components! like so...
```js
// src/houses/Hufflepuff.js
import React from 'react'

export default class Hufflepuff extends React.Component{
  render() {
    return (
      <div>
        NOBODY CARES ABOUT US
      </div>
    )
  }
}
```

Then, we can import the entire component to any other file in our application, using whatever naming convention that we see fit:

```js
// src/Hogwarts.js
import React from 'react'
import HooflePoof from './houses/Hufflepuff.js'

export default class Hogwarts extends React.Component{
  render(){
    return(
      <div>
        <HooflePoof/>
        //> Will render `NOBODY CARES ABOUT US`, regardless of the fact that we renamed `Hufflepuff` to `HooflePoof`
      </div>
    )
  }
}

```
### Named Exports
With named exports, we can export multiple pieces of code from within a module, allowing us to call on them explicitly when we `import`.

Named exports, on the other hand, allow us to export several specific things at once.
```js
// src/houses/Gryffindor.js
export function colors() {
  console.log("Scarlet and Gold")
}

function values() {
  console.log("Courage, Bravery, Nerve and Chivalry")
}

export function mascot() {
  console.log("The Lion")
}
```
We can then `import` specific functions from a file using their original name, or by explicitly assigning them a new one. Let's look at an example:
```js
// src/Hogwarts.js
import * from './houses/Gryffindor.js'

colors()
// > 'Scarlet and Gold'

gryffMascot()
// > 'The Lion'

values()
// > ReferenceError: values is not defined
```
Since we did not explicitly export `values()` in our `Gryffindor.js` file, we were unable to have access to the function in `Hogwarts.js`.

## Import
The `import` keyword is what enables us to take modules that we've exported and use them in other files throughout our applications. There are many ways to `import` with React, and the method that we use depends on what type of code we are trying to access and how we exported it.

One this that remains consistent, however, is that in order to import a module into another file, we write out the relative path from the file that we are currently in to the file that we are trying to get access to. Let's look at some examples:

### import * from
`import * from` imports all of the functions that have been exported from a given module. This syntax looks like:
```js
// src/Hogwarts.js
import * as GryffFunctions from './houses/Gryffindor.js'

GryffFunctions.colors()
// > 'Scarlet and Gold'
```
Note: we have the option to rename the module when we `import` it, as we did above. However, this is also acceptable:
```js
// src/Hogwarts.js
import * from './houses/Gryffindor.js'

colors()
// > 'Scarlet and Gold'
```
### import {function()} from
`import {function()} from` allows us to grab a specific function by name, and use that function within the body of a new module.

We're able to reference the function imported by it's previously declared name, or rename it inside of our `import` statement.
```js
// src/Hogwarts.js
import { colors } from './houses/Gryffindor.js'
import { mascot as gryffMascot } from './houses/Gryffindor.js'

colors()
// > 'Scarlet and Gold'

gryffMascot()
// > 'The Lion'
```

### import defaultExport
We are also able to `import` modules that were exported using `export default`.
```js
// src/Hogwarts.js

import React from 'react'
import Gryffindor from './houses/Gryffindor'
import Ravenclaw from './houses/Ravenclaw'
import Hufflepuff from './houses/Hufflepuff'

export default class Hogwarts extends React.Component {
  render() {
    return (
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
Take a look at the first line of code in this file: `import React from 'react'`. Here, we are referencing the React library's default export. The React library is located inside of the `node_modules` folder, a specific folder in node/react projects that holds packages of third-party code.
## Recap
<!-- Needs to be stronger than in previous README  -->

## External Resources
Understanding how to create absolute paths is outside the scope of this lab, but for further reading check out: https://coderwall.com/p/th6ssq/absolute-paths-require.
