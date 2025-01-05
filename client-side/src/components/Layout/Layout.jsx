import React from 'react'
import Routers from "../../routers/Routers"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SpecialRoutes from '../../routers/SpecialRoutes'

const Layout = () => {
  // checks for a route that starts with /reset/ followed by one or more characters
  const resetRoutePattern = /^\/reset\/.+$/;
  // checks for a route that starts with /admin/ followed by one or more characters
  const adminRoutePattern = /\/admin\//;
    if (window.location.pathname === "/signin" || 
      window.location.pathname === "/signup" || 
      window.location.pathname === "/forgot" || 
      resetRoutePattern.test(window.location.pathname) ||
      adminRoutePattern.test(window.location.pathname)
      ){
    return(
      <>
        <div>
          <SpecialRoutes />
        </div>
      </>
      
    )
  }else{
    const pathname = window.location.pathname;
    const paramRegex = /^\/\w+(\/\w+)*\/(\d+)$/;
    const match = pathname.match(paramRegex);
    const id = match && match[2];
    console.log(id);
    if(id){
      return (
        <>
          <Header signed={true} id={id}/>
          <div>
              <Routers />
          </div>
          <Footer />
        </>
        )
    }else{
      return (
        <>
          <Header signed={false} />
          <div>
              <Routers />
          </div>
          <Footer />
        </>
        )
    }
   
  }
}

export default Layout