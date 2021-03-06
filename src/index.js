import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './store/store'
import initReactFastclick from 'react-fastclick';
initReactFastclick();
render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));
