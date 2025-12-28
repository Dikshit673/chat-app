import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import App from './App.tsx';
import { store } from './app/store.ts';

import '@/index.css';
import '@/styles/globals.css';

const element = document.getElementById('root');
if (!element) throw new Error('No root element found');

createRoot(element).render(
  <Provider store={store}>
    <App />
    <Toaster position='bottom-right' />
  </Provider>
);
