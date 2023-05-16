import React, { forwardRef } from "react";
import { Content, Question } from "../../interfaces";
import QuestionBlock from "./QuestionBlock";

const QuestionsBlock = (
  {
    quizItem,
    chosenAnswerItems,
    unansweredQuestionIds,
    setChosenAnswerItems,
    setUnansweredQuestionIds,
  }: {
    quizItem: Content;
    chosenAnswerItems: string[];
    unansweredQuestionIds: number[] | undefined;
    setChosenAnswerItems: Function;
    setUnansweredQuestionIds: Function;
  },
  ref: React.LegacyRef<HTMLHeadingElement> | undefined
) => {
  return (
    <>
      <h2 ref={ref} className="title-block">
        {quizItem.text}
      </h2>
      <div className="questions-container">
        {quizItem?.questions.map((question: Question, _index: number) => (
          <QuestionBlock
            key={_index}
            quizItemId={quizItem.id}
            chosenAnswerItems={chosenAnswerItems}
            question={question}
            setChosenAnswerItems={setChosenAnswerItems}
            setUnansweredQuestionIds={setUnansweredQuestionIds}
            unansweredQuestionIds={unansweredQuestionIds}
          />
        ))}
      </div>
    </>
  );
};

export default forwardRef(QuestionsBlock);
