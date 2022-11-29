import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const file2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  const file1Entries = Object.entries(obj1);
  const file2Entries = Object.entries(obj2);

  const result = {};

  for (const [key, value] of file1Entries) {
    if (!obj2.hasOwnProperty(key)) {
      result[`- ${key}`] = value;
    } else if (obj1[key] === obj2[key]) {
      result[`  ${key}`] = value;
    } else {
      result[`- ${key}`] = value;
    }
  }

  for (const [key, value] of file2Entries) {
    if (!obj1.hasOwnProperty(key)) {
      result[`+ ${key}`] = value;
    } else if (obj1[key] === obj2[key]) {
      result[`  ${key}`] = value;
    } else {
      result[`+ ${key}`] = value;
    }
  }

  _.sortBy(result);

  return result;
};

export default genDiff;
