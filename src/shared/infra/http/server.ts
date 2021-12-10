import express from 'express';

const app = express();

const APP_PORT = 3333;

app.use(express.json());

app.get('/', (request, response) => {
  return response.json({ ok: true });
});

app.listen(
  APP_PORT,
  () => -console.log(`Server started on port:${APP_PORT} 🚀`)
);
