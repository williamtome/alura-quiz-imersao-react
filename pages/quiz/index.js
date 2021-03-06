/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import Logo from '../../src/components/Logo';
import Button from '../../src/components/Button';

const ResultWidget = ({
  results,
}) => {
  const totalAssertions = results.reduce((somatorio, currentResult) => {
    const isAcerto = currentResult === true;
    return isAcerto ? somatorio + 1 : somatorio;
  }, 0);

  return (
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {totalAssertions}
          {' '}
          questões. Parabéns!
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`results__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
};

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

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const isCorrect = selectedAlternative === question.answer;
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
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

        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                htmlFor={alternativeId}
                key={alternativeId}
                as="label"
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  type="radio"
                  name={`question__${questionIndex}`}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question.alternatives, null, 4)}
          </pre> */}

          <Button
            type="submit"
            disabled={!hasAlternativeSelected}
          >
            Confirmar
          </Button>
          {/* <p>Alternativa escolhida: {`${selectedAlternative}`}</p> */}
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}

          {isQuestionSubmited && !isCorrect && <p>{`Errrooouuuu! A alternativa certa é ${question.answer}`}</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  const addResult = (result) => {
    setResults([
      ...results,
      result,
    ]);
  };

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
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}

      </QuizContainer>
    </QuizBackground>
  );
}
