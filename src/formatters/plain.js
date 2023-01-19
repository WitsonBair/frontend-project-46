import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

/* eslint-disable no-use-before-define */
const mapNode = (node, keyName) => node.flatMap((el) => plain(el, keyName)).join('\n');
/* eslint-enable no-use-before-define */

const plain = (node, keyName = '') => {
  const property = keyName + node.name;
  switch (node.type) {
    case 'plus':
      return `Property '${property}' was added with value: ${stringify(node.value)}`;
    case 'minus':
      return `Property '${property}' was removed`;
    case 'object':
      return `${mapNode(node.children, `${property}.`)}`;
    case 'same':
      return [];
    case 'different':
      return `Property '${property}' was updated. From ${stringify(node.valueMinus)} to ${stringify(node.valuePlus)}`;
    default:
      return mapNode(node.value);
  }
};

export default plain;
