import yaml from 'js-yaml';

const parser = (data, type) => {
  if (type === 'json') {
    return JSON.parse(data);
  }
  if (type === 'yaml' || type === 'yml') {
    return yaml.load(data);
  }
  return {};
};

export default parser;
