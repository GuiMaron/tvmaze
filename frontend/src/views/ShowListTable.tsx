import React    from 'react'

import { isShow, Show } from '../models/Show'

import ShowListEntry    from './ShowListEntry'

import '../static/css/StickyHeaderTable.css'
import '../static/css/ShowsListTable.css'



type ShowListTableProps = {
    shows:      Array<Show>
,   pageSize:   number
}



function ShowListTable (props : ShowListTableProps)
{

    const { shows, pageSize } = props



    const tableHeader = (
        <tr className="w3-theme-d3">
            { ((process.env.NODE_ENV === 'development') ? (<th data-field="id" className="w3-hide-small">ID</th>) : (<></>)) }
            <th data-field="name">Name</th>
            <th data-field="season">
                <span className="w3-hide-medium w3-hide-large">S.</span>
                <span className="w3-hide-small">Season</span>
            </th>
            <th data-field="number">
                <span className="w3-hide-medium w3-hide-large">E.</span>
                <span className="w3-hide-small">Episode</span>
            </th>
            <th data-field="starts">Starts</th>
            <th data-field="ends">Ends</th>
        </tr>
    )



    return (
        <div className="ShowsList-table-wrapper sticky-header-table-wrapper">
            <table className="w3-table w3-striped w3-hoverable ShowsList-table">
    
                <thead>
                    { tableHeader }
                </thead>

                <tbody>
                    { 
                        shows.map((show : Object) => 
                        {
                            
                            if (! isShow(show)) {

                                //  TO-DO:  better logging
                                console.error('Invalid show')
                                console.error(show)

                                return (<></>)

                            }

                            return (<ShowListEntry key={ show.id } show={show as Show} />)

                        })
                    }
                </tbody>

                {
                    ((shows.length >= (pageSize / 2)) ? (<tfoot>{ tableHeader }</tfoot>) : (<></>))
                }
                
            </table>
        </div>
    )

}



export default ShowListTable
