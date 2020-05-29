import React from 'react';
import { Provider } from 'react-redux';
import store from "./src/redux/store.js";
import Index from './src';

export default function () {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}