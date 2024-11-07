import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './components/cart/store';
import { Provider } from 'react-redux';
import App from './App';
import LoadingComponent from './components/LoadingComponent'; // Adjusted import path

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingComponent />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
  