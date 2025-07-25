import {useState, useEffect} from 'react';
import Loader from '../../components/Loader/Loader';
import { getCrypto } from '../../api/external';
import styles from './Crypto.module.css';

function Crypto(){
const [data, setData] = useState([]);

useEffect(() =>{
    // IIFE: immediately invoked function expression
    (async function cryptoApiCall() {
        const response = await getCrypto();
        setData(response);
    })();
    // An IIFE is a function that is defined and executed immediately after it's created.
     // Since useEffect cannot accept an async function directly, the IIFE allows you to use await inside it for asynchronous operations.
    

    // cryptoApiCall() returns a promise, not a function.

    // Cleanup
   // setData([]);
  //  If the effect function returns another function, React treats this returned function as the cleanup function
    // The cleanup function is optional in useEffect and runs when:
//  The component unmounts.
//  Before re-running the effect if the dependency array changes.
//  Here, setData([]) resets the data state to an empty array during cleanup.
// this might not be correct , recheck
},[]);

// Dependency Array:
// [] means the effect runs only once, after the component mounts.
 if(data.length===0){
    return <Loader text="cryptocurrencies"/>
 }

const negativeStyle = {
    color: "#ea3943"
}
const positiveStyle = {
    color: "#16c784"
}

 return(
    <table className={styles.table}>
        <thead >
            <tr className={styles.head}>
                <th>#</th>
                <th>Coin</th>
                <th>Symbol</th>
                <th>Price $</th>
                <th>24h $</th>
            </tr>
        </thead>
        <tbody>
            {data.map((coin) => (
                <tr id={coin.id} className={styles.tableRow}>
                    <td>{coin.market_cap_rank}</td>
                    <td>
                        <div className={styles.logo}>
                           <img src={coin.image} width={40} height={40} /> 
                        </div>
                    </td>
                    <td><div className={styles.symbole}>{coin.symbol}</div></td>
                    <td>{coin.current_price}</td>
                    <td style={
                        coin.price_change_percentage_24h < 0 ? negativeStyle : positiveStyle
                    }>{coin.price_change_percentage_24h}</td>
                </tr>
            ))}
        </tbody>
    </table>
 );
}

export default Crypto;
