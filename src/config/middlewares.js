import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import freeze from 'redux-freeze';

//Param the middlewares depending of the enviroment
const DEFAULT_ENVIROMENT = 'development';
let enviroment = DEFAULT_ENVIROMENT;
if (process && process.env && process.env.NODE_ENV) {
    enviroment = process.env.NODE_ENV;
}

/*
 * Middleware with:
 * - Redux DevTools
 * - Redux Logger
 * - Redux Thunk
 ***/
const getMiddlewaresThunkFreezeLoggerReactDevTools = () => {
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
        compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk, freeze, createLogger())
    );
    return enhancer;
};

/*
 * Middleware with:
 * - Redux Thunk
 ***/
const getMiddlewaresThunk = () => {
    return applyMiddleware(thunk);
};

/*
 * Returns the collection of middlewares
 ***/
const getMiddlewares = () => {
    switch (enviroment) {
        case 'development':
            return getMiddlewaresThunkFreezeLoggerReactDevTools();
        default:
            return getMiddlewaresThunk();
    }
};

export default getMiddlewares;