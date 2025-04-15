import express from 'express';
import {
    queryController
} from '../controllers/queryController.js';

const queryRouter = express.Router();
queryRouter.post('/execute', queryController.execute);
export default queryRouter;
