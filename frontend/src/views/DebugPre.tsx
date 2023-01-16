import React, { useState }    from 'react'

import '../static/css/DebugPre.css'



type DeburPrePropts = {
    data:   unknown
}

function DebugPre (props : DeburPrePropts)
{

    const { data } = props

    const [display, setDisplay] = useState(false)



    const pre = 
        <pre className="w3-show w3-border DebugPre" style={ { textAlign: 'left' } }>
            { JSON.stringify(data, null, '\t') }
        </pre>


    const displayToggle = () => (setDisplay((current : boolean) => (! current)))



    return (
        <div className="DebugPreWrapper w3-border w3-margin">
            <button className="w3-button clickable w3-border w3-theme-d1" onClick={ displayToggle }>
                {`Click here to ${((display) ? ('hide') : ('show'))} Show's raw-data`}
            </button>
            <div className="DebugPre-content">
                { ((display) ? (pre) : (<></>)) }
            </div>
        </div>
    )

}



export default DebugPre
