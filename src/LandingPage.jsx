import React, { useState } from 'react';
import StandardQuestion from './StandardQuestion';
import { QUESTIONS } from './QuestionList';
import { Container, Col, Row } from 'react-bootstrap';
import Sidebar from './Sidebar';
import ScoreBox from './ScoreBox'

const LandingPage = () => {

  return (
    <Container fluid className='questionFormat'>
      <h1 className='landingTitleText text-center'>Anime Family Feud</h1>
      <h1 className='landingRulesText text-center'>Family Feud but less mustaches and more neckbeards</h1>
      <h1 className='landingSubTitleText text-center' style={{marginTop:'30px'}}>Rules:</h1>
      <h1 className='landingSubTitleText text-center'>2 rounds</h1>
      <h1 className='landingRulesText text-center'>Each round consists of:</h1>
<Row className="d-flex align-items-center" style={{marginTop:'20px'}}>
        <Col xs='3'>
          <h1 className='landingSubTitleText text-center'>7 regular questions</h1>
        </Col>
        <Col xs='1' className='landingRulesBorder' />
        <Col xs='7'>
          <h1 className='landingRulesText text-start'>1 person from each team buzzes in using Discord</h1>
          <h1 className='landingRulesText text-start'>If winner gets answer right then team chooses to answer or pass</h1>
          <h1 className='landingRulesText text-start'>Each team can only answer 2 questions in a row</h1>
          <h1 className='landingRulesText text-start'>If your team guesses wrong 3 times other team gets the chance to steal</h1>

        </Col>
      </Row>
<Row className="d-flex align-items-center " style={{marginTop:'20px'}}>

        <Col xs='3'>
          <h1 className='landingSubTitleText text-center'>1 fast round</h1>
        </Col>
        <Col xs='1' className='landingRulesBorder' />

        <Col xs='7'>
          <h1 className='landingRulesText text-start'>Losing team goes first</h1>
          <h1 className='landingRulesText text-start'>Each team chooses different representative each time</h1>
          <h1 className='landingRulesText text-start'>They have 1 minute to answer 4 questions</h1>
          <h1 className='landingRulesText text-start'>Second player can't choose same answers as the same as the first </h1>

        </Col>
      </Row>

    </Container>
  );
};

export default LandingPage;
