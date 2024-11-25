import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = ({ questions }) => {
  // State to track the active question
  const [activeQuestionId, setActiveQuestionId] = useState(null);

  const handleClick = (id) => {
    setActiveQuestionId(id); // Update active question ID
  };

  return (
    <Nav className="flex-column sidebar">
      {questions.map((question) => (
        <Nav.Link
          key={question.id}
          href={`#question-${question.id}`} // Links to the question section by ID
          className={`sidebar-link sidebarText ${
            activeQuestionId === question.id ? 'active' : ''
          }`} // Add 'active' class if the question is active
          onClick={() => handleClick(question.id)} // Set active on click
        >
          {question.id + 1}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;
