import genDiff from '../src/index.js';
import fs from 'fs';
import path from 'path';

const flat = fs.readFileSync(path.resolve(process.cwd(), '../frontend-project-46/__tests__/__fixtures__/answers/flat.txt'), 'utf-8');
const nested = fs.readFileSync(path.resolve(process.cwd(), '../frontend-project-46/__tests__/__fixtures__/answers/nested.txt'), 'utf-8');
const plain = fs.readFileSync(path.resolve(process.cwd(), '../frontend-project-46/__tests__/__fixtures__/answers/plain.txt'), 'utf-8');
const json = fs.readFileSync(path.resolve(process.cwd(), '../frontend-project-46/__tests__/__fixtures__/answers/json.txt'), 'utf-8');

describe('Find differencies', () => {
  test.each([
    {
      file1: '__tests__/__fixtures__/file1.json', file2: '__tests__/__fixtures__/file2.json', answer: flat, type: 'stylish',
    },
    {
      file1: '__tests__/__fixtures__/file3.json', file2: '__tests__/__fixtures__/file4.json', answer: nested, type: 'stylish',
    },
    {
      file1: '__tests__/__fixtures__/file3.yml', file2: '__tests__/__fixtures__/file4.yml', answer: nested, type: 'stylish',
    },
    {
      file1: '__tests__/__fixtures__/file3.yml', file2: '__tests__/__fixtures__/file4.yml', answer: plain, type: 'plain',
    },
    {
      file1: '__tests__/__fixtures__/file3.yml', file2: '__tests__/__fixtures__/file4.yml', answer: json, type: 'json',
    },
  ])('gendiff(type, $file1, $file2)', ({
    type, file1, file2, answer,
  }) => {
    expect(genDiff(file1, file2, type)).toEqual(answer);
  });
});
