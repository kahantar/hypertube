import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/indexReducers';
import thunk from 'redux-thunk';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

// import App from './components/register/register'


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}><BrowserRouter><Routes/></BrowserRouter></Provider>, document.getElementById('root'));