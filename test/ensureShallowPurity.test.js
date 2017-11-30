import ensureShallowPurity, {
  shallowDifferences,
} from '../src/ensureShallowPurity';

describe('ensureShallowPurity', () => {
  describe('shallowDifferences', () => {
    test('should return keys of impure keys', () => {
      const a = { object: {} };
      const b = { object: {} };

      expect(shallowDifferences(a, b)).not.toHaveLength(0);
    });

    test('should not return any keys when all are pure', () => {
      const object = {};
      const a = { object };
      const b = { object };

      expect(shallowDifferences(a, b)).toHaveLength(0);
    });
  });

  test('should return a wrapped function', () => {
    const mapStateToProps = () => ({
      object: {},
    });

    const wrapperFunction = ensureShallowPurity(mapStateToProps);

    expect(wrapperFunction).toBeInstanceOf(Function);
  });

  test('should call console.group when impure', () => {
    global.console.group = jest.fn();

    const mapStateToProps = () => ({
      object: {},
    });

    ensureShallowPurity(mapStateToProps)();
    expect(global.console.group).toHaveBeenCalled();
  });

  test('should not call console.group when impure', () => {
    const object = {};
    global.console.group = jest.fn();

    const mapStateToProps = () => ({
      object,
    });

    ensureShallowPurity(mapStateToProps)();
    expect(global.console.group).not.toHaveBeenCalled();
  });
});
