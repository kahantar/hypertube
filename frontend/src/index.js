import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/indexReducers';
import thunk from 'redux-thunk';
import App from './components/register/register';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}><App /></Provider>, document.getElementById('root'));