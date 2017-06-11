module.exports = typeName => {

  switch (typeName) {

  case 'int32':
    return value => value >> 0;

  case 'string':
    return value => value.toString();

  case 'double':
    return value => parseFloat(value);

  case 'array of mixed types':
    return value => Array.isArray(value) ? value : [value];
  }

  return value => value;
};
