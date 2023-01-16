import { useEffect, useState }  from 'react'

import { AxiosInstance, AxiosRequestConfig, AxiosResponse }   from 'axios'



type useApiProps = {
    axiosInstance           : AxiosInstance
,   url                     : string
,   slowConnectionTimeout   : number
,   requestConfig          ?: AxiosRequestConfig
}



const useApi = (config : useApiProps) : [ Array<unknown> | unknown, string, string, boolean, Function] =>
{

    const { axiosInstance, url, slowConnectionTimeout, requestConfig = {} } = config

    const [error,       setError]       = useState('')
    const [loading,     setLoading]     = useState(false)
    const [response,    setResponse]    = useState([] as Array<unknown>)
    const [warning,     setWarning]     = useState('')
    const [reload,      setReload]      = useState(0)



    const refresh = (() => (setReload((previous : number) => (previous + 1))))



    useEffect(() => 
    {

        console.debug('using api')

        const abortController = new AbortController()
        let   requestResponse       : AxiosResponse
        let   timeoutWarningTimer   : number = 0

        if ((! error) && (! warning)) {

            timeoutWarningTimer = window.setTimeout(() => 
            {
                window.clearTimeout(timeoutWarningTimer)
                setWarning(`Slow connection detected, the request is taking more time than expected`)
            },  slowConnectionTimeout)

        }



        const fetchData = async () => 
        {
        
            console.debug('REFETCHING DATA')
            setLoading(true)
            
            try {

                requestResponse = await axiosInstance.get(
                    `api/${url}`
                ,   {
                        ...requestConfig
                    ,   signal:     abortController.signal
                    }
                
                )

                if (requestResponse?.data?.status === 200) {
                    setResponse(requestResponse?.data?.data)
                }


                if (requestResponse?.data?.status === 404) {
                    setError(requestResponse?.data?.data)
                }

                

            }
            catch (exception : any) {

                const errorMessage = `${exception?.code || 'ERROR'}: ${exception?.message || 'Unknown Error'}`
                setError(errorMessage)

            }
            finally {

                setLoading(false)
                window.clearTimeout(timeoutWarningTimer)

            }

            return (() => (window.clearTimeout(timeoutWarningTimer)))

        }

        fetchData()

        return (() => {
            abortController.abort()
            window.clearTimeout(timeoutWarningTimer)
        })

    // eslint-disable-next-line
    }, [reload])



    return ([response, error, warning, loading, refresh])

}



export default useApi
