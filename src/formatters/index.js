import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormat = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error('Wrong format name');
  }
};

export default chooseFormat;
