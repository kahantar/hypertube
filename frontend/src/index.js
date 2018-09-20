import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import createAppStore from './store';
import { PersistGate } from 'redux-persist/es/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';

const { persistor, store } = createAppStore()

ReactDOM.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><BrowserRouter><Routes/></BrowserRouter></PersistGate></Provider>, document.getElementById('root'));
