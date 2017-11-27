const chunk = (array = [], size = 0) => {
  const count = Math.max(size, 0);
  const length = array.length;
  // const results = Array(Math.ceil(length / count));
  const results = [];
  let index = 0;
  let resIndex = 0;
  while (index < length) {
    results.push(Array.prototype.slice.call(array, index, (index += count)))
    // results[resIndex++] = Array.prototype.slice.call(array, index, (index += count));
  }

  return results;
}

const shuffle = (arr) => arr.sort(() => Math.round(Math.random()));


const split = (arr) => {
  if (!arr) {
    return []
  };
  const array = shuffle(arr);
  
  const length = array.length;
  const groupLength = 5;
  const count = Math.floor(length / groupLength);
  const results = [];
  for (let index = 0; index < groupLength; index++) {
    results.push([]);
  }

  let output = results.map((item) => {
    item = array.splice(0, count);
    return item;
  });

  if (array.length) {
    output.map((item) => {
      item = item.concat(array.splice(0, 1));
      return item;
    });
  }
  output = shuffle(output);
  return output;

}

const test = split(['法国', '澳大利亚', '智利', '新西兰', '西班牙', '加拿大', '阿根廷', '美国', '0', '国产', '波多黎各', '英国', '比利时', '德国', '意大利', '意大利'], 2);
console.log(test);
