import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';

import db from './config/database'
import gigRoutes from './routes/gigs';

const app = express();

app.use('/gigs', gigRoutes);


//Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log(`Error: ${err}`));


// app.get('/', (req, res) => {
//  res.send('Index');
// });



const PORT = process .env.PORT || 3000;

app.listen(PORT, () => {
 console.log(`Server started on port ${PORT}`);
});