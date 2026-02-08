require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connectDB.js');
const errorHandler = require('./middleware/errorHandler.js');
const RequestLogger = require('./middleware/logger.js');
const ArticleRoutes = require('./routes/article.route.js')





const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use(cors('*'))

app.use(RequestLogger)

app.use('/api', ArticleRoutes)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Blog is running on port http://localhost:${PORT}`)
})
