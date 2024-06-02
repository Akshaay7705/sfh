
import { Link, Outlet } from "react-router-dom"
import { UserContext } from "../App"
import { useContext, useState } from "react"
import UserNavigationPanel from "./user-navigation.component"


const Navbar = () => {

    const { userAuth :{access_token, username, profile_img, name}} = useContext(UserContext)
    const [ userNaPanel, setUserNavPanel] = useState(false)
    
    const handleUserNavPanel = () =>{
        setUserNavPanel(currentVal => !currentVal)
      }
      const handleBlur =() =>{
        setTimeout(() => {
           setUserNavPanel(false)
        },200)
      }


    return (
        <>
        
        <nav className="navbar">
         <div className="ml-[400px] flex gap-8 capitalize ">
            <Link className="text-xl pl-[10px] hover:opacity-60" to="/"> home</Link>
            <Link className="text-xl pl-[10px] hover:opacity-60" to="/"> Contact Us</Link>
            <Link className="text-xl pl-[10px] hover:opacity-60" to="/"> Testimonials</Link>
         </div>

{
    access_token ? <div className="relative pl-[250px]" onClick={handleUserNavPanel} onBlur={handleBlur}>
    <button className="w-12 h-12 mt-1">
       <img src={profile_img} className='w-full h-full object-cover rounded-full'/>
    </button>

    {
        userNaPanel?  <UserNavigationPanel /> : ""
    }
   
 </div> : <div className="pl-[200px] flex gap-6">
            
    <Link to="/signup" className="btn-dark">signup</Link>
    <Link to="/signin" className="btn-light">signin</Link>
</div>
}
         
        </nav>
       
        

        <Outlet />
        </>
    )
}

export default Navbar