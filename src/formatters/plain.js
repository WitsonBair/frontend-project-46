import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (tree, keyName = '') => {
  const result = tree.map((node) => {
    const property = keyName + node.name;

    switch (node.type) {
      case 'plus':
        return `Property '${property}' was added with value: ${stringify(node.value)}`;
      case 'minus':
        return `Property '${property}' was removed`;
      case 'object':
        return `${plain(node.children, `${property}.`)}`;
      case 'same':
        return [];
      case 'different':
        return `Property '${property}' was updated. From ${stringify(node.valueMinus)} to ${stringify(node.valuePlus)}`;
      default:
        return plain(node.value);
    }
  });
  return result.flatMap((str) => str).join('\n');
};

export default plain;
