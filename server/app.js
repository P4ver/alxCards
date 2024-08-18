const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const port = 3000

app.use(bodyParser.json())
app.use(cookieParser());

const users = require('./routes/userRoutes')
const auth = require('./routes/authRoute')
const cards = require('./routes/cardRoutes')

app.use('/', users)
app.use('/', auth)
app.use('/', cards)
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })


app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})