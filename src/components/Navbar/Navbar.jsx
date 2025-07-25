import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';
import { useSelector } from "react-redux";
   // hook used to read state

import { signout } from "../../api/internal";
import { resetUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

function Navbar() {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.user.auth);

    const handleSignout = async () =>{
        await signout();
        dispatch(resetUser());
    }
    return (
        <>
            <nav className={styles.navbar}>
                
                <NavLink to='/'
                    className={({ isActive }) => isActive ? styles.activeStyle : styles.inActiveStyle}
                >News</NavLink>
                <NavLink to='crypto'
                    className={({ isActive }) => isActive ? styles.activeStyle : styles.inActiveStyle}        //The value of isActive in the NavLink component from react-router-dom is determined internally by React Router.
                >Coins</NavLink>
                <NavLink to='blogs' className={({ isActive }) => isActive ? styles.activeStyle : styles.inActiveStyle}
                >Blogs</NavLink>
                
                {
                    isAuthenticated ? <div><NavLink><button className={styles.signOutButton} onClick={handleSignout}>Signout</button></NavLink></div>:
                <div>
                <NavLink to='signup' className={({ isActive }) => isActive ? styles.activeStyle : styles.inActiveStyle}
                ><button className={styles.signUpButton}>Sign Up</button></NavLink>
                  </div>
    }
            </nav>
            <div className={styles.separator}></div>
        </>
    );

}

export default Navbar;