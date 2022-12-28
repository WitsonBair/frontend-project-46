import fs from 'fs';
import path from 'path';
import parseFile from './src/parsers.js';
import makeTree from './src/makeTree.js';
import chooseFormat from './src/formatters/chooseFormat.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const file2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');

  const obj1 = parseFile(file1, path.extname(filepath1));
  const obj2 = parseFile(file2, path.extname(filepath2));

  const tree = makeTree(obj1, obj2);

  const result = chooseFormat(tree, format);

  return result;
};

export default genDiff;
