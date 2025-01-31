import {useState, useEffect} from 'react';
import { getNews } from '../../api/external';

// useState
//A React hook that allows you to add state management to a functional component. It returns an array with two values:
//The current state.
//A function to update that state.

//useEffect
// Another React hook used for side effects like fetching data, updating the DOM, or subscribing to events. It runs after the component renders.

import styles from './Home.module.css';
import Loader from '../../components/Loader/Loader';

function Home () {
    const [articles, setArticles] = useState([]);

    useEffect(()=>{
        (async function newsApiCall() {
            const response = await getNews();
            setArticles(response);
        })(); // IIF function defined and called immediately

        // cleanup function
        setArticles([]);
        
    },[]);

    const handleCardClick = (url) => {
        window.open(url, "_blank");  // open in new tab
    };
if (articles.length === 0) {
    return <Loader text="homepage"/>
}
    return (
        <>
        <div className={styles.header}> Latest Articles </div>
        <div className={styles.grid}> 
            {articles.map((article) => (
            <div className={styles.card}
             key={article.url}    // Here, key={article.url} ensures each article has a unique key.  React identifies elements based on their key when updating the DOM.
             onClick={()=>handleCardClick(article.url)}> 
{/* If handleCardClick requires an argument, you must pass it inside a function wrapper (() => ...), otherwise, it would execute immediately when the component renders. */}
                  <img src={article.urlToImage}/>
                  <h3>{article.title}</h3>
            </div>
        ))} 
        </div>
        </>
    )

}

 

export default Home;