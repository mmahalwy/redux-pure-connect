import ensureShallowPurityConnect from '../src/ensureShallowPurityConnect';
import ensureShallowPurity from '../src/ensureShallowPurity';

describe('ensureShallowPurityConnect', () => {
  test('should return an array of null when no arguments passed', () => {
    expect(ensureShallowPurityConnect()).toEqual([null, null, null, null]);
  });

  test('should ensure wrapped function for mapStateToProps', () => {
    const object = {};
    const mapStateToProps = () => ({
      object,
    });

    expect(ensureShallowPurityConnect(mapStateToProps)[0]).toBeInstanceOf(
      Function
    );
    expect(ensureShallowPurityConnect(mapStateToProps)[0].name).toEqual(
      'wrappedFunction'
    );
  });

  test('should ensure wrapped function for mapDispatchToProps', () => {
    const fn = () => {};
    const mapDispatchToProps = () => ({
      fn,
    });

    expect(
      ensureShallowPurityConnect(null, mapDispatchToProps)[1]
    ).toBeInstanceOf(Function);
    expect(
      ensureShallowPurityConnect(null, mapDispatchToProps)[1].name
    ).toEqual('wrappedFunction');
  });

  test('should ensure wrapped function for mergeProps', () => {
    const object = {};
    const mergeProps = () => ({
      object,
    });

    expect(
      ensureShallowPurityConnect(null, null, mergeProps)[2]
    ).toBeInstanceOf(Function);
    expect(ensureShallowPurityConnect(null, null, mergeProps)[2].name).toEqual(
      'wrappedFunction'
    );
  });

  test('should pass options without any checks', () => {
    const options = {};

    expect(ensureShallowPurityConnect(null, null, null, options)[3]).toEqual(
      options
    );
  });

  test('should be the arguments for a method', () => {
    let arg1;
    let arg2;
    let arg3;
    let arg4;
    const object = {};
    const fn = () => {};
    const testMapStateToProps = () => ({
      object,
    });
    const testMapDispatchToProps = () => ({
      fn,
    });
    const testMergeProps = () => ({
      object,
    });
    const testOptions = {};

    const connectMethod = (
      mapStateToProps,
      mapDispatchToProps,
      mergeProps,
      options
    ) => {
      arg1 = mapStateToProps;
      arg2 = mapDispatchToProps;
      arg3 = mergeProps;
      arg4 = options;
    };

    connectMethod(
      ...ensureShallowPurityConnect(
        testMapStateToProps,
        testMapDispatchToProps,
        testMergeProps,
        testOptions
      )
    );

    expect(arg1.name).toEqual('wrappedFunction');
    expect(arg2.name).toEqual('wrappedFunction');
    expect(arg3.name).toEqual('wrappedFunction');
    expect(arg4).toEqual(testOptions);
  });
});
