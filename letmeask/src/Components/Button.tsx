//imports
import {ButtonHTMLAttributes} from 'react'
//Scss
import '../Styles/button.scss'
//type
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
/*
 usando ButtonHTMLAttributes<HTMLButtonElement>;
 ele traz todos os atributos do <button> de 
 de uma vez só. 
*/

//Render
export function Button(props:ButtonProps) {
    return(
        <button className="button" {...props} />        
    )
}