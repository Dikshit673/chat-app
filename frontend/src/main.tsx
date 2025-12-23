import { createRoot } from 'react-dom/client';
import '@/index.css';
import '@/styles/globals.css';
import App from './App.tsx';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

const element = document.getElementById('root');
if (!element) throw new Error('No root element found');

createRoot(element).render(
  <Provider store={store}>
    <App />
    <Toaster position='bottom-right' />
  </Provider>
);
