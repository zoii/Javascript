const flatten1 = (array) => {
  while (array.some(item => Array.isArray(item))) {
    array = [].concat(...array);
  }
  return array;
}

const flatten2 = (array) => {
  let result = [];
  array.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flatten2(item));
    } else {
      result = result.concat(item);
    }
  });
  return result;
};

const flatten3 = (array) => {
  return array.reduce((prev, current, index) => {
    return prev.concat(Array.isArray(current) ? flatten3(current) : current);
  }, []);
};


const test = flatten3([1, 2, [3, [4], [8, [9]]], 5]);
console.log(`原数组：[1, 2, [3, [4], [8, [9]]], 5]`)
console.log(test);