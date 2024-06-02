import React, { useState } from 'react';

const Question = ({ question, options, handleAnswerOptionClick, qnum }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="p-[40px]">
      <span>{qnum}.</span><div className="question-text text-2xl">{question}</div>
      <div className="answer-section">
        {options.map((option, index) => (
          <div className='flex gap-2 pt-[20px] border w-[350px] p-10 m-6 hover:opacity-60'  key={index}>
            <input 
              type="radio" 
              id={option} 
              name="select" 
              className='pt-2'
              value={option} 
              checked={selectedOption === option} 
              onChange={handleOptionChange}
            />
            <label htmlFor={option}>
              {option}
            </label>
          </div>
        ))}
        <div className="pt-[20px]">
          <button 
            onClick={() => handleAnswerOptionClick(selectedOption)}
            disabled={!selectedOption} // Disable button if no option is selected
            className='btn-dark '
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
