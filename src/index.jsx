import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { legacy_createStore as createStore } from 'redux';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

class MikeFlixApplication extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<MainView />
			</Provider>
		);
	}
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MikeFlixApplication), container);
