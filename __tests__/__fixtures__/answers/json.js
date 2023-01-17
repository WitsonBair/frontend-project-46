const expected4 = `[
  {
    "type": "root",
    "value": [
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
    ]
  }
]`;

export default expected4;
