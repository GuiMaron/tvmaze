import React    from "react"

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { solid }            from '@fortawesome/fontawesome-svg-core/import.macro'

import '../static/css/WarningMessage.css'



type WarningMessageProps = {
    message:    string
    close:      Function
}



function WarningMessage (props : WarningMessageProps)
{

    const {message, close} = props



    return (
        <div className="WarningMessage w3-modal w3-show w3-theme-l3 w3-display-container App-animate-fadeIn">
            <div className="w3-modal-content WarningMessage-content w3-border w3-round w3-round-large w3-display-bottomright w3-margin">
                <header className="WarningMessage-header w3-container w3-border-bottom w3-yellow">
                    <FontAwesomeIcon    className   = "w3-icon w3-large w3-right clickable" 
                                        icon        = { solid('xmark') } 
                                        onClick     = { () => (close()) }
                    />
                </header>
                <div className="WarningMessage-body w3-padding">
                    <span>{ message }</span>
                </div>
            </div>
        </div>
    )

}



export default WarningMessage
