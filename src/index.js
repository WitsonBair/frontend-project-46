import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import makeTree from './makeTree.js';
import chooseFormat from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const file2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');

  const obj1 = parser(file1, path.extname(filepath1));
  const obj2 = parser(file2, path.extname(filepath2));

  const tree = makeTree(obj1, obj2);

  const result = chooseFormat(tree, formatName);

  return result;
};

export default genDiff;
