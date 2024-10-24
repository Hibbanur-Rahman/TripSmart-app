import React from 'react';
import { Provider } from 'react-redux';
import App from './App'; // Your current App component
import store from './src/redux/store';

function RootApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default RootApp;