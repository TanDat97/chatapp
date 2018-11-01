import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import {reactReduxFirebase} from 'react-redux-firebase'
import thunk from 'redux-thunk';

import myReducer from "./reducers/index";
import { Provider } from "react-redux";
import { createStore,compose, applyMiddleware } from 'redux';
import getMiddlewares from './config/middlewares';
import firebaseConfig from './config/firebaseConfig'

const store = createStore(myReducer,
                            compose( applyMiddleware(thunk),
                            reactReduxFirebase(firebaseConfig, {attachAuthIsReady:true})
                            )
    );

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

