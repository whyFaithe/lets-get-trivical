import React, { useEffect, useState } from "react";
import QuizStartScreen from "./components/QuizStartScreen";
import Quiz from "./components/Quiz";
import { useScreen } from "./ScreenContext";

export default function App() {
  const {screen, setScreen} = useScreen()
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState([]);
  const [quizOptions, setQuizOptions] = useState({ category: "", categoryTitle: "", difficulty: "" });

  useEffect(() => {
    async function fetchTokenAndCategories() {
      try {
        const tokenResponse = await fetch("https://opentdb.com/api_token.php?command=request");
        const tokenData = await tokenResponse.json();
        setToken(tokenData.token);

        const categoriesResponse = await fetch("https://opentdb.com/api_category.php");
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.trivia_categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTokenAndCategories();
  }, []);

  function goToQuiz(options) {
    setQuizOptions(options);
    setScreen("quiz");
  }

  return (
    <main>
      {screen === "start" ? (
        <QuizStartScreen onClick={goToQuiz} categories={categories} />
      ) : (
        <Quiz token={token} options={quizOptions} setScreen={setScreen} />
      )}
    </main>
  );
}
