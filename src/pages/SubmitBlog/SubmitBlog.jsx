import {useState} from 'react';
// this page could also be made with the help of formik but just for a variation to learn we are using another way.
import {submitBlog} from '../../api/internal'
import {useSelector} from 'react-redux';
import styles from './SubmitBlog.module.css';
// useSelector is used to read global state
import TextInput from '../../components/TextInput/TextInput';
import {useNavigate} from 'react-router-dom';

function SubmitBlog() {
   const navigate = useNavigate(); // useNavigate() is a hook that gets called and returns a function (navigate in this case).
    // The useNavigate hook simply returns a function for navigation, and you can assign it to any variable

   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [photo, setPhoto] = useState('');

   const author = useSelector(state => state.user._id);

    
/* useSelector is a hook provided by react-redux that allows you to access data from the Redux store.
It takes a selector function as an argument. The selector function tells useSelector what part of the state you want to access. 

state => state.user._id
This is a shorthand for:
js-
function(state) {
    return state.user._id;
} */
   const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
        setPhoto(reader.result);
    };
   };
// readAsDataURL(file), which will turn the selected file (image) into a base64-encoded string that can be used directly in HTML, for example, as the src for an <img> tag
const submitHandler = async () => {
    const data = {
          author: author,
          title: title,
          content: content,
          photo: photo
    };

    const response = await submitBlog(data);

    if( response.status === 201 ){
        navigate("/");
    };
}

   return(
    <div className={styles.wrapper}>
        <div className={styles.header}>Create a blog!</div>
        <TextInput
           type="text"
           name="title"
           placeholder="Title"
           value={title}
           onChange={(e) =>setTitle(e.target.value)} 
           // The e in your code (e.g., onChange={(e) => setTitle(e.target.value)} or function getPhoto(e)) is the event object.

           // It comes from the event listener that React automatically passes to the event handler function when an event (like onChange, onClick, onSubmit, etc.) occurs.
           
           // e.target:

          // Refers to the element that triggered the event.
          // Example: In onChange={(e) => setTitle(e.target.value)}, e.target is the input field where the user typed, and e.target.value gives the current text in that input.
           style={{width: '60%'}}
        />
        <textarea
           className={styles.content}
           placeholder="your content goes here..."
           maxLength={400}
           value={content}
           onChange={(e)=> setContent(e.target.value)}
        />
        <div className={styles.photoPrompt}>
            <p>Choose a Photo</p>
            <input 
               type="file"
               name="photo"
               id="photo"
               accept='image/jpg, image/jpeg, image/png'
               onChange={getPhoto}
            />
            {photo !==''? <img src={photo} width={150} height={150} /> : ''}
        </div>
        <button className={styles.submit} onClick={submitHandler} 
         disabled={title===''|| content ==='' || photo ===''}
        >
            Submit
        </button>
    </div>
   )
}

export default SubmitBlog;