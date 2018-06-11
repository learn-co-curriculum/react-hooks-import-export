# React Modular Code

## Introduction
In this lesson we'll discuss the ES6 keywords `import` and `export`, and how they allow us to share modularized code across multiple files within a JavaScript application.

## Objectives
1. Understand why it's important to split up our code into smaller files (modules)
2. Learn how `import` and `export` support our ability to build modular code
3. Understand the different ways to import and export code


## Modular Code
Maintaining single-responsibility is key to writing clean and DRY code. As our applications grow in size, it's important to separate our code into easy-to-read, reusable components. This separation makes our programs simpler, and less computationally expensive, as one file may be reused multiple times throughout our project.

Using React, we have multiple ways to define components. The most common way uses the React class component syntax:

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

Since React applications can become rather large, we want to make sure we keep them organized. In an effort to do just this, it's standard practice to give each of these components their own file. It is not uncommon to see a React program file tree that looks something like this:

```bash
├── README.md
├── public
└── src
     ├── App.js
     ├── Hogwarts.js
     └── Houses.js
```

In the example above we see that our components are modular because of how they are organized into their own files, with each file responsible for a certain piece of functionality. Now, all we have to do is figure out how to access the code defined in one file within a different file. Well, this is pretty easy to do in React! Introducing IMPORT EXPORT!

![import-meme](https://memegenerator.net/img/instances/11027875/yo-dawg-we-heard-you-like-to-import-data-so-we-put-an-export-feature-into-your-data-import-maps-so-y.jpg)


### Import and Export

On a fundamental level, `import` and `export` enable us to use code from a modules in other locations across our projects, which becomes increasingly important as we build out larger applications. As our programs grow in complexity, so do the file structures that we use to read and navigate them. You can imagine that a large application consisting of thousands of lines of code might be hard to navigate if all of its functions and components live within the same file! So, our solution is to divide those code blocks into their own respective modules that we can call upon as they are needed.  

Sectioning off our code into smaller components is good practice, as it supports the single-responsibility principle as well as makes our code easier to debug. Can you imagine how much easier it would be to fix a bug when you only have to look at the code that the error directly impacts, rather than dig through thousands of lines to find all of the places where the error may be breaking our code.
<!-- THIS STILL NEEDS WORK -by -->


Let's look at an example of how importing/exporting can be used from a high level. Circling back to our Hogwarts file tree:

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
        ├── Ravenclaw.js
        └── HagridsHouse.js
```

Hogwarts School of Witchcraft and Wizardry has four houses that make up its student and teacher population. If we were making a React App, we might want to have the `Hogwarts` component make use of every house component. To do this, we would need to make sure to `export` the house components so they are available for use (via `import`) in the rest of our React application. The code might look like this:

First, we `export`:

```js
// src/houses/Gryffindor.js
import React from 'react'

// make note of the `export` keyword below
export default class Gryffindor extends React.Component{

  render() {
    return (
      <div>GRYFFINDOR, HOME TO HERMIONE GRANGER</div>
    )
  }
}
```

...and then, we `import`:

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

Because we forgot to import the Slytherin component, but attempted to use it in our Hogwarts render() method, our program will return the below error informing us that it does not know what the Slyherin component is.
`// > 'Slytherin' is not defined  react/jsx-no-undef`

That is why it is key that we `import` and `export` local files correctly. The syntax for this is writing out the relative path of the component that we are importing, from the file that we are currently in.

### export Default


We use `export default` to export code from a file, whether it be an entire component or an individual function.

To do this, we call `export default` on what we want to export. This can be done when defining the class itself such as `export default class Hogwarts extends React.Component {}` or by calling `export default Hogwarts` at the end of the file.

```js
// src/houses/HagridsHouse.js
import React from 'react';

function whoseHouse() {
  console.log(`HAGRID'S HOUSE!`)
}

export default whoseHouse;
```

We can then use `import` to make use of that function elsewhere. `Export default` allows us to name the exported code whatever we want when importing it. For example, `import nameThisAnything from './HagridsHouse.js'` will provide us with the same code as `import whoseHouse from './HagridsHouse.js'`-- this is called aliasing!

Also, take a look at the first line of code in this file: `import React from 'react'`. Here, we are referencing the React library's default export. The React library is located inside of the `node_modules` folder, a specific folder in node/react projects that holds packages of third-party code.

```js
// src/Hogwarts.js
import whoseHouse from './house.js';
import ReactDOM from 'react-dom';

// TODO: remove reactDOM.render

ReactDOM.render(
  whoseHouse()
  // > `HAGRID'S HOUSE!`,
  document.getElementById('root')
);

```

If we can `export default` functions, we can `export default` components! like so...

```js
// src/houses/Hufflepuff.js
import React from 'react';

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
import React from 'react';
import HooflePoof from './houses/Hufflepuff.js';

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
It's important to note that we will never use `export default` on more than one function, component or variable. In React, there can only ever be one default export per file.


### Named Exports

<!-- needs rework on why named export/import is useful -->
<!-- still think this could use some more ^  - MATT -->
`export default` is great because it allows us to import functions, components or libraries without having to pay attention to naming conventions.

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
import { colors } from './houses/Gryffindor.js'
import { mascot as gryffMascot } from './houses/Gryffindor.js'

colors()
// > 'Scarlet and Gold'

gryffMascot()
// > 'The Lion'

values()
// > ReferenceError: values is not defined
```

With named exports we can also grab all of the functions from a given file in one foul swoop, like so:

```js
// src/Hogwarts.js
import * as GryffFunctions from './houses/Gryffindor.js'

GryffFunctions.colors()
// > 'Scarlet and Gold'

GryffFunctions.mascot()
// > 'The Lion'

GryffFunctions.values()
// > 'Courage, Bravery, Nerve and Chivalry'

```


Don't forget correct syntax when importing and exporting, otherwise you will feel like this idiot Ron.

![import-meme](https://collegecandy.files.wordpress.com/2015/02/toptenthingsonmyharrypotterbucketlist7.gif?w=639&h=235)

<!-- TODO: Recap Section -->
> what export/import do for us
> how we export (default or not)
> how we import (named or not)


## Recap
* Understand what import/export do for us
* How we export (default or not)
* How we import (named or not)


## External Resources

Understanding how to create absolute paths is outside the scope of this lab, but for further reading check out: https://coderwall.com/p/th6ssq/absolute-paths-require.
