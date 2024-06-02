import { useContext } from "react"
import { UserContext } from "../App"
import { Link } from "react-router-dom"
import { removeSession } from "../comman/Session"

const UserNavigationPanel = () => {
    const {userAuth: {access_token, username, profile_img, name}, setUserAuth} = useContext(UserContext)
    
    const signOutUser = () => {
        removeSession()
        setUserAuth({access_token: null})
    }
    return (
         
            
           <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">


            
            
            <Link to={`/quiz`} className="link pl-8 py-4">Attempt Quiz</Link>

            <Link to={`/dashoboard/blogs`} className="link pl-8 py-4">Dashboard</Link>

            <Link to={`/settings/edit-profile`} className="link pl-8 py-4">Settings</Link>

            <span className="absolute border-t border-grey  w-[100%]"></span>

            <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4" onClick={signOutUser}>
                <h1 className="font-bold text-xl mg-1">Sign Out</h1>
                <p className="text-dark-grey">@{username}</p>
            </button>

           </div>
       
    )
}

export default UserNavigationPanel