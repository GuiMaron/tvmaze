import ENV from '../ENV'

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState }  from 'react'

import { Show } from '../models/Show'

import Axios            from '../apis/TVMaze'
import ShowsController  from '../controllers/ShowsController'
import useApi           from '../hooks/useApi'

import Loading      from './Loading'
import ShowsList    from './ShowsList'

import '../static/css/ShowSearch.css'



type ShowSearchProps = {
    onError:    Function
    onWarning:  Function
}



function ShowSearch (props : ShowSearchProps)
{
    
    const [url, setUrl]                 = useState(ENV.URLS.FULL_SCHEDULE);
    const [queryParams, setQueryParams] = useState({})
    const [search, setSearch]           = useState('');

    const showsController   = new ShowsController()

    const {onError, onWarning} = props



    const [shows, error, warning, loading, refresh] = useApi({
        axiosInstance:          Axios
    ,   url:                    url
    ,   slowConnectionTimeout:  ENV.AXIOS_CONFIG.WARNING_SLOW_CONNECTION_MS
    ,   requestConfig:          {
            params: queryParams
        }
    })

    useEffect(() => 
    {
        onError(error)
    },  [error])

    useEffect(() => 
    {
        onWarning(warning)
    },  [warning])



    const handleSearchChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        setSearch(event.target.value)
    }

    const handleSubmit = useCallback((event : React.FormEvent<HTMLFormElement>) =>
    {   

        event.preventDefault()
        console.debug('SUBMIT')

        if (! search) {
            console.debug('no search')
            setQueryParams({})
            setUrl(ENV.URLS.FULL_SCHEDULE)
            refresh()
            return
        }
        
        console.debug('search')

        //  TO-DO:  sanitization
        setQueryParams({
            q:  search
        })

        setUrl(ENV.URLS.SHOW_SEARCH)

        refresh()
        
    }, [search, refresh])



    const showsList = useMemo(() =>
    {

        console.debug('NEW SOHW ???')
        const showsCopy         = ((Array.isArray(shows)) ? (shows) : ([ shows ]))
        const showsToDisplay    = showsController.selectShows(url, showsCopy) as Array<Show> 

        return (
            <ShowsList  pageSize    = { ENV.PAGINATION.PAGE_SIZE }
                        shows       = { showsToDisplay } 
                        title       = { showsController.selectListTitle(url) }
            />
        )

    }, [shows])



    return (
        <main className="ShowSearch">

            <form   className   = "w3-padding ShowSearch-form"
                    onSubmit    = { handleSubmit }
            >

                <div className="w3-row w3-row-padding w3-container w3-mobile">

                    <div className="w3-col l1 m2 w3-hide-small">
                        <label htmlFor = "show-search">
                            <h3>Search</h3>
                        </label>
                    </div>

                    <div className="w3-col w3-rest w3-padding l10 m8 s9">
                        <input  autoFocus   = { true }
                                className   = "w3-input w3-round-xxlarge"
                                disabled    = { !! loading }
                                id          = "show-search"
                                onChange    = { handleSearchChange }
                                placeholder = "Search Shows and People"
                                tabIndex    = { 0 }
                                type        = "text" 
                                value       = { search }
                        />
                    </div>

                    <div className="w3-col l1 m2 s3 w3-center ShowSearch-form-search-button-wrapper">
                        <button className   = "w3-button w3-border w3-round-xxlarge w3-theme-dark ShowSearch-form-search-button"
                                disabled    = { !! loading }
                                type        = "submit"
                        >
                            <span className="w3-large">
                                Go!
                            </span>
                        </button>
                    </div>

                </div>

            </form>

            <Suspense fallback={ <Loading />}>
                { ((loading)    ? (<Loading />) : (<></>)) }
                { ((! loading)  ? (showsList)   : (<></>)) }
            </Suspense>

        </main>
    )

}



export default ShowSearch
