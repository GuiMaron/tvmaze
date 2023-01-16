import React, { useCallback, useState }   from 'react'

import Show from '../models/Show'

import ShowsController from '../controllers/ShowsController'

import DebugPre     from './DebugPre'
import ShowViewMain from './ShowViewMain'



type ShowViewProps = {
    show:   Show
}


function ShowView (props : ShowViewProps)
{

    const { show } = props

    const [page, setPage] = useState('main')

    console.debug(show)



    const currentlySelected = useCallback ((name : string) =>
    {
        return (name === page)
    }, [page])

    const getNavigationButtonClasses = useCallback((name : string) => 
    {
        return (`clickable w3-button w3-bar-item ShowView-navigation-button ${((currentlySelected(name)) ? ('w3-theme-dark') : (''))}`)
    }, [page])

    const getPagesClasses = useCallback((name : string) => 
    {
        return (`w3-container no-padding ShowView-page ${((currentlySelected(name)) ? ('w3-show') : ('w3-hide'))}`)
    }, [page])



   
    const showImageUrl = ShowsController.getShowImage(show)
    let   showImage 

    if (! showImageUrl) {
        showImage = <span>Image not found!</span>
    }
    else {
        showImage = 
            <img    alt         = { show.name }
                    className   = "w3-image ShowView-show-img"
                    src         = { showImageUrl }
            />
    }



    return (
        <div className="w3-container ShowView">

            <header className="w3-container w3-border-bottom w3-margin-bottom">
                <div>
                    <h2>{show.name}</h2>
                </div>
            </header>

            { /*    NAVIGATION   */ }
            <nav className="w3-container w3-bar ShowView-navigation w3-margin-top w3-margin-bottom">

                <button className   = { getNavigationButtonClasses('main') }
                        data-page   = "main"
                        onClick     = { () => (setPage('main'))}
                >
                    Main
                </button>

                {
                    ((process.env.NODE_ENV === 'development') 
                    ?   (
                            <button className   = { getNavigationButtonClasses('debug') }
                                    data-page   = "debug"
                                    onClick     = { () => (setPage('debug'))}
                            >
                                Raw Data
                            </button>
                        ) 
                    : (<></>)
                    )
                }

            </nav>

            { /*    PAGES   */ }
            <div className="w3-container ShowView-pages">

                {((currentlySelected('main'))   ? (<section className={ getPagesClasses('main') }><ShowViewMain show={ show }/></section>)                         : (<></>))}
                {((currentlySelected('debug'))  ? (<section className={ getPagesClasses('debug') }><DebugPre data={show} /></section>)    : (<></>))}

            </div>
     
        </div>
    )

}



export default ShowView
