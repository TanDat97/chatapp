import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

import App from './components/App';
import myReducer from "./reducers/index";
import firebaseConfig from './config/firebaseConfig';
// import getMiddlewares from './config/middlewares';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(myReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reactReduxFirebase(firebaseConfig), // redux binding for firebase
        reduxFirestore(firebaseConfig) // redux bindings for firestore
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

