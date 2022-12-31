const makeSpace = (depth) => ' '.repeat(depth * 4 - 2);

const stringify = (obj, depth) => {
  const space = makeSpace(depth + 1);
  const preSpace = `${space}    `;
  
  if (obj instanceof Object) {
    const makeString = Object.entries(obj).map(([key, value]) => `${preSpace}${key}: ${stringify(value, depth + 1)}`);
    return `{\n${makeString.join('\n')}\n${space}}`;
  }
  return obj;
};

const stylish = (tree, depth = 1) => {
  const space = makeSpace(depth);
  const preSpace = `${space}  `;

  const result = tree.map((node) => {
    switch (node.type) {
      case 'plus':
        return `${preSpace}+ ${node.name}: ${stringify(node.value, depth)}`;
      case 'minus':
        return `${preSpace}- ${node.name}: ${stringify(node.value, depth)}`;
      case 'object':
        return `${preSpace}  ${node.name}: {${stylish(node.children, depth + 1)}${makeSpace(depth + 1)}}`;
      case 'same':
        return `${preSpace}  ${node.name}: ${stringify(node.value, depth)}`;
      case 'different':
        return [`${preSpace}- ${node.name}: ${stringify(node.valueMinus, depth)}`,
          `${preSpace}+ ${node.name}: ${stringify(node.valuePlus, depth)}`];
      default:
        throw new Error('Wrong type');
    }
  });

  return `\n${result.flatMap((str) => str).join('\n')}\n`;
};

export default stylish;
