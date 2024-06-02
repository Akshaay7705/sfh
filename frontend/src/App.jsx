import {  Route, Routes } from "react-router-dom"
import Navbar from "./component/navbar.component"
import { createContext, useEffect, useState } from "react";
import { getSession } from "./comman/Session";
import Auth from "./pages/UserAuth";
import Quiz from "./pages/Quiz";


export const UserContext = createContext({})
const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() =>{
      
      let userInSession = getSession()
      userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null})
  }, [])

  return (
    <UserContext.Provider value={{userAuth, setUserAuth}}>
    <Routes >
      <Route path="/" element={<Navbar />}>
      <Route path="signin" element={<Auth type="sign-in"/>} />
      <Route path="signup" element={<Auth type="sign-up"/>} />
      <Route path="quiz" element={<Quiz />} />
      </Route>
    </Routes>
    </UserContext.Provider>

  )
}

export default App
