import genDiff from '../index.js';
import { flat } from './__fixtures__/answers/flat.js';
import { nested } from './__fixtures__/answers/nested.js';

test.each([
  {file1: '__tests__/__fixtures__/file1.json', file2: '__tests__/__fixtures__/file2.json', answer: flat},
  {file1: '__tests__/__fixtures__/file3.json', file2: '__tests__/__fixtures__/file4.json', answer: nested},
])('gendiff($file1, $file2)', ({file1, file2, answer}) => {
  expect(genDiff(file1, file2)).toEqual(answer);
});
