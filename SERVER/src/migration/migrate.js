import debug from 'debug';
import db from '../models/index';

const { models } = db;
debug.log('Database migration in progress....\n\n');
models.sync({ force: true });
