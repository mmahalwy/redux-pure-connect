import ensureShallowPurity from './ensureShallowPurity';

export default (mapStateToProps, mapDispatchToProps, mergeProps, options) => {
  return [
    mapStateToProps ? ensureShallowPurity(mapStateToProps) : null,
    mapDispatchToProps && typeof mapDispatchToProps === 'function'
      ? ensureShallowPurity(mapDispatchToProps)
      : null,
    mergeProps ? ensureShallowPurity(mergeProps) : null,
    options || null,
  ];
};
