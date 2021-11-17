import express from 'express';

const app = express();

const APP_PORT = 3335;

app.get('/', (request, response) => {
  return response.send('ok');
});

app.listen(APP_PORT, () => console.log(`Server started on port:${APP_PORT}🚀`));
