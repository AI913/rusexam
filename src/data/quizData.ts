export interface Question {
  id: string;
  type: 'multiple' | 'fillBlank';
  question: string;
  options?: string[];  // For multiple choice
  correctAnswer: string | string[];  // String for fillBlank, array for multiple (if multi-select, but we'll keep single)
  explanation?: string;  // Optional for feedback
}

export interface Section {
  id: string;
  title: string;
  questions: Question[];
}

export const quizSections: Section[] = [
  {
    id: 'section1',
    title: 'Multiple Choice: Basic Vocab',
    questions: [
      {
        id: 'q1',
        type: 'multiple',
        question: '',
        options: [
          'со<span style="text-decoration: underline;">б</span>ака',
          '<span style="text-decoration: underline;">б</span>улка',
          'гри<span style="text-decoration: underline;">б</span>',
          '<span style="text-decoration: underline;">б</span>укет'
        ],
        correctAnswer: 'собака',
      },
      {
        id: 'q2',
        type: 'multiple',
        question: 'Choose the correct accent: дом (house)',
        options: ['дом', 'до&#x0301;м', 'д&#x043E;&#x0301;м', 'домъ'],  // Renders as дом, до́м, до́м, домъ
        correctAnswer: 'дом',
      },
    ],
  },
  {
    id: 'section2',
    title: 'Fill in the Blanks: Vowel Reduction',
    questions: [
      {
        id: 'q3',
        type: 'fillBlank',
        question: 'The word "вода" reduces to ___ in casual speech.',
        correctAnswer: 'вода',  // Or partial match logic
      },
      {
        id: 'q4',
        type: 'fillBlank',
        question: 'Fill: Я ___ (to be) студент.',
        correctAnswer: 'есть',
      },
    ],
  },
  {
    id: 'section3',
    title: 'Multiple Choice: Grammar (Fewer Options)',
    questions: [
      {
        id: 'q5',
        type: 'multiple',
        question: 'Correct form: Я ___ книгу.',
        options: ['читаю', 'читал'],  // Fewer choices
        correctAnswer: 'читаю',
      },
    ],
  },
];