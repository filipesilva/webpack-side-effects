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
