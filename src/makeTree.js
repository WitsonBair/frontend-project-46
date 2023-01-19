import _ from 'lodash';

const makeTree = (obj1, obj2) => {
  const keys = Object.keys(obj1).concat(Object.keys(obj2));
  const united = _.sortBy([...new Set(keys)]);
  return united.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return {
        name: key,
        type: 'plus',
        value: obj2[key],
      };
    }
    if (!Object.hasOwn(obj2, key)) {
      return {
        name: key,
        type: 'minus',
        value: obj1[key],
      };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        name: key,
        type: 'object',
        children: makeTree(obj1[key], obj2[key]),
      };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        name: key,
        type: 'different',
        valueMinus: obj1[key],
        valuePlus: obj2[key],
      };
    }

    return {
      name: key,
      type: 'same',
      value: obj1[key],
    };
  });
};

export default (obj1, obj2) => ({ type: 'root', value: makeTree(obj1, obj2) });
