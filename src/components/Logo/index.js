import React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  text-align: center;
`;

const Logo = () => (
  <LogoWrapper>
    <img src="/logoAlura.png" alt="AluraQuiz" />
  </LogoWrapper>
);

export default Logo;
