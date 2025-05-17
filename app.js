import express from 'express';
import connectDB from './Db/Db.connection.js';
const PORT = process.env.PORT || 5000;
import router from './router/copyData.router.js'
import cors from 'cors'
connectDB()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
