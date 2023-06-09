import React, { useState, useEffect, createRef } from "react";
import Title from "./components/Title";
import { Content, QuizData } from "../interfaces";
import QuestionsBlock from "./components/QuestionsBlock";
import AnswerBlock from "./components/AnswerBlock";

const App = () => {
  const [quiz, setQuiz] = useState<QuizData | null>();
  const [chosenAnswerItems, setChosenAnswerItems] = useState<string[]>([]);
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<
    number[] | undefined
  >([]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  type ReduceType = {
    id?: {};
  };

  const refs = unansweredQuestionIds?.reduce<ReduceType | any>((acc, id) => {
    acc[id as unknown as keyof ReduceType] = createRef<HTMLDivElement | null>();
    return acc;
  }, {});

  const answerRef = createRef<HTMLDivElement | null>();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/quiz-item");
      const json = await response.json();
      setQuiz(json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unansweredIds = quiz?.content?.map(({ id }: Content) => id);
    setUnansweredQuestionIds(unansweredIds);
  }, [quiz]);

  console.log(unansweredQuestionIds);

  useEffect(() => {
    if (chosenAnswerItems.length > 0 && unansweredQuestionIds) {
      if (showAnswer && answerRef.current) {
        answerRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
        setShowAnswer(true);
      } else {
        const highestId = Math.min(...unansweredQuestionIds)
        refs[highestId].current.scrollIntoView({behavior: 'smooth'})
      }
    }
  }, [
    unansweredQuestionIds,
    chosenAnswerItems.length,
    showAnswer,
    answerRef.current,
    refs,
  ]);

  return (
    <div className="app">
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      {refs &&
        quiz?.content.map((content: Content) => (
          <QuestionsBlock
            key={content.id}
            quizItem={content}
            chosenAnswerItems={chosenAnswerItems}
            setChosenAnswerItems={setChosenAnswerItems}
            setUnansweredQuestionIds={setUnansweredQuestionIds}
            unansweredQuestionIds={unansweredQuestionIds}
            ref={refs[content.id]}
          />
        ))}
      {showAnswer && (
        <AnswerBlock
          answerOptions={quiz?.answers}
          chosenAnswers={chosenAnswerItems}
          ref={answerRef}
        />
      )}
    </div>
  );
};

export default App;
