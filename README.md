# redux-pure-connect

tldr; Check and log whether react-redux's connect method is passed methods that
create impure props.

Unintended re-rendering with React and Redux is usually caused by developers
creating a `mapStateToProps` that fails shallow equality check. You can read
more about it
[here](https://redux.js.org/docs/faq/ImmutableData.html#how-does-react-redux-use-shallow-equality-checking).
redux-pure-connect is built on top of @lelandrichardson's
[gist](https://gist.github.com/lelandrichardson/ff2392199b62c26759f2bf235676758b)
for ensuring purity on `mapStateToProps` and other methods passed to connect.

### API

#### ensureShallowPurity

Simply wrap your `mapStateToProps` with this helper and it will log when your
props are impure, and what props.

```js
const mapStateToProps = state => ({ users: state.users });
ensureShallowPurity(mapStateToProps);

// or

const mapStateToProps = ensureShallowPurity(state => ({ users: state.users }));
```

And if impure, will log something that looks like this:

```
{key}, {first result}, {second result}
object, {}, {}
```

#### ensureShallowPurityConnect

This is used to wrap all your arguments to connect

```js
import { connect } from 'react-redux';

const mapStateToProps = state => ({ users: state.users });

export default connect(...ensureShallowPurityConnect(mapStateToProps))(
  MyComponent
);
```

#### connect

If you simply don't want to import two libraries everytime:

```js
import { connect } from 'redux-pure-connect';

const mapStateToProps = (state) => ({ users: state.users })

export default connect((mapStateToProps)(MyComponent);
```

### Production

We are removing these logs in production by checking the node env. It will just
pass through the arguments.
