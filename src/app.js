import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, {history} from './routers/AppRouter'
import configureStore from './store/configureStore';
import LoadingPage from './components/LoadingPage';
import { startSetMemories } from './actions/memories';

import 'normalize.css/normalize.css'; // reset all browser conventions
import './styles/styles.scss';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

store.dispatch(startSetMemories()).then(() => {
    renderApp();
});