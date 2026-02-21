import { useState } from "react";
import { quizSections, type Section, type Question } from "./data/quizData";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

interface UserAnswer {
  [questionId: string]: string; // Simple string for both types (comma-sep for multi if needed)
}

interface QuizState {
  currentSectionIndex: number;
  userAnswers: UserAnswer;
  isSubmitted: boolean;
  score: number;
}

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentSectionIndex: 0,
    userAnswers: {},
    isSubmitted: false,
    score: 0,
  });

  const currentSection = quizSections[quizState.currentSectionIndex];

  const handleAnswerChange = (questionId: string, answer: string) => {
    setQuizState((prev) => ({
      ...prev,
      userAnswers: { ...prev.userAnswers, [questionId]: answer },
    }));
  };

  const handleNext = () => {
    if (quizState.currentSectionIndex < quizSections.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentSectionIndex: prev.currentSectionIndex + 1,
      }));
    }
  };

  const handleBack = () => {
    if (quizState.currentSectionIndex > 0) {
      setQuizState((prev) => ({
        ...prev,
        currentSectionIndex: prev.currentSectionIndex - 1,
      }));
    }
  };

  const handleSubmit = () => {
    let totalCorrect = 0;
    let totalQuestions = 0;

    quizSections.forEach((section) => {
      section.questions.forEach((q) => {
        totalQuestions++;
        const userAns = quizState.userAnswers[q.id];
        const isCorrect = Array.isArray(q.correctAnswer)
          ? q.correctAnswer.includes(userAns) // For multi, adjust if needed
          : userAns?.toLowerCase().trim() ===
            q.correctAnswer.toLowerCase().trim(); // Case-insensitive for fillBlank
        if (isCorrect) totalCorrect++;
      });
    });

    setQuizState((prev) => ({
      ...prev,
      isSubmitted: true,
      score: (totalCorrect / totalQuestions) * 100,
    }));
  };

  if (quizState.isSubmitted) {
    return (
      <div className="quiz-results">
        <h1>Test Complete!</h1>
        <p>Your score: {quizState.score.toFixed(0)}%</p>
        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>TORFL Practice Quiz</h1>
      <Section
        section={currentSection}
        userAnswers={quizState.userAnswers}
        onAnswerChange={handleAnswerChange}
      />
      <Navigation
        currentIndex={quizState.currentSectionIndex}
        totalSections={quizSections.length}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

// Sub-Component: Renders a single section's questions
function Section({
  section,
  userAnswers,
  onAnswerChange,
}: {
  section: Section;
  userAnswers: UserAnswer;
  onAnswerChange: (id: string, answer: string) => void;
}) {
  return (
    <div className="section">
      <h2>{section.title}</h2>
      {section.questions.map((q) => (
        <Question
          key={q.id}
          question={q}
          userAnswer={userAnswers[q.id] || ""}
          onAnswerChange={onAnswerChange}
        />
      ))}
    </div>
  );
}

// Sub-Component: Single question renderer
function Question({
  question,
  userAnswer,
  onAnswerChange,
}: {
  question: Question;
  userAnswer: string;
  onAnswerChange: (id: string, answer: string) => void;
}) {
  return (
    <div className="question">
      <p>{question.question}</p>
      {question.type === "multiple" ? (
        <MultipleChoice
          options={question.options!}
          userAnswer={userAnswer}
          onAnswerChange={onAnswerChange}
          questionId={question.id}
        />
      ) : (
        <FillBlank
          userAnswer={userAnswer}
          onAnswerChange={onAnswerChange}
          questionId={question.id}
        />
      )}
    </div>
  );
}

// Multiple Choice Component
function MultipleChoice({
  options,
  userAnswer,
  onAnswerChange,
  questionId,
}: {
  options: string[];
  userAnswer: string;
  onAnswerChange: (id: string, answer: string) => void;
  questionId: string;
}) {
  return (
    <div className="multiple-choice">
      {options.map((option) => (
        <label key={option} className={userAnswer === option ? "selected" : ""}>
          <input
            type="radio"
            name={questionId}
            value={option}
            checked={userAnswer === option}
            onChange={() => onAnswerChange(questionId, option)}
          />
          <span dangerouslySetInnerHTML={{ __html: option }} />
        </label>
      ))}
    </div>
  );
}

// Fill in the Blank Component
function FillBlank({
  userAnswer,
  onAnswerChange,
  questionId,
}: {
  userAnswer: string;
  onAnswerChange: (id: string, answer: string) => void;
  questionId: string;
}) {
  return (
    <input
      type="text"
      value={userAnswer}
      onChange={(e) => onAnswerChange(questionId, e.target.value)}
      placeholder="Type your answer..."
      className="fill-blank"
    />
  );
}

// Navigation Component
function Navigation({
  currentIndex,
  totalSections,
  onNext,
  onBack,
  onSubmit,
}: {
  currentIndex: number;
  totalSections: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const isLastSection = currentIndex === totalSections - 1;

  return (
    <div className="navigation">
      <button onClick={onBack} disabled={currentIndex === 0}>
        Back
      </button>
      <button onClick={onNext} disabled={isLastSection}>
        Next
      </button>
      <button onClick={onSubmit}>Submit Test</button>
      <p>
        Section {currentIndex + 1} of {totalSections}
      </p>
    </div>
  );
}

export default App;
