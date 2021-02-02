import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import Head from 'next/head';
import { useRouter } from 'next/router';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Logo from '../src/components/Logo';
import db from '../db.json';

const Home = () => {
  const router = useRouter();
  const [name, setName] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    router.push(`/quiz?name=${name}`);
  };

  const onChange = (ev) => {
    setName(ev.target.value);
  };

  return (
    <QuizBackground backgroundImage="/marvel.png">
      <QuizContainer>
        <Head>
          <title>AluraQuiz - Marvel</title>
        </Head>

        <Logo />

        <Widget>
          <Widget.Header>
            <h1>Marvel Studios</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={onSubmit}>
              <p>
                Teste os seus conhecimentos sobre o universo cinematográfico da Marvel e divirta-se!
              </p>
              <Input
                name="nomeDoUsuario"
                onChange={onChange}
                placeholder="DIz aí o seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>

          <Widget.Header>
            <h1>Quiz da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            Links dos quizes
          </Widget.Content>

        </Widget>

        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/williamtome" />
    </QuizBackground>
  );
};

export default Home;
