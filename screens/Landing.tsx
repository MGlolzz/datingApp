import React, { memo } from 'react';
import LandingBackground from '../components/LandingBackground';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { Navigation } from '../type';


type Props = {
  navigation: Navigation;
};

const Landing = ({ navigation }: Props) => (
  <LandingBackground>
    <Logo />
    <Header>Welcome to AILove</Header>

    <Paragraph>
      The smartest AI to find your soulmate.
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('Login')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('SignUp')}
    >
      Sign Up
    </Button>
  </LandingBackground>
);

export default Landing;