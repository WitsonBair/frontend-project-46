import stylish from './stylish.js';

const chooseFormat = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error('Wrong format name');
  }
};

export default chooseFormat;
