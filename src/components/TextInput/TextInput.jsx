import styles from './TextInput.module.css'
function TextInput(props){
    return(
        <div className={styles.textInputWrapper}>
            <input {...props} />
            {props.error && <p className={styles.errorMessage}>{props.errormessage}</p>} 
        </div>
    )
} // 1 && html -> html, 0 && html -> nothing (shayad)

export default TextInput;