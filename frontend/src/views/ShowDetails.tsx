import React from 'react'



type ShowDetailsProps = {
    onError:    Function
    onWarning:  Function
}



function ShowDetails (props : ShowDetailsProps)
{

    const { onError, onWarning } = props



    return (
        <>
            <h2>Details</h2>
        </>
    )


}



export default ShowDetails

