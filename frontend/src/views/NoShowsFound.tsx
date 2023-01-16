import React    from 'react'

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { solid }            from '@fortawesome/fontawesome-svg-core/import.macro'

import '../static/css/NoShowsFound.css'



function NoShowsFound ()
{

    return (
        <div className="w3-theme-dark w3-container w3-padding w3-center w3-responsive NoShowsFound w3-row">

            <span className="w3-xlarge">No Shows Found!</span>

            <FontAwesomeIcon    className   = "w3-icon w3-xlarge l2 w3-center"  
                                icon        = { solid('face-frown') } 
            />

        </div>
    )

}



export default NoShowsFound
