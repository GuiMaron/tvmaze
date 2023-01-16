import React, { useEffect, useMemo, useState } from 'react'


import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { solid }            from '@fortawesome/fontawesome-svg-core/import.macro'

import Show from '../models/Show'

import ShowsPage    from './ShowsPage'
import NoShowsFound from './NoShowsFound'

import range from '../utils/range'

import '../static/css/ShowsList.css'



type ShowsListProps = {
    shows:      Array<Show>
,   pageSize:   number
,   title:      string
}



function ShowsList (props : ShowsListProps)
{

    const { shows = [], pageSize, title }  = props

    const [page,    setPage]        = useState(1)
    const [pages,   setPages]       = useState(0)

    const pageButtonWidth = 50



    const paginationbar = useMemo(() => 
    {

        if (pages <= 1) {
            return (<></>)
        }

        

        const pageLinks = range(1, (pages + 1)).map((pageIndex : number) => 
        {
            return(
                <button  className   = { `clickable w3-button w3-bar-item ${((pageIndex === page) ? ('w3-theme-dark') : (''))} ShowsList-PageButton` }
                    data-page   = { pageIndex }
                    key         = { pageIndex }
                >
                    <span>{ pageIndex }</span>
                </button>
            )
        })



        return (
            <div className="w3-bar ShowsList-PaginationBar">
                <div className="w3-bar-item ShowsList-FastNavigationButtonWrapper w3-border w3-center">
                    <a href="#" className="w3-button" data-page="0">
                        <FontAwesomeIcon icon={ solid('chevron-left') } />
                        <span className="w3-hide-small w3-margin-left">Previous</span>
                    </a>
                </div>
                
                <div className="w3-bar-item ShowsList-PageButtonWrapper w3-border">
                    <div className="w3-bar ShowsList-PageButtonWrapper-content" style={ { width: `${(pages * pageButtonWidth)}px` } }>
                        { pageLinks }
                    </div>
                </div>

                <div className="w3-bar-item ShowsList-FastNavigationButtonWrapper w3-border w3-center">
                    <a href="#" className="w3-button" data-page={ pages - 1 }>
                        <span className="w3-hide-small w3-margin-right">Next</span>
                        <FontAwesomeIcon icon={ solid('chevron-right') } />
                    </a>
                </div>
            </div>
        )

    }, [shows, pageSize, pages])



    const showsPage = useMemo(() =>
    {
        return (<ShowsPage page={ page } pages={ pages } pageSize={ pageSize } shows={ shows.slice(((page - 1) * pageSize), pageSize) } />)
    },  [shows, page, pages, pageSize])

    useEffect(() => 
    {
        setPages(Math.ceil(shows.length / pageSize))
        setPage(1)
    }, [pageSize, shows, shows.length])




    return (
        <div className="ShowsList w3-margin">

            <div className="w3-theme-d1 w3-container ShowsList-title">
                <h4>
                    { title }
                </h4>
            </div>

            {paginationbar}

            <div className="w3-border-bottom ShowsList-list" data-pages={ pages }>
                
                { ((shows.length === 0) ? (<NoShowsFound />) : (showsPage)) }

            </div>

        </div>
    )

}



export default ShowsList
