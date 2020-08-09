const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 5000
const cors = require('cors')

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions)) //cors

app.get('/', (req, res) => {
  res.send('todolist-test app is running')
})

app.use('/api/todos', require('./controllers/todos'));
app.use('/api/lists', require('./controllers/lists'));

app.listen(process.env.PORT || 5000, () => console.log('app on port 5000!'));