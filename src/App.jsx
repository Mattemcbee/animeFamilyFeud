import React from 'react';
import DisplayQuestions from './QuestionDisplay'
import './App.css'
export function App(props) {
  return (
    <div className='appBackground'>
      <DisplayQuestions/>
    </div>
  );
}

// Log to console
console.log('Hello console')