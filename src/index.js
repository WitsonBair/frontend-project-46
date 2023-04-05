import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import makeTree from './makeTree.js';
import chooseFormat from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const file2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');

  const type1 = path.extname(filepath1).substring(1);
  const type2 = path.extname(filepath2).substring(1);

  const data1 = parser(file1, type1);
  const data2 = parser(file2, type2);

  const tree = makeTree(data1, data2);

  const result = chooseFormat(tree, formatName);

  return result;
};

export default genDiff;
