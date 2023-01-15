// Express setup
const express       = require('express')
const bodyParser    = require('body-parser')
const cors          = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())



// Express handling
app.get('/', (request, response) => 
{
    response.status(200).send('TVMaze API')
})



// HERE BE DRAGONS !!!
app.listen(5000, (error) => 
{
    console.log('Listening on port 5000')
})
