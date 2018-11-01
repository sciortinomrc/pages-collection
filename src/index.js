import React from 'react';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware ,combineReducers} from 'redux';
// import {createLogger} from 'redux-logger';
import {
	onLogin, fbApiCall, onWindowResize, 
	onPageChange, addNewPage,
	displaySingleCard, addFilter,
	signUp
} from './State/reducer.js';
import thunkMiddleware from 'redux-thunk';
import ReactDOM from 'react-dom';
import './index.css';
import ErrorBoundary from './Components/ErrorBoundary';
import App from './Containers/App';
import registerServiceWorker from './registerServiceWorker';

// const logger=createLogger();
const rootReducer=combineReducers({
	onLogin, fbApiCall, onWindowResize, onPageChange, addNewPage,
	displaySingleCard, addFilter, signUp})
const store=createStore(rootReducer,applyMiddleware(thunkMiddleware)); /*logger*/

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
