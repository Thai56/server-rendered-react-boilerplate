import express from 'express';
import webpack from 'webpack';
// import yields from 'express-yields';
import fs from 'fs-extra';

const port = process.env.PORT || 3000;

const app = express();

if (process.env.NODE_ENV === 'development') {
  const config = require('../webpack.config.dev.babel').default;
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.get(['/'], async function (req, res) {
  let index = await fs.readFile('./public/index.html', 'utf-8');
  res.send(index);
})

app.listen(port, '0.0.0.0', () => console.info(`Now listening on port ${port}`));
