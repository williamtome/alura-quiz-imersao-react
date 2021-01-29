/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Logo from '../src/components/Logo';
import Button from '../src/components/Button';

const LoadingWidget = () => (
  <Widget>
    <Widget.Header>
      Carregando...
    </Widget.Header>

    <Widget.Content>
      {/* [Carregando Pergunta...] */}
      <Loader
        style={{ textAlign: 'center' }}
        type="TailSpin"
        color="#FFFFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    </Widget.Content>
  </Widget>
);

const QuestionWidget = ({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
}) => (
  <Widget>
    <Widget.Header>
      <h1>
        {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
      </h1>
    </Widget.Header>

    <img
      src={question.image}
      alt="Descrição"
      style={{
        width: '100%',
        height: '150px',
        objectFit: 'cover',
      }}
    />

    <Widget.Content>
      <h2>
        {question.title}
      </h2>
      <p>
        {question.description}
      </p>

      <form onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      >
        {question.alternatives.map((alternative, alternativeIndex) => {
          const alternativeId = `alternative__${alternativeIndex}`;
          return (
            <Widget.Topic
              htmlFor={alternativeId}
              as="label"
            >
              <input
                id={alternativeId}
                type="radio"
                name={`question__${questionIndex}`}
              />
              {alternative}
            </Widget.Topic>
          );
        })}

        <pre>
          {JSON.stringify(question.alternatives, null, 4)}
        </pre>

        <Button>
          Confirmar
        </Button>
      </form>
    </Widget.Content>
  </Widget>
);

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  /**
   * [React chama de Efeitos || Effects]
   * React.useEfect
   * Ciclo de vida de um componente:
   * nasce === didMount
   * atualiza === willUpdate
   * morre == willUnmount
   */

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  const handleSubmitQuiz = () => {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  };

  return (
    <QuizBackground backgroundImage="/marvel.png">
      <QuizContainer>
        <Logo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            onSubmit={handleSubmitQuiz}
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>Você acertou X questões. Parabéns!</div>}

      </QuizContainer>
    </QuizBackground>
  );
}
