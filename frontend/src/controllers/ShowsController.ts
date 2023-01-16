import ENV from '../ENV'

import Controller, { ControllerProps } from './Controller'

import { isShowImages, Show, ShowSearchResult } from '../models/Show'



enum ShowStatus {
    ENDED               = 'Ended'
,   RUNNING             = 'Running'
,   TO_BE_DETERMINED    = 'To Be Determined'
,   UNKNOWN             = 'Unknown'
}

enum WeekDays {
    'sunday'    =   0
,   'monday'    =   1
,   'tuesday'   =   2
,   'wednesday' =   3
,   'thursday'  =   4
,   'friday'    =   5
,   'saturday'  =   6
}



export function ShowsSearchSorter (showA : Show, showB : Show) : number
{

    //  First rule: score (if present)
    const [scoreA = 0, scoreB = 0] = [showA.score,  showB.score]

    if (scoreA > scoreB) {
        return (1)
    } else if (scoreA < scoreB) {
        return (-1)
    }

    //  Second rule: name
    return (showA.name.toLocaleLowerCase().localeCompare(showB.name))
    
}

export function ShowsSorter (showA : Show, showB : Show) : number
{

    //  Firts rule: earliest airtime
    const [airtimeA, airtimeB] = [(+ ShowsController.getShowAirTime(showA)),  (+ ShowsController.getShowAirTime(showB))]

    if (airtimeA > airtimeB) {
        return (1)
    }
    else if (airtimeA < airtimeB) {
        return (-1)
    }

    //  TO-DO:  Second rule (SHOULD BE IN YOUR FAVORITES)

    //  Third rule: less runtime
    const [runtimeA, runtimeB] = [ShowsController.getShowRuntime(showA),  + ShowsController.getShowRuntime(showB)]

    if (runtimeA > runtimeB) {
        return (1)
    } else if (runtimeA < runtimeB) {
        return (-1)
    }

    //  Fourth rule: score (if present)
    const [scoreA = 0, scoreB = 0] = [showA.score,  showB.score]

    if (scoreA > scoreB) {
        return (1)
    } else if (scoreA < scoreB) {
        return (-1)
    }

    //  Fifth rule: name
    return (showA.name.toLocaleLowerCase().localeCompare(showB.name))

}



class ShowsController extends Controller
{

    static callbacks = {
        [ENV.URLS.FULL_SCHEDULE]:   function (shows : Array<Show>) : Array<Show> { return (this.selectNowAndUpcomingShows(shows)) }
    ,   [ENV.URLS.SHOW_SEARCH]:     function (shows : Array<Show>) : Array<Show> { return (this.selectSearchedShows(shows)) }
    }

    static SearchTitles = {
        [ENV.URLS.FULL_SCHEDULE]:   'Upcoming shows today'
    ,   [ENV.URLS.SHOW_SEARCH]:     'Search results for :search'
    ,   default:                    'Upcoming shows today'
    }



    constructor (props ?: ControllerProps | null)
    {
        super(props)
    }



    static getShowAirDate (show : Show) : Date
    {   

        const airDate = show?.airdate || ''

        if (! airDate) {
            console.error(`Show with id = {${show.id}} has no defined airdate`)
            console.debug(show)
        }

        const [year, month, day] = `${show.airdate}`.split('-')
        const airDay             = new Date(parseInt(year), (parseInt(month) - 1), parseInt(day))

        return (airDay)

    }

    static getShowAirStamp (show : Show) : Date
    {   

        if (! show?.airstamp) {
            console.error(`Show with id = {${show.id}} has no defined airstamp`)
            console.debug(show)
        }

        return (show?.airstamp || new Date(0))

    }

    static getShowAirTime(show : Show) : Date
    {   

        const airTime = show?.airtime || show?.schedule?.time || show?._embedded?.show?.schedule?.time || ''

        if (! airTime) {
            console.error(`Show with id = {${show.id}} has no defined airtime`)
            console.debug(show)
        }

        const { nowYear, nowMonth, nowDay } = Controller.getDateInfo()
        const [ airHour, airMinute ] = airTime.split(':').map((value : string) => (parseInt(value)))

        return (new Date(nowYear, nowMonth, nowDay, airHour, airMinute))

    }

    static getShowEnd (show : Show) : Date
    {

        const showStart = ShowsController.getShowStartTime(show)

        if (! showStart) {
            return (new Date(0))
        }

        const { nowYear, nowMonth, nowDay }  = Controller.getDateInfo()

        const time      = showStart.split(':').map((value : string) : number => (parseInt(value)))
        const startTime = new Date(nowYear, nowMonth, nowDay, time[0], time[1])
        const runtime   = ShowsController.getShowRuntime(show) 

        if (! runtime) {
            return (new Date(0))
        }

        const showEnd = (+(startTime) + (runtime * 60 * 1000))

        return (new Date(showEnd))

    }

    static getShowEndTime (show : Show) : string
    {
        const showEnd       = ShowsController.getShowEnd(show)
        const showEndString = `${`${showEnd.getHours()}`.padStart(2, '0')}:${`${showEnd.getMinutes()}`.padStart(2, '0')}`

        return (showEndString)
    }
    
    static getShowRuntime (show : Show) : number
    {

        const showRuntime =     show?.runtime        || show?._embedded?.show?.runtime 
                            ||  show?.averageRuntime || show?._embedded?.show?.averageRuntime
                            ||  0

        // if (! showRuntime) {
        //     console.error(`Show with id = {${show.id}} has no defined runtime`)
        //     console.debug(show)
        // }

        return (showRuntime)

    }

    static getShowImage (show : Show) : string
    {

        const showImage = show?.image || show?._embedded?.show?.image || {}

        if (isShowImages(showImage)) {
            return (showImage.original || showImage?.medium || '')
        }

        // console.error(`Show with id = {${show.id}} has no defined image`)
        // console.debug(show)

        return ('')

    }

    static getShowSchedule (show : Show) : Array<string>
    {

        const showSchwedule = show?.schedule?.days || show?._embedded?.show?.schedule?.days || []

        // if (! showSchwedule.length) {
        //     console.error(`Show with id = {${show.id}} has no scheduled days`)
        //     console.log(show)
        // }

        return (showSchwedule.map((weekDay : string) => (weekDay.toLocaleLowerCase())))

    }

    static getShowSite (show : Show) : string
    {

        const showSite = show?.officialSite || ''

        // if (! showSite) {
        //     console.error(`Show with id = {${show.id}} has no official site`)
        //     console.log(show)
        // }

        return (showSite)

    }

    static getShowStartTime (show : Show) : string
    {

        const showStart = show?.airtime || show?.schedule?.time || show?._embedded?.show?.schedule?.time

        // if (! showStart) {
        //     console.error(`Show with id = {${show.id}} has no start time defined`)
        //     console.log(show)
        // }

        return (showStart || '')

    }

    static getShowStatus (show : Show) : string
    {

        let showStatus = show?.status || show?._embedded?.show?.status || ''

        // if (! showStatus) {
        //     console.error(`Show with id = {${show.id}} has no defined status`)
        // }

        if (! Object.values(ShowStatus).includes(showStatus as ShowStatus)) {
            // console.error(`Show with id = {${show.id}} an unknown status`)
            // console.log(show)
            showStatus = ShowStatus.UNKNOWN
        }

        return (showStatus)

    }

    static getShowSummary (show : Show) : string 
    {

        const showSummary = show?.summary || show?._embedded?.show?.summary || ''

        // if (! showSummary) {
        //     console.error(`Show with id = {${show.id}} has no summary`)
        //     console.log(show)
        // }

        return (showSummary)

    }

    static getShowType (show : Show) : string 
    {

        const showType = show?.type || show?._embedded?.show?.type || ''

        // if (! showType) {
        //     console.error(`Show with id = {${show.id}} has no type`)
        //     console.log(show)
        // }

        return (showType)

    }



    static filterTodayShows (shows : Array<Show>) : Array<Show>
    {

        const dayOfTheWeek = WeekDays[new Date().getUTCDay()]
        
        const todayShows = shows.filter((show : Show) =>
        {
            const showShedule = ShowsController.getShowSchedule(show)

            if (! showShedule.length) {
                return (false)
            }

            return (showShedule.includes(dayOfTheWeek))

        })

        return (todayShows)

    }

    static filterActiveShows (shows : Array<Show>) : Array<Show>
    {
        return (shows.filter((show : Show) => (ShowsController.getShowStatus(show) === ShowStatus.RUNNING)))
    }

    static filterNowAndUpcomingShows (shows : Array<Show>) : Array<Show>
    {
        
        const { now, nowTime } = ShowsController.getDateInfo()

        return (shows.filter((show : Show) => 
        {
            const showEnd = ShowsController.getShowEnd(show)

            if (! showEnd) {
                return (false)
            }

            return ((+ showEnd) >= nowTime)
        }))

    }

    static filterShowsWithStartTime (shows : Array<Show>) : Array<Show>
    {
        return (shows.filter((show : Show) => (ShowsController.getShowStartTime(show).length)))
    }



    selectListTitle (url : string)
    {
        return ((ShowsController.SearchTitles[url]) ? (ShowsController.SearchTitles[url]) : (ShowsController.SearchTitles['default']))
    }
    
    selectShows (url : string, shows : Array<Show>)
    {

        //  Direct callback mapping
        if (ShowsController.callbacks[url]) {
            return (ShowsController.callbacks[url].call(this, shows))
        }

        return (shows)

    }




    
    selectNowAndUpcomingShows (shows : Array<Show>) : Array<Show>
    {
        let selectedShows = ShowsController.filterNowAndUpcomingShows(
            ShowsController.filterTodayShows(
                 ShowsController.filterShowsWithStartTime(
                    ShowsController.filterActiveShows(shows)
                )
            )
        )

        selectedShows = selectedShows.sort(ShowsSorter)

        return (selectedShows)
    }

    selectSearchedShows (shows: Array<ShowSearchResult>) : Array<Show> {

        const normalizedShows = shows.map((showResult : ShowSearchResult) => 
        {
          const show : Show = showResult.show
          show.score = showResult.score

          return (show)
        })

        normalizedShows.sort(ShowsSearchSorter)

        return (normalizedShows)

    }

    selectTodayShows (shows : Array<Show>) : Array<Show>
    {
        const selectedShows = ShowsController.filterTodayShows(
            ShowsController.filterShowsWithStartTime(
                ShowsController.filterActiveShows(shows)
            )
        )

        selectedShows.sort(ShowsSorter)

        return (selectedShows)
    }

}



export default ShowsController
