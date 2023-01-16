export function isShow (data : Object) : data is Show
{
    return (
        (data.hasOwnProperty('id'))
    &&  (data.hasOwnProperty('url'))
    &&  (data.hasOwnProperty('name'))
    // &&  (data.hasOwnProperty('season'))
    // &&  (data.hasOwnProperty('number'))
    &&  (data.hasOwnProperty('type'))
    // &&  (data.hasOwnProperty('airdate'))
    // &&  (data.hasOwnProperty('airtime'))
    // &&  (data.hasOwnProperty('airstamp'))
    &&  (data.hasOwnProperty('runtime'))
    &&  (data.hasOwnProperty('rating'))
    &&  (data.hasOwnProperty('image'))
    &&  (data.hasOwnProperty('summary'))
    &&  (data.hasOwnProperty('_links'))
    )
}



export type Show  = {
    // "id": 2458625,
    id:         number
    // "url": "https://www.tvmaze.com/episodes/2458625/barmageddon-1x06-trace-adkins-vs-mike-vrabel",
    url:        string
    // "name": "Trace Adkins vs. Mike Vrabel",
    name:       string
    // "season": 1,
    season?:    number
    // "number": 6,
    number?:    number
    // "type": "regular",
    type:       string
    // "airdate": "2023-01-09",
    airdate?:    string
    // "airtime": "23:00",
    airtime?:    string
    // "airstamp": "2023-01-10T04:00:00+00:00",
    airstamp?:   Date
    // "runtime": 60,
    runtime:    number
    // "rating": {...},
    rating:     ShowRatings
    // "image": null,
    image:      ShowImages | null
    // "summary": "<p>Split happens to country star Trace Adkins and Tennessee Titans coach Mike Vrabel.</p>",
    summary:    string
    // "_links": {...},
    _links:     ShowLinks
    // "_embedded": {...}
    _embedded   ?:  ShowEmbedded

    // FOUND AFTTER (other queryes)
    schedule        ?: ShowSchedule
    status          ?: string
    language        ?: string
    genres          ?: Array<string>
    averageRuntime  ?: number
    premiered       ?: string | null
    ended           ?: string | null
    officialSite    ?: string
    weigth          ?: number
    network         ?: ShowNetwork | null
    webChannel      ?: ShowWebChannel | null
    dvdCountry      ?: ShowCountry
    externals       ?: ShowExternals
    updated         ?: number
    score           ?: number
}

export default Show



export type ShowSearchResult = {
    show:   Show
,   score:  number
}

export function isShowSearchResult (data : Object) : data is ShowSearchResult
{
    return ((data.hasOwnProperty('show')) && (data.hasOwnProperty('score')))
}



export type ShowLink = {
    href:   string
}

export type ShowLinks = {
    self:               ShowLink
    show?:              ShowLink
    previousepisode?:   ShowLink
    nextepisode?:       ShowLink
}

export type ShowRatings = {
    average:    number | null
}

export type ShowSchedule = {
//     "time": "23:00",
    time:   string
//     "days": [
//         "Monday"
//     ]
    days:   Array<string>
}

export type ShowCountry = {
//         "name": "United States",
    name:       string
//         "code": "US",
    code:       string
//         "timezone": "America/New_York"
    timezone:   string
}

export type ShowOrigin = {
//      "id": 30,
    id:             number
//     "name": "USA Network",
    name:           string
//     "country": {...},
    country:        ShowCountry
//     "officialSite": "https://www.usanetwork.com"
    officialSite:   string
}

export type ShowNetwork     = ShowOrigin
export type ShowWebChannel  = ShowOrigin

export type ShowExternals = {
//     "tvrage": null,
    tvrage?:    string | null
//     "thetvdb": null,
    thetvdb?:   string | null
//     "imdb": null
    imdb?:      string | null
}

export type ShowImages = {
//  "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/435/1089484.jpg",
    medium?:    string | null
//  "original": "https://static.tvmaze.com/uploads/images/original_untouched/435/1089484.jpg"
    original:   string
}

export function isShowImages (data : Object) : data is ShowImages
{
    return (data.hasOwnProperty('original'))
}

export type ShowEmbeddedShow = {
    // "id": 64725,
    id:             number
    // "url": "https://www.tvmaze.com/shows/64725/barmageddon",
    url:            number
    // "name": "Barmageddon",
    name:           number
    // "type": "Game Show",
    type:           string
    // "language": "English",
    language:       string
    // "genres": [],
    genres:         Array<string>
    // "status": "Running",
    status:         string
    // "runtime": 60,
    runtime:        number
    // "averageRuntime": 60,
    averageRuntime: number
    // "premiered": "2022-12-05",
    premiered:      string | null
    // "ended": null,
    ended:          string | null
    // "officialSite": "https://www.usanetwork.com/barmageddon",
    officialSite:   string | null
    // "schedule": {...},
    schedule:       ShowSchedule
    // "rating": {...},
    rating:         ShowRatings
    // "weight": 91,
    weight:         number | null
    // "network": {... },
    network:        ShowNetwork | null
    // "webChannel": null,
    webChannel:     ShowWebChannel | null
    // "dvdCountry": null,
    dvdCountry:     ShowCountry | null
    // "externals": {...},
    externals:      ShowExternals
    // "image": {...},
    image:          ShowImages | null
    // "summary": "<p>Hosted by WWE Hall of Famer Nikki Bella, the series will see Shelton open the doors of his Nashville-based bar Ole Red to welcome a rowdy crowd for live music sing-alongs and well-loved bar games — with a twist! With Daly behind the bar and Shelton on stage, Bella will keep the competition fierce and set the stakes as celebrity friends go head-to-head in games such as Air Cannon Cornhole, Keg Curling, Drunken Axe Hole, Sharts (\"Shelton Darts\") and many more.</p>",
    summary:        string
    // "updated": 1673115503,
    updated:        EpochTimeStamp
    // "_links": {...}
    _links:         ShowLinks
}

export type ShowEmbedded = {
    show:   ShowEmbeddedShow
}





/** SAMPLE DATA

{
    "id": 2458625,
    "url": "https://www.tvmaze.com/episodes/2458625/barmageddon-1x06-trace-adkins-vs-mike-vrabel",
    "name": "Trace Adkins vs. Mike Vrabel",
    "season": 1,
    "number": 6,
    "type": "regular",
    "airdate": "2023-01-09",
    "airtime": "23:00",
    "airstamp": "2023-01-10T04:00:00+00:00",
    "runtime": 60,
    "rating": {
        "average": null
    },
    "image": null,
    "summary": "<p>Split happens to country star Trace Adkins and Tennessee Titans coach Mike Vrabel.</p>",
    "_links": {
        "self": {
            "href": "https://api.tvmaze.com/episodes/2458625"
        },
        "show": {
            "href": "https://api.tvmaze.com/shows/64725"
        }
    },
    "_embedded": {
        "show": {
            "id": 64725,
            "url": "https://www.tvmaze.com/shows/64725/barmageddon",
            "name": "Barmageddon",
            "type": "Game Show",
            "language": "English",
            "genres": [],
            "status": "Running",
            "runtime": 60,
            "averageRuntime": 60,
            "premiered": "2022-12-05",
            "ended": null,
            "officialSite": "https://www.usanetwork.com/barmageddon",
            "schedule": {
                "time": "23:00",
                "days": [
                    "Monday"
                ]
            },
            "rating": {
                "average": null
            },
            "weight": 91,
            "network": {
                "id": 30,
                "name": "USA Network",
                "country": {
                    "name": "United States",
                    "code": "US",
                    "timezone": "America/New_York"
                },
                "officialSite": "https://www.usanetwork.com"
            },
            "webChannel": null,
            "dvdCountry": null,
            "externals": {
                "tvrage": null,
                "thetvdb": null,
                "imdb": null
            },
            "image": {
                "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/435/1089484.jpg",
                "original": "https://static.tvmaze.com/uploads/images/original_untouched/435/1089484.jpg"
            },
            "summary": "<p>Hosted by WWE Hall of Famer Nikki Bella, the series will see Shelton open the doors of his Nashville-based bar Ole Red to welcome a rowdy crowd for live music sing-alongs and well-loved bar games — with a twist! With Daly behind the bar and Shelton on stage, Bella will keep the competition fierce and set the stakes as celebrity friends go head-to-head in games such as Air Cannon Cornhole, Keg Curling, Drunken Axe Hole, Sharts (\"Shelton Darts\") and many more.</p>",
            "updated": 1673115503,
            "_links": {
                "self": {
                    "href": "https://api.tvmaze.com/shows/64725"
                },
                "previousepisode": {
                    "href": "https://api.tvmaze.com/episodes/2458625"
                },
                "nextepisode": {
                    "href": "https://api.tvmaze.com/episodes/2461538"
                }
            }
        }
    }
}

**/
