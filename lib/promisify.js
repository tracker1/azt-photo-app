Function.prototype.promise = function(...input) {
  var fn = this;
  return new Promise((resolve, reject) => {
    try {
      fn(...input, (err, ...result) => {
        if (err) return reject(err);
        return resolve(result.length < 2 ? result[0] : result);
      });
    } catch(e) {
      return reject(e);
    }
  });
};