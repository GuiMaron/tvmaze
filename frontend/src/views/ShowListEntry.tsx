import React from 'react'

import { Show } from '../models/Show'

import ShowsController from '../controllers/ShowsController'



type ShowsListEntryProps = {
    show:   Show
}



const ShowsListEntry = function (props : ShowsListEntryProps)
{

    const { show } = props

    //  console.debug(show)

    return (
        <tr className   = "ShowsListEntry"
            key         = { show.id }
        >
            { ((process.env.NODE_ENV === 'development') ? (<th data-field="id" className="w3-hide-small">{ show.id }</th>) : (<></>)) }
            <th data-field="name">  <span>{ show.name }</span>                  </th>
            <td data-field="season">{ show.season }                             </td>
            <td data-field="number">{ show.number }                             </td>
            <td data-field="starts">{ ShowsController.getShowStartTime(show) }  </td>
            <td data-field="ends">  { ShowsController.getShowEndTime(show) }    </td>
        </tr>
    );

}



export default ShowsListEntry