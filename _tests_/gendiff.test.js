import genDiff from '../index.js';

const expected = `
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
`;

const expected2 = `
      common: {
        + follow: false
          setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
        + setting5: {
              key5: value5
          }
          setting6: {
              doge: {
                - wow: 
                + wow: so much
              }
              key: value
            + ops: vops
          }
      }
      group1: {
        - baz: bas
        + baz: bars
          foo: bar
        - nest: {
              key: value
          }
        + nest: str
      }
    - group2: {
          abc: 12345
          deep: {
              id: 45
          }
      }
    + group3: {
          deep: {
              id: {
                  number: 45
              }
          }
          fee: 100500
      }
`;

const expected3 = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const expected4 = `[
  {
    "name": "common",
    "type": "object",
    "children": [
      {
        "name": "follow",
        "type": "plus",
        "value": false
      },
      {
        "name": "setting1",
        "type": "same",
        "value": "Value 1"
      },
      {
        "name": "setting2",
        "type": "minus",
        "value": 200
      },
      {
        "name": "setting3",
        "type": "different",
        "valueMinus": true,
        "valuePlus": null
      },
      {
        "name": "setting4",
        "type": "plus",
        "value": "blah blah"
      },
      {
        "name": "setting5",
        "type": "plus",
        "value": {
          "key5": "value5"
        }
      },
      {
        "name": "setting6",
        "type": "object",
        "children": [
          {
            "name": "doge",
            "type": "object",
            "children": [
              {
                "name": "wow",
                "type": "different",
                "valueMinus": "",
                "valuePlus": "so much"
              }
            ]
          },
          {
            "name": "key",
            "type": "same",
            "value": "value"
          },
          {
            "name": "ops",
            "type": "plus",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "name": "group1",
    "type": "object",
    "children": [
      {
        "name": "baz",
        "type": "different",
        "valueMinus": "bas",
        "valuePlus": "bars"
      },
      {
        "name": "foo",
        "type": "same",
        "value": "bar"
      },
      {
        "name": "nest",
        "type": "different",
        "valueMinus": {
          "key": "value"
        },
        "valuePlus": "str"
      }
    ]
  },
  {
    "name": "group2",
    "type": "minus",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "name": "group3",
    "type": "plus",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]`;

test('general differencies', () => {
  const flat = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  const nestedJson = genDiff('__fixtures__/file3.json', '__fixtures__/file4.json');
  const nestedYaml = genDiff('__fixtures__/file3.yml', '__fixtures__/file4.yml');
  const plain = genDiff('__fixtures__/file3.yml', '__fixtures__/file4.yml', 'plain');
  const json = genDiff('__fixtures__/file3.yml', '__fixtures__/file4.yml', 'json');
  expect(flat).toEqual(expected);
  expect(nestedJson).toEqual(expected2);
  expect(nestedYaml).toEqual(expected2);
  expect(plain).toEqual(expected3);
  expect(json).toEqual(expected4);
});
