import { connect as reactReduxConnect } from 'react-redux';

import ensureShallowPurityConnect from './ensureShallowPurityConnect';

const connect = (...args) => {
  return reactReduxConnect(...ensureShallowPurityConnect(...args));
};

export default connect;
