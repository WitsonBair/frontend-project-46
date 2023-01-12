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

const stylish = (tree, depth = 1) => {
  const space = makeSpace(depth);
  const preSpace = `${space}  `;

  const result = tree.map((node) => {
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
        return `${preSpace}  ${node.name}: {${stylish(node.children, depth + 1)}${makeSpace(depth + 1)}}`;
      default:
        return stylish(node.value);
    }
  });

  return `\n${result.flatMap((str) => str).join('\n')}\n`;
};

export default (tree) => {
  const step1 = stylish(tree).split('');
  step1[0] = '';
  step1[1] = '';
  step1[step1.length - 1] = '';
  step1[step1.length - 2] = '';

  const step2 = step1.join('').split('');
  step2[0] = '{\n';
  step2[step2.length - 1] = '\n}';

  return step2.join('');
};
