import express from 'express';
import videoRoutes from './routes/videoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', videoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
