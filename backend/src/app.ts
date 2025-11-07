import express from 'express';
import cors from 'cors';

import { router as healthRouter } from './routes/health.routes';
import { clubesRouter } from './routes/clubes.routes';
import { competicoesRouter } from './routes/competicoes.routes';
import { temporadasRouter } from './routes/temporada.routes';
import { rodadasRouter } from './routes/rodadas.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', healthRouter);
app.use('/clubes', clubesRouter);
app.use('/competicoes', competicoesRouter);
app.use('/temporadas', temporadasRouter);
app.use('/rodadas', rodadasRouter);

app.get('/', (_req, res) => {
  res.json({ name: 'fut_brazuca', status: 'api_v1_ready' });
});

export { app };
