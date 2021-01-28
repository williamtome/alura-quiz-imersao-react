/* eslint-disable react/prop-types */
import React from 'react';
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
      [Carregando Pergunta...]
    </Widget.Content>
  </Widget>
);

const QuestionWidget = ({
  question, 
  questionIndex,
  totalQuestions
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

      <form action="">
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

const questionIndex = 0;
const question = db.questions[questionIndex];
const totalQuestions = db.questions.length;

const QuizPage = () => (
  <QuizBackground backgroundImage="/marvel.png">
    <QuizContainer>
      <Logo />

      <QuestionWidget
        question={question}
        questionIndex={questionIndex}
        totalQuestions={totalQuestions}
      />

      <LoadingWidget />
    </QuizContainer>
  </QuizBackground>
);

export default QuizPage;
