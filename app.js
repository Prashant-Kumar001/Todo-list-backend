import express from 'express';
import connectDB from './Db/Db.connection.js';
import router from './router/copyData.router.js';
import cors from 'cors';

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://todo-list-frontend-lovat.vercel.app/"
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running successfully'
    });
});

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
