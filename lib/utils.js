var fs = require('fs');

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const exists = path => fs.stat.promise(path).then(() => true, () => false);
