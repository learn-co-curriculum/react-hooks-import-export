# Organizing Code with Import/Export

## Learning Goals

- Understand why it's important to split up our code into smaller files
- Learn how `import` and `export` support our ability to build modular code
- Understand the different ways to import and export code

## Introduction

In this lesson we'll discuss the `import` and `export` keywords and how they
allow us to share JavaScript code across multiple files.

## Modular Code

Modular code is code that is separated into segments (modules), where each file
is responsible for a feature or specific functionality.

Developers separate their code into modules for many reasons:

- **Stricter variable scope**
  - Variables declared in modules are private unless they are explicitly
    exported, so by using modules, you don't have to worry about polluting the
    global variable scope
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

```jsx
function ColoradoStateParks() {
  return (
    <h1>
      Colorado State Parks!
    </h1>
  );
}
```

It's standard practice to give each of these components their own file. It is
not uncommon to see a React program file tree that looks something like this:

```txt
├── README.md
├── public
└── src
     ├── App.js
     ├── ColoradoStateParks.js
     └── parks
```

With our components separated in their own files, all we have to do is figure
out how to access the code defined in one file within a different file. Well,
this is easily done in modern JavaScript using `import` and `export`!

## Import and Export

On a simplified level, `import` and `export` enable us to use code from one file
in other locations across our projects, which becomes increasingly important as
we build out larger applications. Let's look at how we can do this. Fork and
clone the repo for this lesson if you'd like to follow along with the examples.

### Export

Since variables in modules are not visible to other modules by default, we must
explicitly state which variables should be made available to the rest of our
application. Exporting a component — or module of code — allows us to call upon
that `export`-ed variable in other files, and use the embedded code within other
modules. There are two ways to `export` code in JavaScript: we can use the
`export default` syntax or we can explicitly name our exports.

#### Export Default

We can only use `export default` once per module. This syntax lets us export
one variable from a module which we can then import in another file.

For example:

```js
// src/parks/howManyParks.js

function howManyParks() {
  console.log("42 parks!");
}

export default howManyParks;

```

This enables us to use `import` to make use of that function elsewhere:

```jsx
// src/ColoradoStateParks.js
import React from "react";
import howManyParks from "./parks/howManyParks";

function ColoradoStateParks() {
  howManyParks(); // => "42 parks!"

  return <h1>Colorado State Parks!</h1>;
}
```

`export default` allows us to name the exported code whatever we want when
importing it:

```jsx
// src/ColoradoStateParks.js
import React from "react";
import aDifferentName from "./parks/howManyParks";

function ColoradoStateParks() {
  aDifferentName(); // => "42 parks!"

  return <h1>Colorado State Parks!</h1>;
}
```

It's generally not advised to rename exports, since it can make it more
difficult to debug. Use this technique sparingly (for example, when you are
using a library that exports a default variable with the same name as one of
your own variables).

Since React components are also just functions, we can export them too! You'll
typically have just one React component per file, so it makes sense to use the
`export default` syntax with React components, like so:

```jsx
// src/parks/MesaVerde.js
import React from "react";

function MesaVerde() {
  return <h1>Mesa Verde National Park</h1>;
}

export default MesaVerde;
```

Then, we can import the entire component to any other file in our application,
using whatever naming convention that we see fit:

```jsx
// src/ColoradoStateParks.js
import React from "react";
import MesaVerde from "./parks/MesaVerde";

function ColoradoStateParks() {
  return (
    <div>
      <MesaVerde />
    </div>
  );
}

export default ColoradoStateParks;
```

You may come across a slightly different way of writing this, with
`export default` written directly in front of the name of the function:

```js
export default function ColoradoStateParks() {
  // ...
}
```

Our preferred approach is to write the export statements at the bottom of the
file for consistency and to make it easier for other developers to identify what
is being exported, but the syntax above will also work.

#### Named Exports

With named exports, we can export multiple variables from within a module,
allowing us to call on them explicitly when we `import`.

Named exports allow us to export several specific things at once:

```js
// src/parks/RockyMountain.js
const trees = "Aspen and Pine";

function wildlife() {
  console.log("Elk, Bighorn Sheep, Moose");
}

function elevation() {
  console.log("9583 ft");
}

export { trees, wildlife };
```

We can then `import` and use them in another file:

```js
// src/ColoradoStateParks.js
import { trees, wildlife } from "./parks/RockyMountain";

console.log(trees);
// => "Aspen and Pine"

wildlife();
// => "Elk, Bighorn Sheep, Moose"
```

We can also write named exports next to the function definition:

```js
// src/parks/RockyMountain.js
export const trees = "Aspen and Pine";

export function wildlife() {
  console.log("Elk, Bighorn Sheep, Moose");
}

function elevation() {
  console.log("9583 ft");
}
```

### Import

The `import` keyword is what enables us to take modules that we've exported and
use them in other files throughout our applications. There are many ways to
`import` with React, and the method that we use depends on what type of code we
are trying to access and how we exported it.

In order to import a module into another file, we write out the **relative
path** to the file that we are trying to access. Let's look at some examples.

#### import \* from

`import * from` imports all of the functions that have been exported from a
given module. This syntax looks like:

```js
// src/ColoradoStateParks.js
import * as RMFunctions from "./parks/RockyMountain";

console.log(RMFunctions.trees);
// > "Aspen and Pine"

RMFunctions.wildlife();
// => "Elk, Bighorn Sheep, Moose"

RMFunctions.elevation();
// => Attempted import error
```

In the example above, we're importing all the exported variables from file
`RockyMountain.js` as properties on an object called `RMFunctions`. Since
`elevation` is not exported, trying to use that function will result in an error.

We are using the **relative path** to navigate from `src/ColoradoStateParks.js` to
`src/parks/RockyMountain.js`. Since our file structure looks like this:

```txt
└── src
     ├── parks
     |   ├── RockyMountain.js
     |   ├── MesaVerde.js
     |   └── howManyParks.js
     ├── ColoradoStateParks.js
     └── index.js
```

To get from `ColoradoStateParks.js` to `RockyMountain.js`, we can stay in the `src`
directory, then navigate to `parks`, where we'll find `RockyMountain.js`.

#### import { variable } from

`import { variable } from` allows us to grab a specific variable/function by
name, and use that variable/function within the body of a new module.

We're able to reference the imported variable by its previously declared name:

```js
// src/ColoradoStateParks.js
import { trees, wildlife } from "./parks/RockyMountain";

console.log(trees);
// > "Aspen and Pine"

wildlife();
// > "Elk, Bighorn Sheep, Moose"
```

We can also rename any or all of the variables inside of our `import`
statement:

```js
// src/ColoradoStateParks.js
import { trees as parkTrees, wildlife as parkWildlife } from "./parks/RockyMountain";

console.log(parkTrees);
// > "Aspen and Pine"

parkWildlife();
// > "Elk, Bighorn Sheep, Moose"
```

#### Importing Node Modules

```jsx
// src/ColoradoStateParks.js
import React from "react";
import howManyParks from "./parks/howManyParks";
import MesaVerde from "./parks/MesaVerde";
import * as RMFunctions from "./parks/RockyMountain";

export default function ColoradoStateParks() {
  return (
    <div>
      <MesaVerdePark />
    </div>
  );
}
```

Take a look at the first line of code in this file: `import React from 'react'`.
Here, we are referencing the React library's default export. The React library
is located inside of the `node_modules` directory, a specific folder in many
Node projects that holds packages of third-party code. Any time we are using
code from an npm package, we must also import it in whatever file we're using it
in.

## Conclusion

`import` and `export` enable us to keep code modular, and use it across
different files. In addition to being able to `import` and `export` default
functions, we can rename and alias `import`s. We can also reference npm packages
that are in our project.

[MDN Import Documentation][import]  
[MDN Export Documentation][export]

[import]: https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import
[export]: https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
