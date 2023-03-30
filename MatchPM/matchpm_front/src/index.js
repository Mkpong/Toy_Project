import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { createStoreHook, Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './Reducers';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig , rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

root.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
