const hasOwnProperty = Object.prototype.hasOwnProperty;

export const shallowDifferences = (a, b) => {
  const result = [];
  if (a === b) {
    return result;
  }

  for (const key in a) {
    if (hasOwnProperty.call(a, key) && a[key] !== b[key]) {
      result.push(key);
    }
  }

  for (const key in b) {
    if (hasOwnProperty.call(b, key) && !hasOwnProperty.call(a, key)) {
      result.push(key);
    }
  }

  return result;
};

const compareAndLogIfDifferent = (a, b) => {
  const keys = shallowDifferences(a, b);

  if (keys.length > 0) {
    console.group('%cFunction expected to be pure was not!', 'color: red;');
    console.log(
      `{key}, {first result}, {second result}\n${keys.map(
        key => `${key}, ${JSON.stringify(a[key])}, ${JSON.stringify(b[key])}\n`
      )}`
    );
    console.groupEnd();
  }
};

export default fn => {
  return function wrappedFunction() {
    // eslint-disable-next-line prefer-rest-params
    const result = fn.apply(this, arguments);
    // eslint-disable-next-line prefer-rest-params
    const testResult = fn.apply(this, arguments);
    compareAndLogIfDifferent(result, testResult);
    return result;
  };
};
