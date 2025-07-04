// import React, { useState, useEffect, useRef } from "react";
// import quizData from "./ExamQuestion.json";
// import { useDispatch, useSelector } from "react-redux";
// import { authenticateApi, toastmsg } from "../GlobalApi/Global";
// import axios from "axios";

// const Exam = () => {
//   // State management
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [results, setResults] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [timeOver, setTimeOver] = useState(false);
//   const [timer, setTimer] = useState(1800); // 30 minutes in seconds
//   const [timerActive, setTimerActive] = useState(false); // Start as false
//   const answersRef = useRef(null);

//   const logindata = useSelector((state) => state.doWin.userLoginData);
//   const authData = useSelector((state) => state.doWin.ApiAllData);
//   const is_examPassed = authData?.data?.is_examPassed;
//   const Is_Top_Approved = authData?.data?.is_top_approved === 2;

//   const usertoken = logindata?.token;
//   const BaseURI = process.env.REACT_APP_API_BASE_URI;
//   const Theme = useSelector((state) => state.doWin.Theme);
//   const dispatch = useDispatch();
//   const exam_passed = async () => {
//     try {
//       const config = {
//         headers: {
//           "x-access-token": usertoken,
//         },
//       };

//       const response = await axios.post(
//         `${BaseURI}/user/exam_passed  `,
//         {},
//         config
//       );
//       console.log("response", response);
//       if (response.status === 200) {
//       }
//     } catch (error) {
//       console.error("Error during API call:", error);
//       toastmsg(
//         "0",
//         error?.response?.message ||
//           error?.response?.data?.message ||
//           error?.response?.data?.error
//       );
//     }
//   };

//   useEffect(() => {
//     if (!timerActive || timer <= 0) {
//       if (timer <= 0) setTimeOver(true);
//       return;
//     }

//     const interval = setInterval(() => {
//       setTimer((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timer, timerActive]);

//   // Start the quiz
//   const startQuiz = () => {
//     setQuizStarted(true);
//     setTimerActive(true);
//   };

//   const done = () => {
//     authenticateApi(usertoken, dispatch);
//   };
//   // Reset the quiz
//   const resetQuiz = () => {
//     setQuizStarted(false);
//     setCurrentIndex(0);
//     setSelectedOption(null);
//     setResults([]);
//     setShowResult(false);
//     setShowAnswers(false);
//     setTimeOver(false);
//     setTimer(1800);
//     setTimerActive(false);
//   };

//   // Handle option selection
//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//   };

//   // Handle next question
//   const handleNext = () => {
//     if (!selectedOption) return;

//     const currentQuestion = quizData[currentIndex];
//     const isCorrect = selectedOption === currentQuestion.answer;

//     setResults((prev) => [
//       ...prev,
//       {
//         index: currentIndex,
//         question: currentQuestion.question,
//         clicked: selectedOption,
//         isCorrect,
//         answer: currentQuestion.answer,
//         category: currentQuestion.category,
//       },
//     ]);

//     setSelectedOption(null);
//     setCurrentIndex((prev) => prev + 1);
//   };

//   // Handle quiz submission
//   const handleSubmit = () => {
//     if (!selectedOption) return;

//     const currentQuestion = quizData[currentIndex];
//     const isCorrect = selectedOption === currentQuestion.answer;

//     const updatedResults = [
//       ...results,
//       {
//         index: currentIndex,
//         question: currentQuestion.question,
//         clicked: selectedOption,
//         isCorrect,
//         answer: currentQuestion.answer,
//         category: currentQuestion.category,
//       },
//     ];

//     setResults(updatedResults);
//     setShowResult(true);
//     setTimerActive(false); // Stop the timer when results are shown

//     const correctCount = updatedResults.filter((r) => r.isCorrect).length;
//     const score = Math.round((correctCount / quizData.length) * 100);

//     // ✅ Call API only if score >= 50
//     if (score >= 50) {
//       exam_passed();
//     }
//   };

//   // Calculate score
//   const calculateScore = () => {
//     const correct = results.filter((r) => r.isCorrect).length;
//     return Math.round((correct / quizData.length) * 100);
//   };

//   // Format time (mm:ss)
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   // Toggle answers view
//   const toggleAnswersView = () => {
//     setShowAnswers((prev) => !prev);
//   };

//   // Current question component
//   const CurrentQuestion = () => {
//     const currentQuestion = quizData[currentIndex];

//     return (
//       <div
//         className="mb-8 w-full"
//         style={{
//           color: Theme.textcolor,
//           background: Theme.background,
//           borderColor: Theme.bordercolor,
//         }}
//       >
//         <h1
//           className="text-xl font-semibold mb-4 text-gray-800"
//           style={{
//             color: Theme.textcolor,
//             background: Theme.background,
//             borderColor: Theme.bordercolor,
//           }}
//         >
//           {currentQuestion.question}
//         </h1>
//         <div className="space-y-3">
//           {currentQuestion?.options?.map((option, i) => (
//             <Option
//               key={i}
//               option={option}
//               index={i}
//               selected={selectedOption === option}
//               onSelect={handleOptionSelect}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Option component
//   const Option = ({ option, index, selected, onSelect }) => (
//     <div
//       className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//         selected
//           ? "bg-blue-50 border-blue-300"
//           : "bg-white border-gray-200 hover:bg-gray-50"
//       }`}
//       style={{
//         color: Theme.textcolor,
//         background: Theme.background,
//         borderColor: Theme.bordercolor,
//       }}
//       onClick={() => onSelect(option)}
//     >
//       <div className="flex items-center">
//         <input
//           type="radio"
//           id={`rd_${index}`}
//           name="optRdBtn"
//           value={option}
//           checked={selected}
//           onChange={() => {}}
//           className="hidden"
//         />
//         <label
//           htmlFor={`rd_${index}`}
//           className="flex items-center cursor-pointer"
//         >
//           <span
//             className={`inline-block w-5 h-5 rounded-full border mr-3 flex-shrink-0 relative ${
//               selected ? "border-blue-500" : "border-gray-400"
//             }`}
//           >
//             {selected && (
//               <span className="absolute inset-0.5 rounded-full bg-blue-500"></span>
//             )}
//           </span>
//           <span>{option}</span>
//         </label>
//       </div>
//     </div>
//   );

//   // Result summary component
//   const ResultSummary = () => {
//     const score = calculateScore();
//     const correct = results.filter((r) => r.isCorrect).length;
//     const incorrect = results.length - correct;
//     const passed = score >= 50;
//     return (
//       <div
//         className="bg-white p-6 rounded-lg shadow-md w-full"
//         style={{
//           color: Theme.textcolor,
//           background: Theme.background,
//           borderColor: Theme.bordercolor,
//         }}
//       >
//         <div className="flex flex-col items-center mb-6">
//           <div
//             className="relative w-24 h-24 mb-1 flex justify-center items-center border-gray-300 border-4 rounded-full"
//             style={{
//               color: Theme.textcolor,
//               background: Theme.background,
//               borderColor: Theme.bordercolor,
//             }}
//           >
//             <p className="text-[1.5rem]"> {score}%</p>
//           </div>

//           <div className="text-center space-y-1">
//             <p className="text-green-600 font-semibold">Correct: {correct}</p>
//             <p className="text-red-600 font-semibold">Incorrect: {incorrect}</p>
//           </div>

//           <div
//             className={`mt-4 p-3 rounded-md text-center ${
//               passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//             }`}
//           >
//             {passed
//               ? "Congratulations! You have qualified."
//               : "You didn't qualify this time. Please try again."}
//           </div>

//           <div className="flex flex-wrap justify-center gap-3 mt-6">
//             <button
//               className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
//               onClick={toggleAnswersView}
//             >
//               {showAnswers ? "Hide Answers" : "View Answers"}
//             </button>
//             {passed && (
//               <button
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
//                 onClick={done}
//               >
//                 Done
//               </button>
//             )}
//             {!passed && (
//               <button
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
//                 onClick={resetQuiz}
//               >
//                 Try Again
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // All answers component
//   const AllAnswers = () => (
//     <div
//       ref={answersRef}
//       className="p-6 rounded-lg shadow-md max-h-[600px] overflow-auto"
//       style={{
//         color: Theme.textcolor,
//         background: Theme.background,
//         borderColor: Theme.bordercolor,
//       }}
//     >
//       <h2
//         className="text-xl font-semibold mb-4 text-black"
//         style={{
//           color: Theme.textcolor,
//           background: Theme.background,
//           borderColor: Theme.bordercolor,
//         }}
//       >
//         Your Answers
//       </h2>
//       <div className="space-y-4">
//         {results?.map((result, i) => (
//           <div
//             key={i}
//             className={`p-4 rounded-lg ${
//               result.isCorrect
//                 ? "bg-green-50 border-l-4 border-green-500"
//                 : "bg-red-50 border-l-4 border-red-500"
//             }`}
//             style={{
//               color: Theme.textcolor,
//               background: Theme.background,
//               borderColor: Theme.bordercolor,
//             }}
//           >
//             <h3 className="font-medium">{result.question}</h3>
//             <p
//               className={`mt-2 font-semibold ${
//                 result.isCorrect ? "text-green-600" : "text-red-600"
//               }`}
//               style={{
//                 color: Theme.textcolor,
//                 background: Theme.background,
//                 borderColor: Theme.bordercolor,
//               }}
//             >
//               Your answer: {result?.clicked}
//             </p>
//             {/* {!result.isCorrect && (
//               <p className="mt-1 text-green-600 font-semibold">
//                 Correct answer: {result.answer}
//               </p>
//             )} */}
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center mt-6">
//         <button
//           className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
//           style={{
//             color: Theme.textcolor,
//             background: Theme.background,
//             borderColor: Theme.bordercolor,
//           }}
//           onClick={toggleAnswersView}
//         >
//           Back to Results
//         </button>
//       </div>
//     </div>
//   );

//   // Navigation buttons component
//   const NavigationButtons = () => {
//     if (showResult || showAnswers) return null;

//     const isLastQuestion = currentIndex === quizData.length - 1;
//     const buttonText = isLastQuestion ? "Submit" : "Next";
//     const buttonColor = isLastQuestion
//       ? "bg-blue-500 hover:bg-blue-600"
//       : "bg-green-500 hover:bg-green-600";
//     const handleClick = isLastQuestion ? handleSubmit : handleNext;

//     return (
//       <div className="flex justify-end">
//         <button
//           className={`px-4 py-2 rounded text-white ${buttonColor} ${
//             !selectedOption ? "opacity-50 cursor-not-allowed" : ""
//           } transition-colors`}
//           onClick={handleClick}
//           disabled={!selectedOption}
//         >
//           {buttonText}
//         </button>
//       </div>
//     );
//   };

//   // Progress calculation - show 100% when all questions are completed
//   const progress = showResult ? 100 : (currentIndex / quizData.length) * 100;

//   {
//     is_examPassed === 0 && !quizStarted && (
//       <div
//         className="w-full mx-auto p-4 sm:p-6 bg-gray-50 rounded-xl flex flex-col items-center justify-center min-h-[300px]"
//         style={{
//           color: Theme.textcolor,
//           background: Theme.background,
//           borderColor: Theme.bordercolor,
//         }}
//       >
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">
//           Quiz Instructions
//         </h1>
//         <div
//           className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-md w-full"
//           style={{
//             color: Theme.textcolor,
//             background: Theme.background,
//             borderColor: Theme.bordercolor,
//           }}
//         >
//           <ul className="list-disc pl-5 space-y-2 text-gray-700">
//             <li>This quiz contains {quizData?.length} questions</li>
//             <li>You have 30 minutes to complete the quiz</li>
//             <li>Answer all questions to see your results</li>
//             <li>You need to score at least 50% to pass</li>
//           </ul>
//         </div>
//         <button
//           onClick={startQuiz}
//           className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
//         >
//           Start Quiz
//         </button>
//       </div>
//     );
//   }
//   return (
//     <>
//       {Is_Top_Approved && is_examPassed === 0 ? (
//         <div className="text-center text-xl text-green-600 p-6 font-semibold">
//          🌟 Great news! Your exam has been approved by the Admin.
//         </div>
//       ) : (
//         <>
//           {is_examPassed === 0 ? (
//             <div
//               className="w-full mx-auto p-4 sm:p-6 bg-gray-50 rounded-xl"
//               style={{
//                 color: Theme.textcolor,
//                 background: Theme.background,
//                 borderColor: Theme.bordercolor,
//               }}
//             >
//               {timeOver && (
//                 <div className="bg-red-100 text-red-800 p-3 text-center rounded-md mb-4 font-medium">
//                   Time's up! Your quiz has ended.
//                   <button
//                     onClick={resetQuiz}
//                     className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     Start Again
//                   </button>
//                 </div>
//               )}

//               {!timeOver && timerActive && (
//                 <div className="mb-4 text-right font-medium text-gray-700">
//                   Time Remaining: {formatTime(timer)}
//                 </div>
//               )}

//               <div className="mb-6">
//                 <progress
//                   value={progress}
//                   max="100"
//                   className="w-full h-2 rounded"
//                 ></progress>
//                 <div className="text-center text-sm text-gray-600 mt-1">
//                   {Math.round(progress)}% complete (
//                   {showResult ? quizData.length : currentIndex}/
//                   {quizData.length} questions)
//                 </div>
//               </div>

//               {!showResult && !showAnswers && <CurrentQuestion />}
//               <NavigationButtons />
//               {showResult && !showAnswers && <ResultSummary />}
//               {showAnswers && <AllAnswers />}
//             </div>
//           ) : (
//             <div className="text-center text-xl text-green-600 p-6 font-semibold">
//               You have already attempted this quiz and successfully passed.
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default Exam;

import React, { useState, useEffect, useRef } from "react";
import quizData from "./ExamQuestion.json";
import { useDispatch, useSelector } from "react-redux";
import { authenticateApi, formatAmount, toastmsg } from "../GlobalApi/Global";
import axios from "axios";

const Exam = () => {
  // State management
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [timer, setTimer] = useState(1800); // 30 minutes in seconds
  const [timerActive, setTimerActive] = useState(false); // Start as false
  const answersRef = useRef(null);

  const logindata = useSelector((state) => state.doWin.userLoginData);
  const authData = useSelector((state) => state.doWin.ApiAllData);
  const passScore = formatAmount(authData?.data?.passed_perc, 0) ?? 0;
  const is_examPassed = authData?.data?.is_examPassed;
  const Is_Top_Approved = authData?.data?.is_top_approved === 2;

  const usertoken = logindata?.token;
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const Theme = useSelector((state) => state.doWin.Theme);
  const dispatch = useDispatch();
  const exam_passed = async () => {
    try {
      const config = {
        headers: {
          "x-access-token": usertoken,
        },
      };

      const response = await axios.post(
        `${BaseURI}/user/exam_passed  `,
        {},
        config
      );
      console.log("response", response);
      if (response.status === 200) {
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toastmsg(
        "0",
        error?.response?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.error
      );
    }
  };

  useEffect(() => {
    if (!timerActive || timer <= 0) {
      if (timer <= 0) setTimeOver(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, timerActive]);

  // Start the quiz
  const startQuiz = () => {
    setQuizStarted(true);
    setTimerActive(true);
  };

  const done = () => {
    authenticateApi(usertoken, dispatch);
  };
  // Reset the quiz
  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setResults([]);
    setShowResult(false);
    setShowAnswers(false);
    setTimeOver(false);
    setTimer(1800);
    setTimerActive(false);
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Handle next question
  const handleNext = () => {
    if (!selectedOption) return;

    const currentQuestion = quizData[currentIndex];
    const isCorrect = selectedOption === currentQuestion.answer;

    setResults((prev) => [
      ...prev,
      {
        index: currentIndex,
        question: currentQuestion.question,
        clicked: selectedOption,
        isCorrect,
        answer: currentQuestion.answer,
        category: currentQuestion.category,
      },
    ]);

    setSelectedOption(null);
    setCurrentIndex((prev) => prev + 1);
  };

  // Handle quiz submission
  const handleSubmit = () => {
    if (!selectedOption) return;

    const currentQuestion = quizData[currentIndex];
    const isCorrect = selectedOption === currentQuestion.answer;

    const updatedResults = [
      ...results,
      {
        index: currentIndex,
        question: currentQuestion.question,
        clicked: selectedOption,
        isCorrect,
        answer: currentQuestion.answer,
        category: currentQuestion.category,
      },
    ];

    setResults(updatedResults);
    setShowResult(true);
    setTimerActive(false); // Stop the timer when results are shown

    const correctCount = updatedResults.filter((r) => r.isCorrect).length;
    const score = Math.round((correctCount / quizData.length) * 100);

    // ✅ Call API only if score >= 50
    if (score >= passScore) {
      exam_passed();
    }
  };

  // Calculate score
  const calculateScore = () => {
    const correct = results.filter((r) => r.isCorrect).length;
    return Math.round((correct / quizData.length) * 100);
  };

  // Format time (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Toggle answers view
  const toggleAnswersView = () => {
    setShowAnswers((prev) => !prev);
  };

  // Current question component
  const CurrentQuestion = () => {
    const currentQuestion = quizData[currentIndex];

    return (
      <div
        className="mb-8 w-full"
        style={{
          color: Theme.textcolor,
          background: Theme.background,
          borderColor: Theme.bordercolor,
        }}
      >
        <h1
          className="text-xl font-semibold mb-4 text-gray-800"
          style={{
            color: Theme.textcolor,
            background: Theme.background,
            borderColor: Theme.bordercolor,
          }}
        >
          {currentQuestion.question}
        </h1>
        <div className="space-y-3">
          {currentQuestion?.options?.map((option, i) => (
            <Option
              key={i}
              option={option}
              index={i}
              selected={selectedOption === option}
              onSelect={handleOptionSelect}
            />
          ))}
        </div>
      </div>
    );
  };

  // Option component
  const Option = ({ option, index, selected, onSelect }) => (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        selected
          ? "bg-blue-50 border-blue-300"
          : "bg-white border-gray-200 hover:bg-gray-50"
      }`}
      style={{
        color: Theme.textcolor,
        background: Theme.background,
        borderColor: Theme.bordercolor,
      }}
      onClick={() => onSelect(option)}
    >
      <div className="flex items-center">
        <input
          type="radio"
          id={`rd_${index}`}
          name="optRdBtn"
          value={option}
          checked={selected}
          onChange={() => {}}
          className="hidden"
        />
        <label
          htmlFor={`rd_${index}`}
          className="flex items-center cursor-pointer"
        >
          <span
            className={`inline-block w-5 h-5 rounded-full border mr-3 flex-shrink-0 relative ${
              selected ? "border-blue-500" : "border-gray-400"
            }`}
          >
            {selected && (
              <span className="absolute inset-0.5 rounded-full bg-blue-500"></span>
            )}
          </span>
          <span>{option}</span>
        </label>
      </div>
    </div>
  );

  // Result summary component
  const ResultSummary = () => {
    const score = calculateScore();
    const correct = results.filter((r) => r.isCorrect).length;
    const incorrect = results.length - correct;
    const passed = score >= passScore;
    return (
      <div
        className="bg-white p-6 rounded-lg shadow-md w-full"
        style={{
          color: Theme.textcolor,
          background: Theme.background,
          borderColor: Theme.bordercolor,
        }}
      >
        <div className="flex flex-col items-center mb-6">
          <div
            className="relative w-24 h-24 mb-1 flex justify-center items-center border-gray-300 border-4 rounded-full"
            style={{
              color: Theme.textcolor,
              background: Theme.background,
              borderColor: Theme.bordercolor,
            }}
          >
            <p className="text-[1.5rem]"> {score}%</p>
          </div>

          <div className="text-center space-y-1">
            <p className="text-green-600 font-semibold">Correct: {correct}</p>
            <p className="text-red-600 font-semibold">Incorrect: {incorrect}</p>
          </div>

          <div
            className={`mt-4 p-3 rounded-md text-center ${
              passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {passed
              ? "Congratulations! You have qualified."
              : "You didn't qualify this time. Please try again."}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              onClick={toggleAnswersView}
            >
              {showAnswers ? "Hide Answers" : "View Answers"}
            </button>
            {passed && (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                onClick={done}
              >
                Done
              </button>
            )}
            {!passed && (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                onClick={resetQuiz}
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // All answers component
  const AllAnswers = () => (
    <div
      ref={answersRef}
      className="p-6 rounded-lg shadow-md max-h-[600px] overflow-auto"
      style={{
        color: Theme.textcolor,
        background: Theme.background,
        borderColor: Theme.bordercolor,
      }}
    >
      <h2
        className="text-xl font-semibold mb-4 text-black"
        style={{
          color: Theme.textcolor,
          background: Theme.background,
          borderColor: Theme.bordercolor,
        }}
      >
        Your Answers
      </h2>
      <div className="space-y-4">
        {results?.map((result, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg ${
              result.isCorrect
                ? "bg-green-50 border-l-4 border-green-500"
                : "bg-red-50 border-l-4 border-red-500"
            }`}
            style={{
              color: Theme.textcolor,
              background: Theme.background,
              borderColor: Theme.bordercolor,
            }}
          >
            <h3 className="font-medium">{result.question}</h3>
            <p
              className={`mt-2 font-semibold ${
                result.isCorrect ? "text-green-600" : "text-red-600"
              }`}
              style={{
                color: Theme.textcolor,
                background: Theme.background,
                borderColor: Theme.bordercolor,
              }}
            >
              Your answer: {result?.clicked}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          style={{
            color: Theme.textcolor,
            background: Theme.background,
            borderColor: Theme.bordercolor,
          }}
          onClick={toggleAnswersView}
        >
          Back to Results
        </button>
      </div>
    </div>
  );

  // Navigation buttons component
  const NavigationButtons = () => {
    if (showResult || showAnswers) return null;

    const isLastQuestion = currentIndex === quizData.length - 1;
    const buttonText = isLastQuestion ? "Submit" : "Next";
    const buttonColor = isLastQuestion
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-green-500 hover:bg-green-600";
    const handleClick = isLastQuestion ? handleSubmit : handleNext;

    return (
      <div className="flex justify-end">
        <button
          className={`px-4 py-2 rounded text-white ${buttonColor} ${
            !selectedOption ? "opacity-50 cursor-not-allowed" : ""
          } transition-colors`}
          onClick={handleClick}
          disabled={!selectedOption}
        >
          {buttonText}
        </button>
      </div>
    );
  };

  // Progress calculation - show 100% when all questions are completed
  const progress = showResult ? 100 : (currentIndex / quizData.length) * 100;

  {
    is_examPassed === 0 && !quizStarted && (
      <div
        className="w-full mx-auto p-4 sm:p-6 bg-gray-50 rounded-xl flex flex-col items-center justify-center min-h-[300px]"
        style={{
          color: Theme.textcolor,
          background: Theme.background,
          borderColor: Theme.bordercolor,
        }}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Quiz Instructions
        </h1>
        <div
          className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-md w-full"
          style={{
            color: Theme.textcolor,
            background: Theme.background,
            borderColor: Theme.bordercolor,
          }}
        >
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>This quiz contains {quizData?.length} questions</li>
            <li>You have 30 minutes to complete the quiz</li>
            <li>Answer all questions to see your results</li>
            <li>You need to score at least 50% to pass</li>
          </ul>
        </div>
        <button
          onClick={startQuiz}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
        >
          Start Quiz
        </button>
      </div>
    );
  }
  return (
    <>
      {Is_Top_Approved && is_examPassed === 0 ? (
        <div className="text-center text-xl text-green-600 p-6 font-semibold">
          🌟 Great news! Your exam has been approved by the Admin.
        </div>
      ) : (
        <>
          {is_examPassed === 0 ? (
            <div
              className="w-full mx-auto p-4 sm:p-6 bg-gray-50 rounded-xl"
              style={{
                color: Theme.textcolor,
                background: Theme.background,
                borderColor: Theme.bordercolor,
              }}
            >
              {timeOver && (
                <div className="bg-red-100 text-red-800 p-3 text-center rounded-md mb-4 font-medium">
                  Time's up! Your quiz has ended.
                  <button
                    onClick={resetQuiz}
                    className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Start Again
                  </button>
                </div>
              )}

              {!timeOver && timerActive && (
                <div className="mb-4 text-right font-medium text-gray-700">
                  Time Remaining: {formatTime(timer)}
                </div>
              )}

              <div className="mb-6">
                <progress
                  value={progress}
                  max="100"
                  className="w-full h-2 rounded"
                ></progress>
                <div className="text-center text-sm text-gray-600 mt-1">
                  {Math.round(progress)}% complete (
                  {showResult ? quizData.length : currentIndex}/
                  {quizData.length} questions)
                </div>
              </div>

              {!showResult && !showAnswers && <CurrentQuestion />}
              <NavigationButtons />
              {showResult && !showAnswers && <ResultSummary />}
              {showAnswers && <AllAnswers />}
            </div>
          ) : (
            <div className="text-center text-xl text-green-600 p-6 font-semibold">
              You have already attempted this quiz and successfully passed.
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Exam;
