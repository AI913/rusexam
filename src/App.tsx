import { useState } from "react";
import { quizSections, type Section, type Question } from "./data/quizData";
import "./App.css";

interface UserAnswer {
  [questionId: string]: string;
}

interface QuizState {
  currentSectionIndex: number;
  userAnswers: UserAnswer;
  isSubmitted: boolean;
  score: number;
}

interface QuestionReview {
  questionId: string;
  questionNumber: number;
  sectionTitle: string;
  questionText: string;
  isCorrect: boolean;
  userAnswerLabel: string;
  correctAnswerLabel: string;
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
        const isCorrect = isAnswerCorrect(q, userAns);
        if (isCorrect) totalCorrect++;
      });
    });

    setQuizState((prev) => ({
      ...prev,
      isSubmitted: true,
      score: (totalCorrect / totalQuestions) * 100,
    }));
  };

  const questionReviews = buildQuestionReviews(quizState.userAnswers);
  const totalCorrect = questionReviews.filter((review) => review.isCorrect).length;

  if (quizState.isSubmitted) {
    return (
      <div className="quiz-results">
        <div className="results-header">
          <h1>Test Complete</h1>
          <p className="results-score">Score: {quizState.score.toFixed(0)}%</p>
          <p className="results-summary">
            {totalCorrect} / {questionReviews.length} correct
          </p>
          <button className="restart-btn" onClick={() => window.location.reload()}>
            Restart
          </button>
        </div>

        <div className="results-list">
          {questionReviews.map((review) => (
            <article
              key={review.questionId}
              className={`result-card ${review.isCorrect ? "correct" : "incorrect"}`}
            >
              <div className="result-top">
                <p className="result-index">
                  Q{review.questionNumber} · {review.sectionTitle}
                </p>
                <span className={`result-status ${review.isCorrect ? "good" : "bad"}`}>
                  {review.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>
              <p className="result-question">{review.questionText}</p>
              <div className="answer-row your-answer">
                <span className="answer-label">Your answer:</span>
                <span
                  className="answer-value"
                  dangerouslySetInnerHTML={{ __html: review.userAnswerLabel }}
                />
              </div>
              <div className="answer-row correct-answer">
                <span className="answer-label">Correct answer:</span>
                <span
                  className="answer-value"
                  dangerouslySetInnerHTML={{ __html: review.correctAnswerLabel }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>TORFL Practice Quiz</h1>
      <QuizSection
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

function isAnswerCorrect(question: Question, userAnswer: string): boolean {
  if (!userAnswer?.trim()) return false;

  if (question.type === "multiple") {
    return userAnswer === getCorrectOptionNumber(question);
  }

  if (Array.isArray(question.correctAnswer)) {
    return question.correctAnswer.some(
      (answer) => answer.toLowerCase().trim() === userAnswer.toLowerCase().trim(),
    );
  }

  return userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
}

function formatAnswer(question: Question, value: string | undefined): string {
  if (!value?.trim()) {
    return "<em>No answer</em>";
  }

  if (question.type === "multiple") {
    const answerNumber = value.trim();
    if (/^\d+$/.test(answerNumber) && question.options) {
      const option = question.options[Number(answerNumber) - 1];
      if (option) {
        return `${answerNumber}. ${option}`;
      }
    }
  }

  return value;
}

function getCorrectAnswerText(question: Question): string {
  if (question.type === "multiple") {
    const optionNumber = getCorrectOptionNumber(question);
    if (!optionNumber) return "<em>Unavailable</em>";
    return formatAnswer(question, optionNumber);
  }

  if (Array.isArray(question.correctAnswer)) {
    return question.correctAnswer.join(" / ");
  }

  return question.correctAnswer;
}

function buildQuestionReviews(userAnswers: UserAnswer): QuestionReview[] {
  let questionNumber = 0;
  return quizSections.flatMap((section) =>
    section.questions.map((question) => {
      questionNumber++;
      const userAnswer = userAnswers[question.id];
      return {
        questionId: question.id,
        questionNumber,
        sectionTitle: section.title,
        questionText: question.question.trim() || "Choose the correct option.",
        isCorrect: isAnswerCorrect(question, userAnswer),
        userAnswerLabel: formatAnswer(question, userAnswer),
        correctAnswerLabel: getCorrectAnswerText(question),
      };
    }),
  );
}

function QuizSection({
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
      {options.map((option, index) => {
        const optionNumber = String(index + 1);
        const isSelected = userAnswer === optionNumber;
        return (
          <label key={`${questionId}-${optionNumber}`} className={isSelected ? "selected" : ""}>
            <input
              type="radio"
              name={questionId}
              value={optionNumber}
              checked={isSelected}
              onChange={() => onAnswerChange(questionId, optionNumber)}
            />
            <span>{optionNumber}. </span>
            <span dangerouslySetInnerHTML={{ __html: option }} />
          </label>
        );
      })}
    </div>
  );
}

function getCorrectOptionNumber(question: Question): string | undefined {
  if (question.type !== "multiple" || !question.options || Array.isArray(question.correctAnswer)) {
    return undefined;
  }

  const numericAnswer = question.correctAnswer.trim();
  if (/^\d+$/.test(numericAnswer)) {
    const optionNumber = Number(numericAnswer);
    if (optionNumber >= 1 && optionNumber <= question.options.length) {
      return String(optionNumber);
    }
  }

  const correctIndex = question.options.findIndex(
    (option) => option.trim() === question.correctAnswer.trim(),
  );

  return correctIndex >= 0 ? String(correctIndex + 1) : undefined;
}

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
