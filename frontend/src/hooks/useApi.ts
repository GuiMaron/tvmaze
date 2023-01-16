import { useEffect, useState }  from 'react'

import { AxiosInstance, AxiosRequestConfig, AxiosResponse }   from 'axios'



type useApiProps = {
    axiosInstance           : AxiosInstance
,   url                     : string
,   slowConnectionTimeout   : number
,   requestConfig          ?: AxiosRequestConfig
}



const useApi = (config : useApiProps) : [ Array<unknown> | unknown, string, string, boolean ] =>
{

    const { axiosInstance, url, slowConnectionTimeout, requestConfig = {} } = config

    const [error,       setError]       = useState('')
    const [loading,     setLoading]     = useState(false)
    const [response,    setResponse]    = useState([] as Array<unknown>)
    const [warning,     setWarning]     = useState('')



    useEffect(() => 
    {

        const abortController = new AbortController()
        let   requestResponse       : AxiosResponse
        let   timeoutWarningTimer   : number = 0

        if (loading) {
            return
        }

        if ((! error) && (! warning)) {

            timeoutWarningTimer = window.setTimeout(() => 
            {
                window.clearTimeout(timeoutWarningTimer)
                setWarning(`Slow connection detected, the request is taking more time than expected`)
            },  slowConnectionTimeout)

        }



        const fetchData = async () => 
        {
        
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

                console.debug('MAYBE HERE')
                console.debug(requestResponse)

                if (requestResponse?.data?.status === 404) {

                    console.debug('404 esperto')
                    console.debug(requestResponse?.data)

                    setError(requestResponse?.data?.data)
                }

                

            }
            catch (exception : any) {

                const errorMessage = `${exception?.code || 'ERROR'}: ${exception?.message || 'Unknown Error'}`

                console.error(exception)
                console.debug(requestResponse)
                console.debug(errorMessage)

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
    }, [url, slowConnectionTimeout])



    return ([response, error, warning, loading])

}



export default useApi
