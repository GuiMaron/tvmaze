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
app.get('/api', (request, response) => 
{
    response.status(200).send('TVMaze API / API')
})



//  Redis and Axios
const redisClient       = require('./cache/TVMaze')
const axios             = require('./api/TVMaze')
const CircularJSON = require('circular-json')
const { json } = require('body-parser')
const { request } = require('express')

const redisPublisher    = redisClient.duplicate()
let   redisIsConnected  = false



//  TO-DO:  better logging
//  redisClient.on('error',     ((error) => console.error('Redis Client Error', error)))

app.get(`/${ENV.URLS.FULL_SCHEDULE}`, async (request, response) => 
{
    return (getFullShchedule(request, response))
})

app.get(`/${ENV.URLS.SHOW_INFO}`, async (request, response) => 
{
    return (getShowInfo(request, response))
})

app.get(`/${ENV.URLS.SHOW_SEARCH}`, async (request, response) => 
{
    return (getShowSearch(request, response))
})



async function getFullShchedule (request, response)
{
    const fullScheduleUrl = `${ENV.URLS.FULL_SCHEDULE}`
    
    return (await doRequest(fullScheduleUrl, {}, request, response))
}

async function getShowInfo (request, response)
{
    const showInfoUrl = ENV.URLS.SHOW_INFO.replace(/\:id/, request.params.id)

    return (await doRequest(showInfoUrl, {}, request, response))
}

async function getShowSearch (request, response)
{

    const query = request.query.q || request.query.query || request.query.search

    if (! query) {
        return (getFullShchedule(request, response))
    }

    const queryParams = {
        q:  query
    }

    return (await doRequest(ENV.URLS.SHOW_SEARCH, queryParams, request, response))

}




async function doRequest (url, queryParams, request, response)
{

    response.type('application/json')
    const abortController   = new AbortController()

    // Trying to get from cache
    let [success, cachedData] = await getFromCache(url, queryParams, response)

    if (success) {
        return
    }

    //  Trying to get from API
    let [sucess, fetchedData] = await getFromApi(url, queryParams, response, abortController)

    await cacheData(url, queryParams, fetchedData)

    abortController.abort()

}



async function cacheData (url, queryParams, data)
{

    if (queryParams) {
        url = `${url}?${JSON.stringify(queryParams)}`
    }

    if (! redisIsConnected) {
        await redisClient.connect()
        redisIsConnected = true
    }

    //  No need to bother the user with cache errors
    try {
        await redisClient.set (url, data)
        // redisPublisher.publish('insert', url)
    }
    catch (exception) {
        return (console.error(exception))
    }

}

async function getFromCache (url, queryParams, response)
{

    let cachedData 
    
    //  Trying to get from cache
    //  console.debug('Retrieving from cache')

    if (queryParams) {
        url = `${url}?${JSON.stringify(queryParams)}`
    }

    try {

        if (! redisIsConnected) {
            await redisClient.connect()
            redisIsConnected = true
        }
        
        cachedData = await redisClient.get(url)

    }
    catch (exception) {

        const error = { error: exception }

        response.status(500).send(error)
        return ([ false, error ])

    }

    if (cachedData) {

        const parsedData = CircularJSON.parse(cachedData)

        if ((parsedData?.error) && (parsedData?.error?.status)) {
            response.status(parsedData?.error?.status).send(cachedData)
            return ([true, cachedData])
        }

        response.status(200).send(cachedData)
        return ([true, cachedData])
    }

    return ([false, null])

}

async function  getFromApi (url, queryParams, response, abortController)
{

    let fetchedData 

    //  Geting it from TVMaze
    console.debug('Retrieving from API')

    try {

        fetchedData = await axios.get(
            url
        ,   {
                signal: abortController.signal
            ,   params: queryParams || {}
            }
        )

    }
    catch (exception) {

        if (exception?.response?.status == 404) {

            const notFound = circularJSON.stringify({ error: exception?.response?.data })

            response.status(404).send(notFound)
            return ([true, notFound])

        }

        const error = circularJSON.stringify({ error: exception })

        response.status(500).send(error)
        return ([false, error])

    }

    let jsonData = circularJSON.stringify(fetchedData)

    response.status(200).send(jsonData)

    return ([true, jsonData])

}





// HERE BE DRAGONS !!!
app.listen(ENV.APP_CONFIG.PORT, (error) => 
{
    console.log(`Listening on port ${ENV.APP_CONFIG.PORT}`)
})
