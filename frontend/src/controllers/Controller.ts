type DateInfo = {
    now:            Date
    nowYear:        number
    nowMonth:       number
    nowDay:         number
    nowHour:        number
    nowMinutes:     number
    dayStart:       Date
    dayEnd:         Date
    nowTime:        number
    dayStartTime:   number
    dayEndTime:     number
}



export type ControllerProps = 
{
    onError     ?: Function
    onWarning   ?: Function
}



const Controller = class Controller 
{

    onError     : Function
    onWarning   : Function


    
    constructor (props ?: ControllerProps | null)
    {

        let { onError, onWarning } = props || {}

        if (! onError) {
            onError = () => {}
        }

        if (! onWarning) {
            onWarning = () => {}
        }

        this.onError    = onError
        this.onWarning  = onWarning

    }



    static getDateInfo () : DateInfo
    {

        let now             = new Date()
        
        const nowYear       = now.getFullYear()
        const nowMonth      = now.getMonth()
        const nowDay        = now.getDate()
        const nowHour       = now.getHours()
        const nowMinutes    = now.getMinutes()
        
        const dayStart  = new Date(nowYear, nowMonth, nowDay)
        const dayEnd    = new Date(nowYear, nowMonth, (nowDay + 1))

        const nowTime       =   (+ now)
        const dayStartTime  =   (+ dayStart)
        const dayEndTime    =   (+ dayEnd)

        const dateInfo = {
            now:            now
        ,   nowYear:        nowYear
        ,   nowMonth:       nowMonth
        ,   nowDay:         nowDay
        ,   nowHour:        nowHour
        ,   nowMinutes:     nowMinutes
        ,   dayStart:       dayStart
        ,   dayEnd:         dayEnd
        ,   nowTime:        nowTime
        ,   dayStartTime:   dayStartTime
        ,   dayEndTime:     dayEndTime
        }

        return (dateInfo)

    }

}



export default Controller
