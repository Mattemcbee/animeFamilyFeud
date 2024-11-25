import React from 'react';
import {TEAMS} from './TeamNamesScores'
const ScoreBox = ({ scores = [0, 0] }) => { // Default to [0, 0] if scores is undefined
  return (
    <div className="scoreBox">
      <h2 className="scoreboxTitleText">Scores</h2>
        <h2 className="scoreboxText1 text-center">{TEAMS[0].teamName}<br/>{scores[0]}</h2>
        <h2 className="scoreboxText2 text-center">{TEAMS[1].teamName}<br/> {scores[1]}</h2>
    </div>
  );
};

export default ScoreBox;
