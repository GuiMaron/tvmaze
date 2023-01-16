import React    from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { solid }            from '@fortawesome/fontawesome-svg-core/import.macro'




function ShowNotFound ()
{

    return (
        <div className="w3-theme-dark w3-container w3-padding w3-center w3-responsive NoShowsFound w3-row">

            <span className="w3-xlarge">Show Not Found!</span>

            <FontAwesomeIcon    className   = "w3-icon w3-xlarge w3-center w3-margin-left"  
                                icon        = { solid('face-frown') } 
            />

            <div className="w3-margin">

                Maybe you can try using the <Link to="/">search</Link>?
                
                <Link to="/" className="w3-show w3-theme-light w3-margin">
                    <button className="w3-button clickable w3-show-inline-block w3-xlarge">
                        
                        <span>Go to Search</span>

                        <FontAwesomeIcon    className   = "w3-icon w3-xlarge w3-margin-left"  
                                            icon        = { solid('magnifying-glass-arrow-right') } 
                        />

                    </button>
                </Link>

            </div>

        </div>
    )

}



export default ShowNotFound
