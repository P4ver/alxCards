const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const port = 3000

app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
  }
));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const users = require('./routes/userRoutes')
const auth = require('./routes/authRoute')
const cards = require('./routes/cardRoutes')

app.use('/', users)
app.use('/', auth)
app.use('/', cards)
// app.use('/uploads', express.static('uploads'));

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })


app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})