import React, { SyntheticEvent }    from 'react'
import { Link }                     from 'react-router-dom'

import ShowsController from '../controllers/ShowsController'

import Show from '../models/Show'

import ImageNotFound, { handleImageNotFound } from './ImageNotFound'

import '../static/css/ShowViewMain.css'



type ShowViewMainProps = {
    show:   Show
}



function ShowViewMain (props : ShowViewMainProps)
{

    const { show } = props

    const showImageUrl = ShowsController.getShowImage(show)

    const showImage = 
        <img    alt         = { show.name }
                className   = "w3-image ShowView-image"
                onError     = { (event : SyntheticEvent) => (handleImageNotFound(event)) }
                src         = { `${showImageUrl}` }
        />

    const showSiteUrl   =   ShowsController.getShowSite(show)
    const showSiteLink  =   <a  href    = { showSiteUrl }
                                title   = {showSiteUrl}
                            >
                                { showSiteUrl }
                            </a>
    


    return (
        <article className="w3-container ShowView-main w3-row w3-responsive no-padding w3-margin-bottom">

            <div className="w3-col l3 m6 s12 w3-center w3-padding">
                { ((showImageUrl) ? (showImage) : (<ImageNotFound />)) }
            </div>           

            <div className="w3-col l6 m6 s12 w3-align-left w3-padding">
                { /*    TO-DO:  migrate to iframe solution  */ }
                <p dangerouslySetInnerHTML={{ __html: ShowsController.getShowSummary(show)  }} />
            </div>

            <div className="w3-col l3 m12 s12 w3-padding">
                
                <div className="w3-theme-l3 Show-info w3-card-4">

                    <h4 className="w3-border-bottom w3-padding">Show info</h4>

                    <ul className="w3-ul">
                        <li><strong>Status</strong>                     
                            { ShowsController.getShowStatus (show).toLocaleLowerCase() }
                        </li>
                        <li><strong>Type</strong>
                            { ShowsController.getShowType   (show).toLocaleLowerCase() }
                        </li>
                        <li><strong className="w3-show">Site</strong>
                            { ((showSiteUrl) ? (showSiteLink) : (<></>)) }
                        </li>
                    </ul>
                </div>

            </div>    

        </article>
    )

}



export default ShowViewMain
