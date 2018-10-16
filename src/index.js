import React from 'react';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware ,combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import {
	onLogin, fbApiCall, 
	fbLogin, onWindowResize, 
	onPageChange, addNewPage,
	displaySingleCard
} from './State/reducer.js';
import thunkMiddleware from 'redux-thunk';
import ReactDOM from 'react-dom';
import './index.css';
import WindowFB from './Containers/WindowFB';
import registerServiceWorker from './registerServiceWorker';

const logger=createLogger();
const rootReducer=combineReducers({
	onLogin, fbApiCall, fbLogin, 
	onWindowResize, onPageChange, addNewPage,
	displaySingleCard})
const store=createStore(rootReducer,applyMiddleware(thunkMiddleware, logger));


ReactDOM.render(
	<Provider store={store}>
		<WindowFB />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
