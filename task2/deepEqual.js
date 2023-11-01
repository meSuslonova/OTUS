var obj1 = {
  a: {
    b: 1,
  },
};

var obj2 = {
  a: {
    b: 2,
  },
};

var obj3 = {
  a: {
    b: 1,
  },
};

const deepEqual = (a, b, path = '') => {
  if (a === b) {
    return 'OK';
  }

  if (
    a === null ||
    b === null ||
    typeof a !== 'object' ||
    typeof b !== 'object'
  ) {
    return `Error: ${path}`;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return `Error: ${path}`;
  }

  for (let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];
    const newPath = path ? `${path}.${key}` : key;

    if (!b.hasOwnProperty(key) || deepEqual(a[key], b[key], newPath) !== 'OK') {
      return `Error: ${newPath}`;
    }
  }

  return 'OK';
};

console.log(deepEqual(obj1, obj1)); // OK
console.log(deepEqual(obj1, obj2)); // Error: a
console.log(deepEqual(obj1, obj3)); // OK
