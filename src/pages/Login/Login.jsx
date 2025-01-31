import {useState} from "react"
import styles from './Login.module.css'
import TextInput from "../../components/TextInput/TextInput"
import loginSchema from '../../schemas/loginSchema'
import {useFormik} from "formik"
import {login} from '../../api/internal'
import {setUser} from '../../store/userSlice'
import {useDispatch} from "react-redux" // used to write state
import { useNavigate } from 'react-router-dom'

function Login(){
   const navigate = useNavigate();
   
   const dispatch = useDispatch();

   const [error, setError]= useState("");
   const handleLogin= async () => {
      const data ={
         username: values.username,
         password: values.password
      }

      const response = await login(data);

      if(response.status === 200){
         // 1. setUser 
           const user ={
             _id: response.data.user._id,
             email: response.data.user._email,
             username: response.data.user.username,
             auth: response.data.auth
           }

           dispatch(setUser(user));

         // 2. redirect to homepage
         navigate('/')
      }
      else if (response.code === 'ERR_BAD_REQUEST'){
         // 1. display error message
          setError(response.response.data.message);
      }
   }
   const {values, touched, handleBlur, handleChange, errors} = useFormik({
initialValues: {
    username: '',
    password: '', 
},
validationSchema: loginSchema,
   });

//handleChange: When the user types, it updates values.
//handleBlur: When the user moves out of a field, it marks it as "touched".
//errors: If validation fails (e.g., if the username is empty), errors.username will contain an error message.

   return (
    <div className={styles.loginWrapper}>
        <div className={styles.loginHeader}>Log in to your account</div>
        <TextInput 
          type="text"
          value={values.username}
          name="username"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="username"
          error={errors.username && touched.username ? 1: undefined}
          errormessage={errors.username}
        />
        <TextInput 
        type="password"
        value={values.password}
        name="password"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="password"
        error={errors.password && touched.password ? 1: undefined}
        errormessage={errors.password}
        />

        <button className={styles.logInButton} onClick={handleLogin}
        disabled={
         !values.username || !values.password || errors.username || errors.password
        }
        >Log in</button>
        <span>Don't have an account? 
       
        <button className={styles.createAccount}  onClick={()=>navigate("/signup")}>Register</button></span> {/*You can't directly use onClick={navigate("/signup")} because it immediately invokes the navigate function when the component renders, rather than waiting for the onClick event to occur. */}
        {error !=="" ? <p className={styles.errorMessage}>{error}</p>: ""}
    </div>
   );
}

export default Login 