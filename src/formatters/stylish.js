const makeSpace = (depth) => ' '.repeat((depth * 4) - 4);

const stringify = (obj, depth, stylishFn) => {
  const space = makeSpace(depth + 1);

  if (obj instanceof Object) {
    const objectsToString = Object.entries(obj)
      .map(([key, value]) => stylishFn({ type: 'same', value, name: key }, depth + 1));
    return `{\n${objectsToString.join('\n')}\n${space}}`;
  }
  return obj;
};

const stylish = (node, depth = 1) => {
  const space = makeSpace(depth);
  const preSpace = `${space}  `;

  switch (node.type) {
    case 'plus':
      return `${preSpace}+ ${node.name}: ${stringify(node.value, depth, stylish)}`;
    case 'minus':
      return `${preSpace}- ${node.name}: ${stringify(node.value, depth, stylish)}`;
    case 'same':
      return `${preSpace}  ${node.name}: ${stringify(node.value, depth, stylish)}`;
    case 'different':
      return [`${preSpace}- ${node.name}: ${stringify(node.valueMinus, depth, stylish)}`,
        `${preSpace}+ ${node.name}: ${stringify(node.valuePlus, depth, stylish)}`];
    case 'object':
      return `${preSpace}  ${node.name}: {\n${node.children
        .map((el) => stylish(el, depth + 1))
        .flatMap((str) => str)
        .join('\n')}\n${makeSpace(depth + 1)}}`;
    case 'root':
      return `{\n${node.value.map((el) => stylish(el, depth)).flatMap((str) => str).join('\n')}\n}`;
    default:
      throw new Error('Wrong type');
  }
};

export default stylish;
