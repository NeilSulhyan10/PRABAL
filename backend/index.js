require('dotenv').config();
const express = require('express');
const cors = require('cors'); // ✅ import cors
const routes = require('./routes/index');

const app = express();

// ✅ Enable CORS for frontend (Vite on port 5173)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // only needed if using cookies or auth headers
}));

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
