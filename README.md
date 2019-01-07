# Webpack side effects

This repository reproduces an issue with webpack's [side-effect library flag](https://github.com/webpack/webpack/blob/f6d67b6/examples/side-effects/README.md)
where exports that are referenced internally in another file are retained.

The example is a modified version of the one found in the [side-effect readme](https://github.com/webpack/webpack/blob/f6d67b6/examples/side-effects/README.md).

Besides the original `big-module` and `big-module-with-flag`, there are also two other with the following modifications:
- `big-module-with-flag-using-exports-internally`
```js
// index.js
export { a } from "./a";
export { b } from "./b";
export { c } from "./c";

var cc = c + c;
export { cc }
```

- `big-module-with-flag-using-exports-internally-in-another-file`
```js
// another-file
import { a, b, c } from "./index";

var aa = a + a;
export { aa }
var bb = b + b;
export { bb }
var cc = c + c;
export { cc }
```

The `example.js` file is modified to print all `a` and `b` exports, but no `c` ones.
```js
import { a as a1, b as b1 } from "./test_modules/big-module/index";
import { a as a2, b as b2 } from "./test_modules/big-module-with-flag/index";
import { a as a3, b as b3 } from "./test_modules/big-module-with-flag-using-exports-internally/index";
import { a as a4, b as b4 } from "./test_modules/big-module-with-flag-using-exports-internally-in-another-file/index";
import { aa as aa4, bb as bb4 } from "./test_modules/big-module-with-flag-using-exports-internally-in-another-file/another-file";

console.log(
  a1, b1,
  a2, b2,
  a3, b3,
  a4, b4,
  aa4, bb4,
);
```

Running `npm test` after `npm install` will show the following log:
```
Hash: 2ad7fff88f824d07f513
Version: webpack 4.28.2
Time: 155ms
Built at: 01/07/2019 1:54:49 PM
     Asset      Size  Chunks             Chunk Names
example.js  5.64 KiB       0  [emitted]  main
Entrypoint main = example.js
[0] ./test_modules/big-module-with-flag-using-exports-internally-in-another-file/index.js 74 bytes [built]
    ModuleConcatenation bailout: Module is not in any chunk
[1] ./example.js + 12 modules 997 bytes {0} [built]
    | ./example.js 577 bytes [built]
    |     ModuleConcatenation bailout: Module is an entry point
    | ./test_modules/big-module/index.js 75 bytes [built]
    | ./test_modules/big-module-with-flag-using-exports-internally-in-another-file/another-file.js 125 bytes [built]
    | ./test_modules/big-module/a.js 22 bytes [built]
    | ./test_modules/big-module/b.js 22 bytes [built]
    | ./test_modules/big-module/c.js 22 bytes [built]
    | ./test_modules/big-module-with-flag/a.js 22 bytes [built]
    | ./test_modules/big-module-with-flag/b.js 22 bytes [built]
    | ./test_modules/big-module-with-flag-using-exports-internally/a.js 22 bytes [built]
    | ./test_modules/big-module-with-flag-using-exports-internally/b.js 22 bytes [built]
    | ./test_modules/big-module-with-flag-using-exports-internally-in-another-file/a.js 22 bytes [built]
    | ./test_modules/big-module-with-flag-using-exports-internally-in-another-file/b.js 22 bytes [built]
    | ./test_modules/big-module-with-flag-using-exports-internally-in-another-file/c.js 22 bytes [built]
[2] ./test_modules/big-module-with-flag-using-exports-internally/index.js 105 bytes [built]
    ModuleConcatenation bailout: Module is not in any chunk
[3] ./test_modules/big-module-with-flag/index.js 75 bytes [built]
    ModuleConcatenation bailout: Module is not in any chunk
[4] ./test_modules/big-module-with-flag-using-exports-internally/c.js 22 bytes [built]
    ModuleConcatenation bailout: Module is not in any chunk
[5] ./test_modules/big-module-with-flag/c.js 22 bytes [built]
    ModuleConcatenation bailout: Module is not in any chunk
```

Notice how `big-module-with-flag-using-exports-internally-in-another-file/c.js` is retained in the `example.js` chunk, but 
`big-module-with-flag-using-exports-internally/c.js` is removed.