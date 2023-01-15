const ENV = require('./ENV')



// Express setup
const express       = require('express')
const bodyParser    = require('body-parser')
const cors          = require('cors')
const circularJSON  = require('circular-json')

const app = express()
app.use(cors())
app.use(bodyParser.json())





// Express handling
app.get('/', (request, response) => 
{
    response.status(200).send('TVMaze API')
})



//  Redis and Axios
const redisClient       = require('./cache/TVMaze')
const axios             = require('./api/TVMaze')

const redisPublisher    = redisClient.duplicate()
let   redisIsConnected  = false



redisClient.on('error',     ((error) => console.error('Redis Client Error', error)))



app.get(`/${ENV.URLS.FULL_SCHEDULE}`, async (request, response) => 
{
    
    response.type('application/json')

    //  Trying to get from cache
    let cachedData = await getFromCache(ENV.URLS.FULL_SCHEDULE, response)

    if (cachedData) {
        return (response.status(200).send(cachedData))
    }

    //  Trying to get from API
    let fetchedData = await getFromApi(ENV.URLS.FULL_SCHEDULE, response)

    response.status(200).json(fetchedData)

    await cacheData(ENV.URLS.FULL_SCHEDULE, fetchedData)

    return (() => (abortController.abort()))

})




async function cacheData (url, data)
{

    //  Caching
    console.debug('Caching')

    try {
        await redisClient.set (url, data)
        // redisPublisher.publish('insert', url)
    }
    catch (exception) {
        console.error(exception)
    }

}

async function getFromCache (url, response)
{

    let cachedData 

    //  Trying to get from cache
    console.debug('Retrieving from cache')

    try {

        if (! redisIsConnected) {
            await redisClient.connect()
            redisIsConnected = true
        }
        
        cachedData = await redisClient.get(url)

    }
    catch (exception) {
        console.error(exception)
        return (response.status(500).json({ error: exception }))
    }

    return (cachedData)

}

async function  getFromApi (url, response)
{

    let fetchedData 

    //  Geting it from TVMaze
    console.debug('Retrieving from API')
    const abortController   = new AbortController()

    try {

        fetchedData = await axios.get(
            url
        ,   {
                signal: abortController.signal
            }
        )

    }
    catch (exception) {
        console.error(exception)
        return (response.status(500).json({ error: exception }))
    }

    const jsonData = circularJSON.stringify(fetchedData)

    return (jsonData)

}





// HERE BE DRAGONS !!!
app.listen(ENV.APP_CONFIG.PORT, (error) => 
{
    console.log(`Listening on port ${ENV.APP_CONFIG.PORT}`)
})
