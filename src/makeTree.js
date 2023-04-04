import _ from 'lodash';

const makeTree = (data1, data2) => {
  const keys = Object.keys(data1).concat(Object.keys(data2));
  const united = _.sortBy([...new Set(keys)]);
  return united.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return {
        name: key,
        type: 'plus',
        value: data2[key],
      };
    }
    if (!Object.hasOwn(data2, key)) {
      return {
        name: key,
        type: 'minus',
        value: data1[key],
      };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        name: key,
        type: 'object',
        children: makeTree(data1[key], data2[key]),
      };
    }

    if (data1[key] !== data2[key]) {
      return {
        name: key,
        type: 'different',
        valueMinus: data1[key],
        valuePlus: data2[key],
      };
    }

    return {
      name: key,
      type: 'same',
      value: data1[key],
    };
  });
};

export default (data1, data2) => ({ type: 'root', value: makeTree(data1, data2) });
