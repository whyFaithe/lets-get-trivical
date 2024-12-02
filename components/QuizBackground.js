import React from "react"

export default function QuizBackground(props){
    
    const shapePlacement = props.screen === "start"? "start": "quiz"
    
    return (
        <div className="background absolute">
            <svg className={`shape-yellow-${shapePlacement} absolute`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFBD0" d="M58.3,-55.5C71.7,-44.9,76,-22.5,76.1,0C76.1,22.5,71.9,45.1,58.5,60.5C45.1,75.9,22.5,84.2,1.9,82.2C-18.7,80.3,-37.4,68.2,-50.8,52.8C-64.2,37.4,-72.4,18.7,-74.6,-2.3C-76.9,-23.2,-73.3,-46.5,-59.9,-57C-46.5,-67.5,-23.2,-65.3,-0.4,-65C22.5,-64.6,44.9,-66,58.3,-55.5Z" transform="translate(100 100)" />
            </svg>
            <svg className={`shape-blue-${shapePlacement} absolute`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#DFEAF8" d="M53.2,-48.4C67.7,-38.6,77.6,-19.3,78,0.4C78.4,20.2,69.4,40.3,54.9,55.1C40.3,69.9,20.2,79.3,-0.8,80.1C-21.7,80.9,-43.5,73,-58.1,58.3C-72.7,43.5,-80.1,21.7,-80.3,-0.1C-80.4,-22,-73.1,-43.9,-58.5,-53.7C-43.9,-63.5,-22,-61.1,-1.3,-59.8C19.3,-58.4,38.6,-58.2,53.2,-48.4Z" transform="translate(100 100)" />
            </svg>
        </div>
    )
}