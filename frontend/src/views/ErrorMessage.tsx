import React    from "react"

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { solid }            from '@fortawesome/fontawesome-svg-core/import.macro'

import '../static/css/ErrorMessage.css'



type ErrorMessageProps = {
    message:    string
    close:      Function
}



function ErrorMessage (props : ErrorMessageProps)
{

    return (
        <div className="ErrorMessage w3-show w3-theme-l3 w3-modal App-animate-fadeIn">
            <div className="w3-modal-content ErrorMessage-content w3-border w3-round w3-round-large">
                <header className="ErrorMessage-header w3-container w3-border-bottom w3-red">
                    <FontAwesomeIcon    className   = "w3-icon w3-xxlarge w3-right clickable" 
                                        icon        = { solid('xmark') } 
                                        onClick     = { (event : React.MouseEvent | React.TouchEvent) => (props.close(event)) }
                    />
                </header>
                <div className="ErrorMessage-body w3-padding">
                    <h5>{ props.message }</h5>
                </div>
            </div>
        </div>
    )

}



export default ErrorMessage
