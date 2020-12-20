# Organizing Code with Import/Export

## Introduction

In this lesson we'll discuss the ES6 keywords `import` and `export` and how they
allow us to share JavaScript code across multiple files.

## Objectives

1.  Understand why it's important to split up our code into smaller files
2.  Learn how `import` and `export` support our ability to build modular code
3.  Understand the different ways to import and export code

## Modular Code

Modular code is code that is separated into segments (modules), where each file
is responsible for a feature or specific functionality.

Developers separate their code into modules for many reasons:

- **Adhere to the single-responsibility principle**
  - Each module is responsible for accomplishing a certain piece of
    functionality, or adding a specific feature to the application
- **Easier to navigate**
  - Modules that are separated and clearly named make code more readable for
    other developers
- **Easier to debug**
  - Bugs have less room to hide in isolated, contained code
- **Produce clean and DRY code**
  - Modules can be reused and repurposed throughout applications

## Modularizing React Code

React makes the modularization of code easy by introducing the component
structure.

```js
function Hogwarts() {
  return (
    <div className="Hogwarts">
      "Harry. Did you put your name in the Goblet of Fire?"
    </div>
  );
}
```

It's standard practice to give each of these components their own file. It is
not uncommon to see a React program file tree that looks something like this:

```
├── README.md
├── public
└── src
     ├── App.js
     ├── Hogwarts.js
     └── Houses.js
```

With our components separated in their own files, all we have to do is figure
out how to access the code defined in one file within a different file. Well,
this is pretty easy to do in modern JavaScript! Introducing `import` and `export`!

## Import and Export

On a simplified level, `import` and `export` enable us to use code from one file
in other locations across our projects, which becomes increasingly important as
we build out larger applications. Let's look at how we can do this.

### Export

Exporting a component, or module of code, allows us to call upon that
`export`-ed variable in other files, and use the embedded code within other
modules. There are two ways to `export` code in JavaScript: we can use the
`export default` syntax or we can explicitly name our exports.

#### Export Default

We can only use `export default` once per module. The syntax allows us to rename
variables, if we so choose, when we want to import the given module.

For example:

```js
// src/houses/whoseHouse.js

function whoseHouse() {
  console.log("HAGRID'S HOUSE!");
}

export default whoseHouse;
```

We can then use `import` to make use of that function elsewhere.
`export default` allows us to name the exported code whatever we want when
importing it. For example, `import nameThisAnything from './houses/HagridsHouse'`
will provide us with the same code as
`import whoseHouse from './houses/HagridsHouse'` -- which is called aliasing!

```js
// src/Hogwarts.js
import React from "react";
import whoseHouse from "./houses/HagridsHouse";

function Hogwarts() {
  whoseHouse(); // => "HAGRID'S HOUSE!"

  return <h1>Welcome to Hogwarts!</h1>;
}
```

If we can `export default` functions, we can `export default` components! like
so...

```js
// src/houses/Hufflepuff.js
import React from "react";

export default function Hufflepuff() {
  return <div>NOBODY CARES ABOUT US</div>;
}
```

Then, we can import the entire component to any other file in our application,
using whatever naming convention that we see fit:

```js
// src/Hogwarts.js
import React from "react";
import HooflePoof from "./houses/Hufflepuff";

export default function Hogwarts() {
  return (
    <div>
      <HooflePoof />
      {/*
				Will render `NOBODY CARES ABOUT US`, even though we renamed `Hufflepuff`
				to `HooflePoof`
			*/}
    </div>
  );
}
```

You will commonly see a slightly different way of writing this:

```js
// src/Hogwarts.js
import React from "react";
import HooflePoof from "./houses/Hufflepuff";

function Hogwarts() {
  // ...
}

export default Hogwarts;
```

Moving all `export` statements to the bottom can make it easier to find exactly
what a file is exporting.

#### Named Exports

With named exports, we can export multiple pieces of code from within a module,
allowing us to call on them explicitly when we `import`.

Named exports allow us to export several specific things at once:

```js
// src/houses/Gryffindor.js
export function colors() {
  console.log("Scarlet and Gold");
}

function values() {
  console.log("Courage, Bravery, Nerve and Chivalry");
}

export function gryffMascot() {
  console.log("The Lion");
}
```

We can then `import` exports from a file using their original name, or
by explicitly assigning them a new one. Let's look at an example:

```js
// src/Hogwarts.js
import * as GryffFunctions from "./houses/Gryffindor";

GryffFunctions.colors();
// => 'Scarlet and Gold'

GryffFunctions.gryffMascot();
// => 'The Lion'

GryffFunctions.values();
// => ReferenceError: values is not defined
```

We will go into detail on the `import` line in just a moment, but briefly:
`import * as GryffFunctions from './houses/Gryffindor'` imports everything from
`./houses/Gryffindor.js` that is _exported_. Since we did not explicitly export
`values` in our `Gryffindor.js` file, we were unable to have access to the
function in `Hogwarts.js`. Other imported functions _within_ `Hogwarts.js` can
still call `values`, though.

We can also move named exports to the bottom of a file:

```js
// src/houses/Gryffindor.js
function colors() {
  console.log("Scarlet and Gold");
}

function values() {
  console.log("Courage, Bravery, Nerve and Chivalry");
}

function gryffMascot() {
  console.log("The Lion");
}

export { colors, gryffMascot };
```

### Import

The `import` keyword is what enables us to take modules that we've exported and
use them in other files throughout our applications. There are many ways to
`import` with React, and the method that we use depends on what type of code we
are trying to access and how we exported it.

In order to import a module into another file, we write out the relative path to
the file that we are trying to get access to. Let's look at some examples:

#### import \* from

`import * from` imports all of the functions that have been exported from a
given module. This syntax looks like:

```js
// src/Hogwarts.js
import * as GryffFunctions from "./houses/Gryffindor.js";

GryffFunctions.colors();
// > 'Scarlet and Gold'
```

We have the option to rename the module when we `import` it, as we did above.

#### import { variable } from

`import { variable } from` allows us to grab a specific variable/function by name, and
use that variable/function within the body of a new module.

We're able to reference the variable imported by its previously declared name:

```js
// src/Hogwarts.js
import { colors, gryffMascot } from "./houses/Gryffindor";

colors();
// > 'Scarlet and Gold'

gryffMascot();
// > 'The Lion'
```

...or rename it inside of our `import` statement:

```js
// src/Hogwarts.js
import { colors, gryffMascot as mascot } from "./houses/Gryffindor";

colors();
// > 'Scarlet and Gold'

mascot();
// > 'The Lion'
```

#### Importing Node Modules

```js
// src/Hogwarts.js
import React from "react";
import whoseHouse from "./houses/HagridsHouse";
import HooflePoof from "./houses/Hufflepuff";
import * as GryffFunctions from "./houses/Gryffindor";

export default function Hogwarts() {
  return (
    <div>
      <HooflePoof />
    </div>
  );
}
```

Take a look at the first line of code in this file: `import React from 'react'`.
Here, we are referencing the React library's default export. The React library
is located inside of the `node_modules` directory, a specific folder in many
Node projects that holds packages of third-party code. Any time we are using
code from a npm package, we must also import it in whatever file we're using it
in.

## Recap

`import` and `export` enable us to keep code modular, and use it across
different files. In addition to being able to `import` and `export` default
functions, we can rename and alias `import`s, as well as reference Node Modules
that are in our project.

[MDN Import Documentation][import]  
[MDN Export Documentation][export]

[import]: https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import
[export]: https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
