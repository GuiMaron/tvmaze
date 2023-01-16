import ENV from '../ENV'

import React, { useEffect, useState }  from 'react'
import { useParams }    from 'react-router-dom'

import Show     from '../models/Show'

import Axios            from '../apis/TVMaze'
import useApi           from '../hooks/useApi'

import { isError404 }   from '../utils/errorParser'

import Loading      from './Loading'
import ShowNotFound from './ShowNotFound'
import ShowView     from './ShowView'



type ShowDetailsProps = {
    onError:    Function
    onWarning:  Function
}



function ShowDetails (props : ShowDetailsProps)
{

    const { onError, onWarning } = props
    const params = useParams()

    const [currentShow, setCurrentShow] = useState(<></>)



    const [showData, error, warning, loading] = useApi({
        axiosInstance:          Axios
    ,   url:                    ENV.URLS.SHOW_INFO.replace(/\:id/, `${params.id}`)
    ,   slowConnectionTimeout:  ENV.AXIOS_CONFIG.WARNING_SLOW_CONNECTION_MS
    })

    useEffect(() => 
    {

        console.debug(error)

        //  TO-DO:  better error handling, returning error objects and treating it after
        if (isError404(error)) {
            return (setCurrentShow(<ShowNotFound />))
        } 

        onError(error)

    },  [error])

    useEffect(() => 
    {
        onWarning(warning)
    },  [warning])



    useEffect(() =>
    {
        setCurrentShow(<ShowView show={ showData as Show } />)
    }, [showData])



    return (
        <main className="ShowDetails">
            { (((! loading) && (! error))   ? (currentShow)         : (<></>)) }
            { (((error))                    ? (<ShowNotFound />)    : (<></>)) }
            { ((loading)                    ? (<Loading />)         : (<></>)) }
        </main>
    )


}



export default ShowDetails

