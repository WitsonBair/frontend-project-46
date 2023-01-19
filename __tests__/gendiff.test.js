import genDiff from '../src/index.js';
import flat from '../answers/flat.js';
import nested from '../answers/nested.js';
import plain from '../answers/plain.js';
import json from '../answers/json.js';

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
