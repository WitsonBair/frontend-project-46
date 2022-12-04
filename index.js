import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseFile from './src/parsers.js';

const sortKeys = (obj) => {
  const keys = Object.keys(obj);
  const sorted = keys.sort((a, b) => {
    if (a[2] < b[2]) {
      return -1;
    }
    if (a[2] > b[2]) {
      return 1;
    }
    return 0;
  });
  return sorted;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const file2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');

  const obj1 = parseFile(file1, path.extname(filepath1));
  const obj2 = parseFile(file2, path.extname(filepath2));

  const file1Entries = Object.entries(obj1);
  const file2Entries = Object.entries(obj2);

  /* eslint-disable no-param-reassign */
  const arr1 = file1Entries.reduce((result, [key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      result[`- ${key}`] = value;
    } else if (obj1[key] === obj2[key]) {
      result[`  ${key}`] = value;
    } else {
      result[`- ${key}`] = value;
    }
    return result;
  }, {});

  const arr2 = file2Entries.reduce((result, [key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
      result[`+ ${key}`] = value;
    } else if (obj1[key] === obj2[key]) {
      result[`  ${key}`] = value;
    } else {
      result[`+ ${key}`] = value;
    }
    return result;
  }, {});
  /* eslint-enable no-param-reassign */

  const merged = { ...arr1, ...arr2 };

  const sortedKeys = sortKeys(merged);
  
  const result = sortedKeys.reduce((accu, key) => {
    const answer = {};
    answer[key] = merged[key];
    accu = {...accu, ...answer};
    return accu;
  }, {})
  

  return result;
};

export default genDiff;
