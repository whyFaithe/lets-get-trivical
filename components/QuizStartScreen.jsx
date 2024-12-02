import React, { useState } from "react";
import QuizBackground from "./QuizBackground";

export default function QuizStartScreen({ onClick, categories }) {
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  function handleStartQuiz() {
    if (selectedCategory && selectedDifficulty) {
      onClick({ category: selectedCategory, categoryName: selectedCategoryName, difficulty: selectedDifficulty });
    } else {
      alert("Please select both category and difficulty level.");
    }
  }

  return (
    <div className="quiz">
      <QuizBackground screen="start" />

      <div className="start-screen-card">
        <h1 className="logo">Let's Get Trivical!</h1>
        <h2>Trivia for everyone 😊</h2>

        <div className="dropdowns">
          <label>
            Select a Category:
            <select
                value={selectedCategory}
                onChange={(e) => {
                    const selectedId = e.target.value; // Get the selected value (ID)
                    const foundCategory = categories.find((category) => category.id.toString() === selectedId);
                    const selectedName = foundCategory ? foundCategory.name : "";
                    setSelectedCategory(selectedId); // Set the ID
                    setSelectedCategoryName(selectedName); // Set the name
                }}
                >
                <option value="">--</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                    {category.name}
                    </option>
                ))}
            </select>

          </label>

          <label>
            Select Difficulty Level:
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="">--</option>
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            </label>
        </div>{/*Dropdown*/}

        <button className="btn-start-quiz" onClick={handleStartQuiz}>
          Start quiz
        </button>
      </div>{/*start screen*/}
    </div>
  );
}
