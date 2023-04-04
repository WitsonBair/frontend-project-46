import yaml from 'js-yaml';

const parser = (file, extansion) => {
  if (extansion === '.json') {
    return JSON.parse(file);
  }
  if (extansion === '.yaml' || extansion === '.yml') {
    return yaml.load(file);
  }
  return {};
};

export default parser;
