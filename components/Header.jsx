import React from "react"
import { useScreen } from "../ScreenContext";


 
export default function Header({token}){
    const { setScreen } = useScreen()
     
    async function resetToken(){
        const res = await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`);
        setScreen("start")
    }
    return(
        <div className="header">
            <div className="logo">
                Let's Get Trivical!
            </div>
            <button className="reset-token-btn" onClick={resetToken}>
                <span id="reset-icon" ><i className="fa-solid fa-trash"></i></span>
                Clear History
            </button>
        </div>
    )
}