require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const database = require('./config/database');
const routes = require('./routes/Routes');

const app = express();
const PORT = process.env.PORT || 5000;

database();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(compression());

app.use('/api', routes);

app.get('/', (req, res) => res.send('GitHub OAuth TestGen API'));

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
);

// graceful shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received — shutting down');
  process.exit(0);
});
process.on('SIGTERM', () => {
  console.log('SIGTERM received — shutting down');
  process.exit(0);
});
