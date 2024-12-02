import React from "react"
import {encode, decode} from "html-encoder-decoder"
export default function QuizQuestion(prop){
    
    const uniqueQuestionName = `question${prop.qNum}`
    const shuffledOptionElements = prop.allShuffledAns.map(obj => {
        let answerStyle = ""
          
        if(prop.isLocked){
            if(obj.isCorrect && prop.isLocked){
                answerStyle = "correct"
            }else if(prop.isChecked === obj.id  && !obj.isCorrect){
                answerStyle = "incorrect"
            }
        }else if (prop.isChecked === obj.id){
            answerStyle = "checked"
        }
    
      
        return (
            <React.Fragment key={obj.id}>
                <input  className={answerStyle} type="radio" id={obj.id} name={uniqueQuestionName} disabled={prop.isLocked} checked={prop.isChecked === obj.id} onChange={prop.handleChange}/>
                <label htmlFor={obj.id}>
                    {decode(obj.ans)}
                </label>
            </React.Fragment>
        )
    })

    return (
        <div className="quiz-question">
            <h2 className="quiz-number">{prop.qNum}</h2>
            <div className="quiz-block">
                <h3>{decode(prop.question)}</h3>
                <div className="quiz-options">
                    {shuffledOptionElements}
                </div>
            </div>
        </div>
    )
}