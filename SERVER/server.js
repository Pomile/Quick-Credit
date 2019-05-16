import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import debug from 'debug';
import env from 'dotenv';
import routes from './src/route/route';
import endpoints from './enpointsList';

const app = express();
debug.log(`ENV: ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

env.config();

app.use(bodyParser.urlencoded({ extended: false, type: '*/x-www-form-urlencoded' }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.raw({ type: '*/octet-stream' }));

app.get('/', (req, res) => {
  res.status(200)
    .send(`
    <div>
    <h1>Welcome...</h1>
    <h4>Server is running on https://${req.hostname}/</h4>
    <h4>Endpoints</h4>
    <p>${endpoints}</p>
    </div>
    `)
    .end();
});
app.use('/api/v1', routes);

export default app;
