// Anything exported from this file is importable by other in-browser modules.
import { ReplaySubject } from "rxjs";

export function publicApiFunction() {}

export function sayHello(who) {
  console.log(`%c${who} sayhello`, "color:skyblue");
}

export const sharedSubject = new ReplaySubject();
