import React, { SyntheticEvent }    from 'react'

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { solid }            from '@fortawesome/fontawesome-svg-core/import.macro'

import '../static/css/NoShowsFound.css'



function ImageNotFound ()
{

    return (
        <div className="w3-container w3-show-inline-block w3-border ImageNotFound">

            <span className="w3-xlarge">Image not found!</span>

            <FontAwesomeIcon    className   = "w3-icon w3-xlarge l2 w3-center"  
                                icon        = { solid('face-frown') } 
            />

        </div>
    )

}



/*  TO-DO: fazer isso realmente montando os elementos   */
export function handleImageNotFound (event : SyntheticEvent)
{

    const target        = event.target as HTMLImageElement

    const imageNotFound     = document.createElement('div')
    imageNotFound.className = 'w3-container w3-show-inline-block w3-border ImageNotFound'
    imageNotFound.innerHTML = '<span class="w3-xlarge">Image not found!</span><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="face-frown" class="svg-inline--fa fa-face-frown w3-icon w3-xlarge l2 w3-center" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM159.3 388.7c-2.6 8.4-11.6 13.2-20 10.5s-13.2-11.6-10.5-20C145.2 326.1 196.3 288 256 288s110.8 38.1 127.3 91.3c2.6 8.4-2.1 17.4-10.5 20s-17.4-2.1-20-10.5C340.5 349.4 302.1 320 256 320s-84.5 29.4-96.7 68.7zM208.4 208c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32zm128 32c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"></path></svg>'

    target.parentElement?.replaceChild(imageNotFound, target)

}



export default ImageNotFound
