import React, { useState } from 'react';
import StandardQuestion from './StandardQuestion';
import { QUESTIONS } from './QuestionList';
import { Container, Col, Row } from 'react-bootstrap';
import Sidebar from './Sidebar';
import ScoreBox from './ScoreBox'
import LandingPage from './LandingPage'


const DisplayQuestions = () => {
  const [teamScores, setTeamScores] = useState([0, 0]); // Initialize team scores

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
<LandingPage />
        {/* Main Content */}
        <Col xs={11}>
          {QUESTIONS.map((question) => (
            <div id={`question-${question.id}`} key={question.id} style={{ marginBottom: '100px' }}>
              <StandardQuestion
                question={question}
                teamScores={teamScores}
                setTeamScores={setTeamScores}
              />
            </div>
          ))}
        </Col>
                <Col xs={1}>
                      <ScoreBox scores={[teamScores[0] || 0, teamScores[1] || 0]} /> {/* Ensure default values */}
          <Sidebar questions={QUESTIONS} />

        </Col>

      </Row>
    </Container>
  );
};

export default DisplayQuestions;
