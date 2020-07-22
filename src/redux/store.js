import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';

import reducer from './reducers';

export default createStore(
    reducer,
    // composeWithDevTools(
        applyMiddleware(thunk)
    // )
)
