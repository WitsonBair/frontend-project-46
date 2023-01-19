const makeSpace = (depth) => ' '.repeat((depth * 4) - 4);

const stringify = (obj, depth) => {
  const space = makeSpace(depth + 1);
  const preSpace = `${space}    `;

  if (obj instanceof Object) {
    const objectsToString = Object.entries(obj)
      .map(([key, value]) => `${preSpace}${key}: ${stringify(value, depth + 1)}`);
    return `{\n${objectsToString.join('\n')}\n${space}}`;
  }
  return obj;
};

/* eslint-disable no-use-before-define */
const mapNode = (node, depth) => {
  const result = node.map((el) => stylish(el, depth));
  return `\n${result.flatMap((str) => str).join('\n')}\n`;
};
/* eslint-enable no-use-before-define */

const stylish = (node, depth = 1) => {
  const space = makeSpace(depth);
  const preSpace = `${space}  `;

  switch (node.type) {
    case 'plus':
      return `${preSpace}+ ${node.name}: ${stringify(node.value, depth)}`;
    case 'minus':
      return `${preSpace}- ${node.name}: ${stringify(node.value, depth)}`;
    case 'same':
      return `${preSpace}  ${node.name}: ${stringify(node.value, depth)}`;
    case 'different':
      return [`${preSpace}- ${node.name}: ${stringify(node.valueMinus, depth)}`,
        `${preSpace}+ ${node.name}: ${stringify(node.valuePlus, depth)}`];
    case 'object':
      return `${preSpace}  ${node.name}: {${mapNode(node.children, depth + 1)}${makeSpace(depth + 1)}}`;
    default:
      return `{\n${mapNode(node.value).slice(1, -1)}\n}`;
  }
};

export default stylish;
