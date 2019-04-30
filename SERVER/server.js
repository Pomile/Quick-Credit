import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

app.use(bodyParser.urlencoded({ extended: false, type: '*/x-www-form-urlencoded' }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.raw({ type: '*/octet-stream' }));

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    app.listen(port, async () => {
      console.log(`Server is listening on http://localhost:${port}/`);
    });
}