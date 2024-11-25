import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import ScoreBox from './ScoreBox'; // Import ScoreBox
import { TEAMS } from './TeamNamesScores'; // Import team data

const StandardQuestion = ({ question, teamScores, setTeamScores }) => {
  const [visibleStats, setVisibleStats] = useState({});
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [visibleQuestions, setVisibleQuestions] = useState({});
  const [clickCount, setClickCount] = useState({});
  const [clickedTeams, setClickedTeams] = useState({});
  const [answerPercentages, setAnswerPercentages] = useState({}); // Store percentages

  useEffect(() => {
    if (question && question.answers) {
      const totalPoints = question.answers.reduce(
        (sum, answer) => sum + answer.points,
        0
      );
  
      // Calculate percentages for each answer
      const percentages = question.answers.reduce((acc, answer) => {
        acc[answer.id] = totalPoints > 0 
          ? ((answer.points / totalPoints) * 100).toFixed(1) 
          : 0; // Avoid division by zero
        return acc;
      }, {});
  
      setAnswerPercentages(percentages);
    }
  
    // Handling fast round question type
    if (question.type === 'fast' && question.questions) {
      question.questions.forEach((subQuestion) => {
        const totalPoints = subQuestion.answers.reduce(
          (sum, answer) => sum + answer.points,
          0
        );
  
        const percentages = subQuestion.answers.reduce((acc, answer) => {
          acc[answer.id] = totalPoints > 0 
            ? ((answer.points / totalPoints) * 100).toFixed(1) 
            : 0;
          return acc;
        }, {});
  
        setAnswerPercentages((prevPercentages) => ({
          ...prevPercentages,
          ...percentages,
        }));
      });
    }
  }, [question]);
  
  const toggleVisibility = (id) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
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
      [id]: !prev[id],
    }));
  };

  const handleScoreClick = (teamId, points, answerId, e) => {
    e.stopPropagation();
    setTeamScores((prevScores) => {
      const updatedScores = { ...prevScores };
      const currentClickCount = clickCount[answerId]?.[teamId] || 0;
      const isAddingPoints = currentClickCount % 2 === 0;

      updatedScores[teamId] = isAddingPoints
      ? prevScores[teamId] + Number(answerPercentages[answerId])
      : prevScores[teamId] - Number(answerPercentages[answerId]);
  
      return updatedScores;
    });

    setClickCount((prev) => {
      const updatedClickCount = { ...prev };
      updatedClickCount[answerId] = {
        ...updatedClickCount[answerId],
        [teamId]: (updatedClickCount[answerId]?.[teamId] || 0) + 1,
      };
      return updatedClickCount;
    });

    setClickedTeams((prevClickedTeams) => ({
      ...prevClickedTeams,
      [answerId]: prevClickedTeams[answerId] === teamId ? null : teamId,
    }));
  };

  return (
    <>
      {question.type === 'standard' && (
        <Container fluid className="questionFormat">
          <h1 className="questionCountText">Question {question.id + 1}</h1>
          <Container fluid className="cardBackground">
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

            <Row>
              {question.answers.map((answer) => (
                <Col xs={6} key={answer.id}>
                  <Container
                    fluid
                    className="answerBackground"
                    onClick={() => toggleVisibility(answer.id)}
                    style={{ cursor: 'pointer' }}
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
                      <Col xs={2}>
                        {visibleAnswers[answer.id] && (
                          <h1 className="scoreNumberText">
                            {parseFloat(answerPercentages[answer.id]).toFixed(0)}
                          </h1>
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
                                handleScoreClick(
                                  0,
                                  answer.points,
                                  answer.id,
                                  e
                                )
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
                                handleScoreClick(
                                  1,
                                  answer.points,
                                  answer.id,
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
              ))}
            </Row>
          </Container>
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
                      <Col xs={4} key={uniqueAnswerId}>
                        <Container
                          fluid
                          className="answerBackground"
                          onClick={() => toggleVisibility(uniqueAnswerId)}
                          style={{ cursor: 'pointer' }}
                        >
                          <Row>
                            <Col xs={2}>
                              <h1 className="questionNumberText">                            {parseFloat(answerPercentages[answer.id]).toFixed(0)}
                              </h1>
                            </Col>
                            <Col xs={6}>
                              {visibleAnswers[uniqueAnswerId] && (
                                <h2 className="answerNumberText">{answer.answer}</h2>
                              )}
                            </Col>
                            <Col xs={2}>
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
