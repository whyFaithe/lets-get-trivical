import React from "react"

export default function ErrorBlock({children}){
    return(
        <div className="quiz-title">
            <h1>Hmmm... There's something wrong...</h1>
            <h2>{children}</h2>
            <p>Please try again later 😊</p>
        </div>
    )
}