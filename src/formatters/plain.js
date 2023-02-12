import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (node, keyName = '') => {
  const mapNode = (node, keyName) => node
    .filter((el) => el.type != 'same')
    .flatMap((el) => plain(el, keyName)).join('\n');

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
    case 'root':
      return mapNode(node.value);
    default:
      throw new Error("Wrong type!");
  }
};

export default plain;
