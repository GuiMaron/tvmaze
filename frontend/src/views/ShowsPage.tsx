import React    from 'react'

import { Show } from '../models/Show'

import ShowListTable    from './ShowListTable'



type ShowsPageProps = {
    shows:      Array<Show>
,   page:       number
,   pages:      number  
,   pageSize:   number
}



function ShowsPage (props : ShowsPageProps)
{

    const { shows, pages, pageSize } = props



    return (
        <section className="ShowsPage" data-pages={ pages }>
            <section className="ShowPage-content">
               <div className="w3-responsive">
                    { <ShowListTable shows={ shows as Array<Show> } pageSize={ pageSize } /> }
               </div>
            </section>
        </section>
    )

}



export default ShowsPage
