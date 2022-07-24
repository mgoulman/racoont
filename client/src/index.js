import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './reducers'


const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
)


const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
        </Provider>
    </BrowserRouter>
);

 