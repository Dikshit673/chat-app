import httpServer from './lib/httpServer.js';
import { EnvVars } from './utils/EnvVarConfig.js';

const { PORT } = EnvVars;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
