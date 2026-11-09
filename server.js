const express = require('express');
const logger = require('./middleware/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const usersRoutes = require('./routes/users.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/api/users', usersRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
