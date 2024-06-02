// import React, { useState } from 'react';
// import Question from './Question';
// import ShowChart from './ShowChart';

const quizData = [
    {
      question: "What is the recommended amount of daily physical activity for teenagers?",
      options: ["30 minutes", "60 minutes", "90 minutes", "120 minutes"],
      answer: "60 minutes"
    },
    {
      question: "Which of the following is a common sign of mental health issues in youth?",
      options: ["Increased energy and hyperactivity", "Loss of interest in favorite activities", "Improved academic performance", "Heightened social interaction"],
      answer: "Loss of interest in favorite activities"
    },
    {
      question: "What nutrient is essential for building and repairing muscles in young people?",
      options: ["Carbohydrates", "Fats", "Proteins", "Vitamins"],
      answer: "Proteins"
    },
    {
      question: "How many hours of sleep is recommended for teenagers per night?",
      options: ["5-6 hours", "6-7 hours", "7-8 hours", "8-10 hours"],
      answer: "8-10 hours"
    },
    {
      question: "Which vitamin is primarily obtained from sunlight and is crucial for bone health?",
      options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
      answer: "Vitamin D"
    },
    {
      question: "What is a healthy way for teenagers to manage stress?",
      options: ["Ignoring the stress", "Drinking caffeine", "Regular physical activity", "Eating junk food"],
      answer: "Regular physical activity"
    },
    {
      question: "Which of the following is a healthy snack option for youth?",
      options: ["Potato chips", "Candy bars", "Fresh fruit", "Soda"],
      answer: "Fresh fruit"
    },
    {
      question: "What is the recommended daily intake of fruits and vegetables for teenagers?",
      options: ["1-2 servings", "3-5 servings", "6-8 servings", "9-11 servings"],
      answer: "3-5 servings"
    },
    {
      question: "Which practice is important for maintaining good mental health?",
      options: ["Isolating oneself from friends and family", "Spending excessive time on social media", "Practicing mindfulness or meditation", "Skipping meals regularly"],
      answer: "Practicing mindfulness or meditation"
    },
    {
      question: "What is a common consequence of not getting enough sleep for teenagers?",
      options: ["Increased concentration", "Improved mood", "Decreased immune function", "Enhanced athletic performance"],
      answer: "Decreased immune function"
    }
  ];
  

//   const Quiz = () => {
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [score, setScore] = useState(0);
//     const [showScore, setShowScore] = useState(false);
  
//     const handleAnswerOptionClick = (selectedOption) => {
//         const correctAnswer = quizData[currentQuestionIndex].answer;
//         if (selectedOption === correctAnswer) {
//           // Increment score if the selected option is correct
//           setScore(score + 1); // Ensure that score updates correctly
//         }
      
//         const nextQuestionIndex = currentQuestionIndex + 1;
//         if (nextQuestionIndex < quizData.length) {
//           setCurrentQuestionIndex(nextQuestionIndex);
//         } else {
//           setShowScore(true);
//         }
//       };
      
  
//     return (
//       <div className="app pl-[15%]">
//         <h1 className='text-3xl underline pt-[25px] pl-[25px]'>Quiz</h1>
//         {showScore ? (
//           <div className="p-6 text-2xl">
//             <h1>You scored {score} out of {quizData.length}</h1>
//             <ShowChart />
//           </div>
//         ) : (
//           <Question
//             question={quizData[currentQuestionIndex].question}
//             options={quizData[currentQuestionIndex].options}
//             handleAnswerOptionClick={handleAnswerOptionClick}
//             qnum={currentQuestionIndex + 1}
//           />
//         )}
//       </div>
//     );
//   };



import React, { useState } from 'react';
import Question from './Question';
import LineChart from './LineChart'; // Import LineChart component



const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [chartData, setChartData] = useState({}); // State for chart data
    const [userResponses, setUserResponses] = useState([]);

    
    const handleAnswerOptionClick = (selectedOption) => {
        setUserResponses([...userResponses, selectedOption]);
        const correctAnswer = quizData[currentQuestionIndex].answer;
        if (selectedOption === correctAnswer) {
            setScore(score + 1);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < quizData.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setShowScore(true);
            generateChartData(); // Generate chart data when quiz ends
        }
    };

    const generateChartData = () => {
        const answerCounts = {};
        
        // Count occurrences of each answer in userResponses
        userResponses.forEach((response) => {
            if (answerCounts.hasOwnProperty(response)) {
                answerCounts[response]++;
            } else {
                answerCounts[response] = 1;
            }
        });
    
        // Convert answerCounts to chartData format
        const chartData = {
            labels: Object.keys(answerCounts),
            datasets: [
                {
                    label: 'Answer Counts',
                    data: Object.values(answerCounts),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    
        setChartData(chartData);
    };
    

    return (
        <div className="app pl-[15%]">
            <h1 className='text-3xl underline pt-[25px] pl-[25px]'>Quiz</h1>
            {showScore ? (
                <div className="p-6 text-2xl">
                    <h1>You scored {score} out of {quizData.length}</h1>
                    <button className='mt-6 border border-dark-grey bg-black outline-none rounded text-white p-3'>Open Chart<i className="fi fi-rr-arrow-trend-up"></i></button>
                    {chartData && <LineChart chartData={chartData} />} {/* Render LineChart component */}
                </div>
            ) : (
                <Question
                    question={quizData[currentQuestionIndex].question}
                    options={quizData[currentQuestionIndex].options}
                    handleAnswerOptionClick={handleAnswerOptionClick}
                    qnum={currentQuestionIndex + 1}
                />
            )}
        </div>
    );
};

export default Quiz;