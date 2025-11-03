import '@/css/index.css';
import { RootRouter } from './router/RootRouter';
// import { RootRouter } from '@/router/RootRouter';
// import { useSocketIoClient } from '@/hooks/useSocketIoClient';
// import { useSession } from './hooks/useSession';

function App() {
  // useSession();

  // useSocketIoClient();

  return <RootRouter />;
}

export default App;
