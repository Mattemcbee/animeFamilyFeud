import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import ScoreBox from './ScoreBox'; // Import ScoreBox
import { TEAMS } from './TeamNamesScores'; // Import team data

const StandardQuestion = ({ question, teamScores, setTeamScores }) => {
  const [visibleStats, setVisibleStats] = useState({});
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [visibleQuestions, setVisibleQuestions] = useState({});
  const [clickCount, setClickCount] = useState({}); // Track click count for each answer and team
  const [clickedTeams, setClickedTeams] = useState({}); // Track clicked team for each answer
  const [xStates, setXStates] = useState([false, false, false]); // Track the clicked state of each X

  const toggleVisibility = (id) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle visibility for the clicked answer
    }));
  };

  const toggleQuestionVisibility = (id) => {
    setVisibleQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleStatsVisibility = (id) => {
    setVisibleStats((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle visibility for stats
    }));
  };

  const handleScoreClick = (teamId, points, answerId, e) => {
    e.stopPropagation(); // Prevent toggling visibility when clicking on the team button

    setTeamScores((prevScores) => {
      const updatedScores = { ...prevScores };

      // Track click count for the team and answer separately
      const currentClickCount = clickCount[answerId]?.[teamId] || 0;

      // Determine whether to add or subtract points
      const isAddingPoints = currentClickCount % 2 === 0; // Even click counts add points, odd counts subtract points

      if (isAddingPoints) {
        updatedScores[teamId] = prevScores[teamId] + points; // Add points for the current team
      } else {
        updatedScores[teamId] = prevScores[teamId] - points; // Subtract points for the current team
      }

      return updatedScores;
    });

    // Update the click count for the team and answer
    setClickCount((prev) => {
      const updatedClickCount = { ...prev };
      updatedClickCount[answerId] = {
        ...updatedClickCount[answerId],
        [teamId]: (updatedClickCount[answerId]?.[teamId] || 0) + 1, // Increment click count for the team and answer
      };
      return updatedClickCount;
    });

    // Update the clicked team for the specific answer
    setClickedTeams((prevClickedTeams) => ({
      ...prevClickedTeams,
      [answerId]: prevClickedTeams[answerId] === teamId ? null : teamId, // Toggle red for the specific answer
    }));
  };
  const handleXClick = (index) => {
    setXStates((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index]; // Toggle the clicked state
      return updatedStates;
    });
  };

  // Debugging useEffect to check score updates
  useEffect(() => {
    console.log('Updated teamScores: ', teamScores);
  }, [teamScores]); // This will log the teamScores each time they change

const totalAnswers= question.allStats

  return (
    <>
      {question.type === 'standard' && (
        <Container fluid className="questionFormat">
          <h1 className="questionCountText">Question {question.id + 1}</h1>
          <Container fluid className="cardBackground">
            {/* Question Title */}
            <Row>
              <Container
                className="hiddenQuestionBackground"
                onClick={() => toggleQuestionVisibility(question.id)}
                style={{ width: '97%' }}
              >
                {visibleQuestions[question.id] && (
                  <h1 className="questionTitleText">{question.question}</h1>
                )}
              </Container>
            </Row>

            {/* Answer List */}
            <Row>
              {question.answers.map((answer) => (
                <Col sm={6}  xs={12}  key={answer.id}>
                  <Container
                    fluid
                    className="answerBackground"
                    onClick={() => toggleVisibility(answer.id)} // Toggle visibility on click
                    style={{ cursor: 'pointer' }} // Change cursor to indicate clickability
                  >
                    <Row>
                      <Col xs={2}>
                        <h1 className="questionNumberText">{answer.id}</h1>
                      </Col>
                      <Col xs={6}>
                        {visibleAnswers[answer.id] && (
                          <h2 className="answerNumberText">{answer.answer}</h2>
                        )}
                      </Col>
                      <Col sm={2} xs={1}>
                        {visibleAnswers[answer.id] && (
                          <h1 className="scoreNumberText">{answer.points}</h1>
                        )}
                      </Col>
                      <Col xs={1}>
                        {visibleAnswers[answer.id] && (
                          <>
                            <Container
                              fluid
                              className="team1click"
                              style={{
                                backgroundColor:
                                  clickedTeams[answer.id] === 0
                                    ? '#77DD77'
                                    : '',
                              }}
                              onClick={(e) =>
                                handleScoreClick(0, answer.points, answer.id, e)
                              }
                            />
                            <Container
                              fluid
                              className="team2click"
                              style={{
                                backgroundColor:
                                  clickedTeams[answer.id] === 1
                                    ? '#77DD77'
                                    : '',
                              }}
                              onClick={(e) =>
                                handleScoreClick(1, answer.points, answer.id, e)
                              }
                            />
                          </>
                        )}
                      </Col>
                    </Row>
                  </Container>
                </Col>
              ))}
            </Row>
            <Row>
                  <Col>
                    <Container
                      className={`redX ${xStates[0] ? 'red' : 'black'} text-center`}
                      onClick={() => handleXClick(0)}
                      fluid
                    >
                      X
                    </Container>
                    <Container
                      className={`redX ${xStates[1] ? 'red' : 'black'}`}
                      onClick={() => handleXClick(1)}
                    >
                      X
                    </Container>
                    <Container
                      className={`redX ${xStates[2] ? 'red' : 'black'}`}
                      onClick={() => handleXClick(2)}
                    >
                      X
                    </Container>
                  </Col>
                </Row>

          </Container>
          {visibleQuestions[question.id] && (

            <Row>
               
              <Container
                className="hiddenStatsBackground"
                onClick={() => toggleStatsVisibility(question.id)}
                style={{ width: '97%', cursor: 'pointer' }} // Add appropriate width or remove if handled via CSS
              >
               
                <h1 className="allStatsHidden">all stats</h1>
                <Row >

                  {visibleStats[question.id] && question.allStats && (
                    question.allStats.map((stat, subIndex) => (
                      <Col xs='3' key={subIndex}>
                        <h3 className="statsText">{stat}</h3>
                      </Col>
                    ))
                  )}
                  {visibleStats[question.id] && !question.allStats && (
                    <h3 className="statsText">n/a</h3>
                  )}
                </Row>
              </Container>
            </Row>
          )}
        </Container>
      )}



      {question.type === 'fast' && (
        <Container fluid className="questionFormat">
          <h1 className="questionCountText">Fast Round: Question {question.id + 1}</h1>
          <Container fluid className="cardBackground">
            {/* Loop through the questions in the fast round */}
            {question.questions.map((subQuestion, subIndex) => (
              <Container key={subIndex} fluid>
                {/* Question Title */}
                <Row>
                  <Container
                    className="hiddenQuestionBackground"
                    onClick={() => toggleQuestionVisibility(subQuestion.id)}
                    style={{ width: '97%', marginTop: '15px' }}
                  >
                    {visibleQuestions[subQuestion.id] && (
                      <h1 className="questionTitleText">{subQuestion.question}</h1>
                    )}
                  </Container>
                </Row>

                {/* Answer List */}
                <Row>
                  {subQuestion.answers.map((answer) => {
                    // Create a unique ID for the answer using subIndex and answer.id
                    const uniqueAnswerId = `${subIndex}-${answer.id}`;

                    return (
                      <Col sm={6}  xs={12}  key={uniqueAnswerId}>

                        <Container
                          fluid
                          className="answerBackground"
                          onClick={() => toggleVisibility(uniqueAnswerId)}
                          style={{ cursor: 'pointer' }}
                        >
                          <Row>
                            <Col xs={2}>
                              <h1 className="questionNumberText">{answer.id}</h1>
                            </Col>
                            <Col xs={6}>
                              {visibleAnswers[uniqueAnswerId] && (
                                <h2 className="answerNumberText">{answer.answer}</h2>
                              )}
                            </Col>
                            <Col sm={2} xs={1}>
                            {visibleAnswers[uniqueAnswerId] && (
                                <h1 className="scoreNumberText">{answer.points}</h1>
                              )}
                            </Col>
                            <Col xs={1}>
                              {visibleAnswers[uniqueAnswerId] && (
                                <>
                                  <Container
                                    fluid
                                    className="team1click"
                                    style={{
                                      backgroundColor:
                                        clickedTeams[uniqueAnswerId] === 0
                                          ? '#77DD77'
                                          : '',
                                    }}
                                    onClick={(e) =>
                                      handleScoreClick(
                                        0,
                                        answer.points,
                                        uniqueAnswerId,
                                        e
                                      )
                                    }
                                  />
                                  <Container
                                    fluid
                                    className="team2click"
                                    style={{
                                      backgroundColor:
                                        clickedTeams[uniqueAnswerId] === 1
                                          ? '#77DD77'
                                          : '',
                                    }}
                                    onClick={(e) =>
                                      handleScoreClick(
                                        1,
                                        answer.points,
                                        uniqueAnswerId,
                                        e
                                      )
                                    }
                                  />
                                </>
                              )}
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            ))}
          </Container>
        </Container>
      )}
    </>
  );
};

export default StandardQuestion;
