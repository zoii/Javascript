const unique1 = (array = []) => {
  const results = [];
  const hitArray = {};
  array.forEach((item, index) => {
    const key = `${typeof item}${item}`; 
    if (!hitArray[key]) {
      results.push(item);
      hitArray[key] = !0;
    }
  });
  return results;
};

const unique2 = (array = []) => {
  array.sort();
  const results = [array[0]];
  array.forEach((item) => {
    const nextIndex = results.length - 1;
    if (item !== results[nextIndex]) {
      results.push(item);
    }
  });
  return results;
};


const unique3 = (array = []) => {
  return Array.from(new Set(array));
};

const unique4 = (array = []) => {
  return array.filter((item, idx) => idx <= array.indexOf(item))
};

const test = unique2([9, 111, 9, 2, 33, '你好', '你好', 1, '1', 2, '2', '33', 3, 33, 7]);
console.log(test);