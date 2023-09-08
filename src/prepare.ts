'use strict';

import { after, before } from "node:test";

before(function() {
  return new Promise<void>(resolve => {
    console.log('Preparing ...');
    setTimeout(() => {
      console.log('... prepared!');
      resolve();
    }, 1000);
  });
});

after(function() {
  return new Promise<void>(resolve => {
    console.log('Unpreparing ...');
    setTimeout(() => {
      console.log('... unprepared!');
      resolve();
    }, 1000);
  });
});