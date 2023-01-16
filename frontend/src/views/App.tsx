// import ENV from '../ENV'

import React, { Suspense, useMemo, useState }           from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'

import Loading  from './Loading'

import '../static/css/App.css'

import headerImage from '../static/img/tvm-header-logo.png'



function App () 
{

  const [error, setError]     = useState('')
  const [warning, setWarning] = useState('')

  const ShowSearch    = React.lazy(() => import('./ShowSearch'))
  const ShowDetails   = React.lazy(() => import('./ShowDetails'))

  const ErrorMessage    = React.lazy(() => import('./ErrorMessage'))
  const WarningMessage  = React.lazy(() => import('./WarningMessage'))
  


  const closeError = (event : React.MouseEvent | React.TouchEvent) => 
  {
    setError('')
  }

  const closeWarning = (event : React.MouseEvent | React.TouchEvent) => 
  {
    setWarning('')
  }



  const showSearch = useMemo(() => 
  {
    
    const onError = (message : string) =>
    {
      if (message !== error) {
        setError(message)
      }
    }

    const onWarning = (message : string) =>
    {
      if (message !== warning) {
        setWarning(message)
      }
    }

    return (<ShowSearch onError={ onError } onWarning={ onWarning } />)

  }, [error, warning])



  const showDetails = useMemo(() =>
  {

    const onError = (message : string) =>
    {
      if (message !== error) {
        setError(message)
      }
    }

    const onWarning = (message : string) =>
    {
      if (message !== warning) {
        setWarning(message)
      }
    }

    return (<ShowDetails onError={ onError } onWarning={ onWarning } />)

  }, [error, warning])



  return (
    <>
      <div className="App w3-theme-light">

      <BrowserRouter>

          <header className="App-header w3-card-2">
            <h1 className="w3-theme w3-padding w3-center">
              <Link to="/">
                <img  alt       = "TVMaze: Search Shows and People"
                      className = "w3-image"
                      role      = "logo"
                      src       = { headerImage } 
                />
              </Link>
            </h1>
          </header>

          <Suspense fallback={<Loading />}>

            { (((warning) && (warning?.length)) ? (<WarningMessage  message={ warning } close={ closeWarning } />)  : (<></>)) } 
            { (((error)   && (error?.length))   ? (<ErrorMessage    message={ error }   close={ closeError } />)    : (<></>)) }

            <Routes>
              
            <Route  element = { 
                      <Suspense fallback={ <Loading /> }>
                        {showSearch}
                      </Suspense>
                     }
                     path    = "/" 
              />

              <Route element = { 
                      <Suspense fallback={ <Loading /> }>
                        {showDetails}
                      </Suspense>
                    } 
                    path    = "/shows/:id" 
              />

              { /*  wrong urls default to search  */ }
              <Route  element={ 
                        <Suspense fallback={ <Loading /> }>
                          <Navigate to="/" replace /> 
                        </Suspense>
                      } 
                      path="/*" 
              />
               
            </Routes> 
          </Suspense>
      </BrowserRouter>

      </div>
    </>
  )

}



export default App
