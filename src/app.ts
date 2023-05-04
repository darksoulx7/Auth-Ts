require('dotenv').config();
import express from 'express';
import config from 'config';
import log from './utils/logger';
import connectToDb from './utils/connect-to-db';
import routes from './routes';
import deserializeUser from "./middleware/deserializeUser";

const app = express();

app.use(express.json()) 
app.use(deserializeUser);
app.use(routes)
const port = config.get('port');

app.listen(port, () => {
    log.info(`App started at http://localhost:${port}`);
    connectToDb();
})