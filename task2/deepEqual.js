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

const deepEqual = (a, b) => {
  if (a === b) {
    return 'OK';
  }

  if (
    a === null ||
    b === null ||
    typeof a !== 'object' ||
    typeof b !== 'object'
  ) {
    return false;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (let i = 0; i < aKeys.length; i += 1) {
    const key = aKeys[i];

    if (
      !b.hasOwnProperty(key) ||
      !deepEqual(a[key], b[key])
    ) {
      return false;
    }
  }

  return 'OK';
};

console.log(deepEqual(obj1, obj1)); 
// OK
console.log(deepEqual(obj1, obj2)); 
// false
console.log(deepEqual(obj1, obj3)); 
// OK
