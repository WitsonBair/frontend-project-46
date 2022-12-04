import genDiff from '../index.js';

const expected = {
  '- follow': false,
  '  host': 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true
};

test('general differencies', () => {
  const actual = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(actual).toEqual(expected);
});
