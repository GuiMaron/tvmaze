import React from "react"

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { solid }            from '@fortawesome/fontawesome-svg-core/import.macro'

import '../static/css/Loading.css'





function Loading ()
{

    return (
        <div className="w3-theme-dark w3-container w3-padding w3-center Loading">

            <span className="w3-xxlarge w3-hide-small">Loading</span>

            <FontAwesomeIcon    className   = "w3-icon w3-spin w3-xxlarge" 
                                icon        = { solid('gear') } 
            />

        </div>
    )

}



export default Loading

