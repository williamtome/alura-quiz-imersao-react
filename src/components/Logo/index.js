import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const LogoWrapper = styled.div`
  text-align: center;
`;

const Logo = () => (
  <LogoWrapper>
    <a href="/">
      <img src="/logoAlura.png" alt="AluraQuiz" />
    </a>
  </LogoWrapper>
);

export default Logo;
