import { app } from './app';
import { env } from './config/env';

const port = env.PORT;

app.listen(port, () => {
  console.log(`fut_brazuca API v1 running on http://localhost:${port}`);
});
