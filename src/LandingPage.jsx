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
          <h1 className='landingRulesText text-start'>To start: 1 person from each team buzzes in using Discord</h1>
          <h1 className='landingRulesText text-start'>Winner of the buzz in give one answer with no help from their team</h1>
          <h1 className='landingRulesText text-start'>If winner of the buzz in gets an answer on the board then their team chooses to answer or pass (based on how they think they'll do with the question)</h1>
          <h1 className='landingRulesText text-start'>Each team can only answer 2 questions in a row (if they win buzz 3rd time it automatically passes after they give their one answer)</h1>
          <h1 className='landingRulesText text-start'>Team goes down the line giving answers (you can talk to your team)</h1>
          {/* avg 20 answers/question */}
          <h1 className='landingRulesText text-start'>If your team guesses wrong answers 3 times then other team gets one answer to try and steal</h1>

        </Col>
      </Row>
<Row className="d-flex align-items-center " style={{marginTop:'20px'}}>

        <Col xs='3'>
          <h1 className='landingSubTitleText text-center'>1 fast round</h1>
        </Col>
        <Col xs='1' className='landingRulesBorder' />

        <Col xs='7'>
          <h1 className='landingRulesText text-start'>Losing team goes first</h1>
          <h1 className='landingRulesText text-start'>Each team chooses a representative (can't be same person both times)</h1>
          <h1 className='landingRulesText text-start'>The one player will have 1 minute to answer 4 questions with no help</h1>
          <h1 className='landingRulesText text-start'>Then player from 2nd team goes, they can't choose same answers as the the first team</h1>

        </Col>
      </Row>

    </Container>
  );
};

export default LandingPage;
