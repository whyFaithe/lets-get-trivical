import React from "react"
import QuizBackground from "./QuizBackground"
import QuizQuestion from "./QuizQuestion"
import Header from "./Header"
import ErrorBlock from "./ErrorBlock"
import { useScreen } from "../ScreenContext";


export default function Quiz({ token, options}) {
    
    const { setScreen } = useScreen()
    const [questions, setQuestions] = React.useState([])
    const [isLocked, setLockQuestions] = React.useState(false)
    const [isCheckedObjArray, setIsChecked] = React.useState([])
    const [allCorrectIdsArray, setCorrectAns] = React.useState([])
    const [error, setError] = React.useState(null)
    
    function goBackToStart() {
        setScreen("start"); // Change the screen to "start"
    }
    async function getQuestions() {
        try {
            const baseURL = "https://opentdb.com/api.php";
            const params = new URLSearchParams({
            amount: 5,
            type: "multiple",
            token: token,
            category: options.category,
            });

            // Add difficulty parameter only if it's not "all"
            if (options.difficulty !== "all") {
            params.append("difficulty", options.difficulty);
            }

            const res = await fetch(`${baseURL}?${params.toString()}`);
            
            if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const qData = await res.json();
            
            // Check if the API returned an error response
            if (qData.response_code !== 0) {
            throw new Error(`API Error: ${getAPIErrorMessage(qData.response_code)}`);
            }

            if (!qData.results || !Array.isArray(qData.results)) {
            throw new Error('Invalid data structure received from API');
            }

            const qResults = qData.results;
            const qWithRandomOptions = qResults.map((q) => {
            try {
                if (!q.correct_answer || !Array.isArray(q.incorrect_answers)) {
                throw new Error('Invalid question format');
                }

                const allAnsOptions = [q.correct_answer, ...q.incorrect_answers];
                const shuffledOptionsWithRandom = allAnsOptions.map((ans) => ({
                ans,
                sortNum: Math.random(),
                id: crypto.randomUUID(),
                isCorrect: q.correct_answer === ans
                })).sort((a, b) => a.sortNum - b.sortNum);

                return {
                ...q,
                shuffledAnsOptions: shuffledOptionsWithRandom
                };
            } catch (error) {
                console.error('Error processing question:', error);
                return null;
            }
            }).filter(Boolean); // Remove any null entries from failed processing

            if (qWithRandomOptions.length === 0) {
            throw new Error('No valid questions could be processed');
            }

            setQuestions(qWithRandomOptions);
        } catch (error) {
            console.error('Error fetching questions:', error);
            // Handle the error appropriately - you might want to set an error state
            setError(error.message);
            setQuestions([]); // Clear questions on error
        }
    }

    

    React.useEffect(() => {
        getQuestions();
    }, []);
    
    React.useEffect(() => {
        const correctAnswerIds = questions.map(q =>
            q.shuffledAnsOptions
            .find(ans => ans.isCorrect).id
        )
       setCorrectAns(correctAnswerIds)
    }, [questions])
    
    
    function handleChange(event,qNum){ 
        setIsChecked(prev => {
        const filteredPrev = prev.filter(item => item.qNum !== qNum);
        return [
            ...filteredPrev,
            { qNum: qNum, id: event.target.id }
        ]
        })
    }
    
    function checkAnswers(){
        setLockQuestions(true)  
    }
    
    function resetGame(){
        setLockQuestions(false)
        setCorrectAns([])
        setIsChecked([])
        getQuestions()
    }
    
    const questionArray = questions.map((obj, index) => {
        const currentChecked = isCheckedObjArray.find(option => option.qNum === index+1) 
        return(
            <QuizQuestion 
                key={crypto.randomUUID()}
                qNum={index+1}
                question={obj.question}
                correctAns={obj.correct_answer}
                incorrectAns={obj.incorrect_answers}
                allShuffledAns={obj.shuffledAnsOptions}
                isLocked={isLocked}
                isChecked={currentChecked? currentChecked.id : ""}
                handleChange={(event)=>handleChange(event,index+1)}
            />
        )
    })
    const correctMatches = isCheckedObjArray.filter(obj => allCorrectIdsArray.includes(obj.id))
    const lastWordElement = options.categoryName.split(':').at(-1);
    
    
    return (
        <div className="quiz">
            <QuizBackground screen="quiz" />
            <Header/>
            {!error ? (
                <>
                    <div className="quiz-title">
                        <h1>Your Custom <span>{lastWordElement}</span> Quiz 😏</h1>
                        <h2 className={`difficulty-pill pill-${options.difficulty}`}>{options.difficulty}</h2>
                    </div>
                    <div className="question-container">
                        {questionArray}
                    </div>
                    
                    {!isLocked ? (
                        <div className="btn-container">
                            <button 
                                className="btn-check-answers" 
                                disabled={questions.length !== isCheckedObjArray.length} 
                                onClick={checkAnswers}
                            >
                                Check Answers
                            </button>
                        </div>
                    ) : (
                        <div className="btn-container">
                            <h3>You scored {correctMatches.length}/{allCorrectIdsArray.length} correct answers</h3> 
                            <button className="btn-new-quiz" onClick={resetGame}>Play Again</button>
                        </div>
                    )}
                </>
            ) : (
                <ErrorBlock>{error}</ErrorBlock>
            )}
        </div>
    );

}