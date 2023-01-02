import _ from 'lodash';

const stylish = (tree) => {
  const space = ' ';
  const spaceSize = 4;

  const iter = (node, depth) => {
    const indent = depth * spaceSize;
    const closeIndent = depth * spaceSize - 2;
    const currentIndent = space.repeat(indent);
    const currentCloseIndent = space.repeat(closeIndent);
    const bracketIndent = space.repeat(indent - spaceSize);
    const iterIfObject = (value) => {
      if (_.isObject(value)) {
        return iter([value], depth + 1);
      }
      return value;
    };

    const result = node.map((obj) => {
      const value = `${obj.name}: ${iterIfObject(obj.value)}`;
      switch (obj.type) {
        case 'plus':
          return `${currentCloseIndent}+ ${value}`;
        case 'minus':
          return `${currentCloseIndent}- ${value}`;
        case 'object':
          return `${currentIndent}${obj.name}: ${iter(obj.children, depth + 1)}`;
        case 'same':
          return `${currentIndent}${value}`;
        case 'different': {
          const valueBefore = `${currentCloseIndent}- ${obj.name}: ${iterIfObject(obj.valueMinus)}`;
          const valueAfter = `${currentCloseIndent}+ ${obj.name}: ${iterIfObject(obj.valuePlus)}`;
          return `${valueBefore}\n${valueAfter}`;
        }
        default:
          console.log('Wrong type');
      }
      const keys = Object.keys(obj);
      const nestedObj = keys.map((key) => `${currentIndent}${key}: ${iterIfObject(obj[key])}`);

      return nestedObj.join('\n');
    });

    return [
      '{',
      ...result,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};

export default stylish;
