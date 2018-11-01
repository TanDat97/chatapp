import React from 'react';
import ReactDOM from 'react-dom';
import {reactReduxFirebase} from 'react-redux-firebase'
import thunk from 'redux-thunk';
import myReducer from "./reducers/index";
import { Provider } from "react-redux";
import { createStore,compose, applyMiddleware } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import getMiddlewares from './config/middlewares';
import firebaseConfig from './config/firebaseConfig';

import './index.css';
import App from './components/App';

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

