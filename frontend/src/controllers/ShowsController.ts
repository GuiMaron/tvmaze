import ENV from '../ENV'

import Controller, { ControllerProps } from './Controller'

import { Show } from '../models/Show'



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



export function ShowsSorter (showA : Show, showB : Show) : number
{

    //  Firts rule: earliest timestamp
    const [airstampA, airstampB] = [+ new Date(ShowsController.getShowAirStamp(showA)),  + new Date(ShowsController.getShowAirStamp(showB))]

    if (airstampA > airstampB) {
        return (1)
    }
    else if (airstampA < airstampB) {
        return (-1)
    }

    //  Second rule: less runtime
    const [runtimeA, runtimeB] = [ShowsController.getShowRuntime(showA),  + ShowsController.getShowRuntime(showB)]

    if (runtimeA > runtimeB) {
        return (1)
    } else if (runtimeA < runtimeB) {
        return (-1)
    }

    //  TO-DO:  Third rule (SHOULD BE IN YOUR FAVORITES)

    //  Fourth rule: name
    return (showA.name.toLocaleLowerCase().localeCompare(showB.name))

}



class ShowsController extends Controller
{

    static callbacks = {
        [ENV.URLS.FULL_SCHEDULE]:   function (shows : Array<Show>) : Array<Show> { return (this.selectNowAndUpcomingShows(shows)) }
    }

    static SearchTitles = {
        [ENV.URLS.FULL_SCHEDULE]:   'Upcoming shows today'
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

        if (! showRuntime) {
            console.error(`Show with id = {${show.id}} has no defined runtime`)
            console.debug(show)
        }

        return (showRuntime)

    }

    static getShowSchedule (show : Show) : Array<string>
    {

        const showSchwedule = show?.schedule?.days || show?._embedded?.show?.schedule?.days || []

        if (! showSchwedule.length) {
            console.error(`Show with id = {${show.id}} has no scheduled days`)
            console.log(show)
        }

        return (showSchwedule.map((weekDay : string) => (weekDay.toLocaleLowerCase())))

    }

    static getShowStartTime (show : Show) : string
    {

        const showStart = show?.airtime || show?.schedule?.time || show?._embedded?.show?.schedule?.time

        if (! showStart) {
            console.error(`Show with id = {${show.id}} has no start time defined`)
            console.log(show)
        }

        return (showStart || '')

    }

    static getShowStatus (show : Show) : string
    {

        let showStatus = show?.status || show?._embedded?.show?.status || ''

        if (! showStatus) {
            console.error(`Show with id = {${show.id}} has no defined status`)
        }

        if (! Object.values(ShowStatus).includes(showStatus as ShowStatus)) {
            console.error(`Show with id = {${show.id}} an unknown status`)
            console.log(show)
            showStatus = ShowStatus.UNKNOWN
        }

        return (showStatus)

    }



    static filterTodayShows (shows : Array<Show>) : Array<Show>
    {

        // const dayOfTheWeek = WeekDays[new Date().getUTCDay()]
        
        // const todayShows = shows.filter((show : Show) =>
        // {
        //     const showShedule = ShowsController.getShowSchedule(show)

        //     if (! showShedule.length) {
        //         return (false)
        //     }

        //     return (showShedule.includes(dayOfTheWeek))

        // })

        // return (todayShows)

        const { dayStartTime, dayStart } = Controller.getDateInfo()

        const todayShows = shows.filter((show : Show) =>
        {
            const showAirDate = ShowsController.getShowAirDate(show)

            // console.debug('----------')
            // console.debug(show)
            // console.debug(showAirDate)
            // console.debug(+ showAirDate)
            // console.debug('TODAY')
            // console.debug(dayStartTime)
            // console.debug(dayStart)
            // console.debug('----------')

            return ((+ showAirDate) === (+ dayStartTime))            
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
        const selectedShows = ShowsController.filterNowAndUpcomingShows(
            ShowsController.filterTodayShows(
                 ShowsController.filterShowsWithStartTime(
                    ShowsController.filterActiveShows(shows)
                )
            )
        )

        console.clear()
        selectedShows.sort(ShowsSorter)

        return (selectedShows)
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
