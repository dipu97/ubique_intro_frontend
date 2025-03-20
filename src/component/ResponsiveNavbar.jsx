
import { Link, NavLink } from 'react-router-dom'

const ResponsiveNavbar = ({isAuthenticated,isAdminUser, username, logout}) => {
  return (
    <nav className="max-container padding-x py-6 max-md:block hidden dark:text-[#FFFFFF]">
    <ul className="flex items-center justify-center gap-6 text-[#3B3C4A] lg:flex-1 flex-col dark:text-[#FFFFFF]">

   
    { isAuthenticated ? (
            <>
            
            <li className="capitalize">
                <NavLink to={`user/profile/${username}`}>Hi, {username}</NavLink>
              </li>
              <li onClick={logout} className="cursor-pointer">Logout</li>
              <div>
              </div>
              </>
          )  :(
             <>
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          



        

     


    </ul>
  </nav>
  )
}

export default ResponsiveNavbar
