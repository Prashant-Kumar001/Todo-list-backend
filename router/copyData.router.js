import express from 'express';
const router = express.Router();
import { getAllData, addData,deleteData, updateData } from '../controller/copyData.controller.js';
router.get('/code', getAllData)
router.post('/snippet', addData)
router.delete('/snippet/:id', deleteData)
router.put('/snippet/:id', updateData)

export default router