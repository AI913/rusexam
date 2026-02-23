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
    id: 'section I',
    title: '下線部の発音が他と異なる単語を各群より一つ選び、その番号を解答欄に書きなさい。',
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
        correctAnswer: '3',
      },
      {
        id: 'q2',
        type: 'multiple',
        question: '',
        options: [
          'клю<span style="text-decoration: underline;">ч</span>',
          '<span style="text-decoration: underline;">ч</span>то',
          '<span style="text-decoration: underline;">ч</span>исло',
          'встре<span style="text-decoration: underline;">ч</span>а'
        ],
        correctAnswer: '2',
      },
      {
        id: 'q3',
        type: 'multiple',
        question: '',
        options: [
          '<span style="text-decoration: underline;">з</span>оопарк',
          '<span style="text-decoration: underline;">з</span>доровье',
          'ба<span style="text-decoration: underline;">з</span>а',
          'Кавка<span style="text-decoration: underline;">з</span>'
        ],
        correctAnswer: '4',
      },
      {
        id: 'q4',
        type: 'multiple',
        question: '',
        options: [
          'ко<span style="text-decoration: underline;">с</span>мос',
          'апте<span style="text-decoration: underline;">к</span>а',
          'э<span style="text-decoration: underline;">к</span>замен',
          'и<span style="text-decoration: underline;">к</span>ра'
        ],
        correctAnswer: '3',
      },
      {
        id: 'q5',
        type: 'multiple',
        question: '',
        options: [
          'во<span style="text-decoration: underline;">д</span>ка',
          '<span style="text-decoration: underline;">д</span>ва',
          'с<span style="text-decoration: underline;">д</span>ача',
          'коридор'
        ],
        correctAnswer: '1',
      },
      {
        id: 'q6',
        type: 'multiple',
        question: '',
        options: [
          'но<span style="text-decoration: underline;">г</span>а',
          '<span style="text-decoration: underline;">г</span>руппа',
          'ле<span style="text-decoration: underline;">г</span>ко',
          '<span style="text-decoration: underline;">г</span>ость'
        ],
        correctAnswer: '3',
      },
      {
        id: 'q7',
        type: 'multiple',
        question: '',
        options: [
          'бей<span style="text-decoration: underline;">с</span>бол',
          'ра<span style="text-decoration: underline;">сс</span>каз',
          'Мо<span style="text-decoration: underline;">с</span>ква',
          '<span style="text-decoration: underline;">с</span>ок'
        ],
        correctAnswer: '1',
      },
      {
        id: 'q8',
        type: 'multiple',
        question: '',
        options: [
          'ин<span style="text-decoration: underline;">ж</span>енер',
          'гара<span style="text-decoration: underline;">ж</span>',
          'слу<span style="text-decoration: underline;">ж</span>ба',
          '<span style="text-decoration: underline;">ж</span>енщина'
        ],
        correctAnswer: '2',
      },
      {
        id: 'q9',
        type: 'multiple',
        question: '',
        options: [
          '<span style="text-decoration: underline;">г</span>олос',
          '<span style="text-decoration: underline;">г</span>рамм',
          'ав<span style="text-decoration: underline;">г</span>уст',
          'се<span style="text-decoration: underline;">г</span>одня'
        ],
        correctAnswer: '4',
      },
      {
        id: 'q10',
        type: 'multiple',
        question: '',
        options: [
          'диван',
          'вдру<span style="text-decoration: underline;">г</span>',
          '<span style="text-decoration: underline;">вр</span>ач',
          '<span style="text-decoration: underline;">вт</span>орник'
        ],
        correctAnswer: '4',
      },
    ]
  },
  {
    id: 'II',
    title: 'アクセントの位置が他と異なる名詞を各群より一つ選び、その番号を解答欄に書きなさい。',
    questions: [
      {
        id: 'q11',
        type: 'multiple',
        question: '',
        options: ['пиво', 'окно', 'стакан', 'ноябрь'],
        correctAnswer: '1',
      },
      {
        id: 'q12',
        type: 'multiple',
        question: '',
        options: ['рыба', 'кухня', 'песня', 'вода'],
        correctAnswer: '4',
      },
      {
        id: 'q13',
        type: 'multiple',
        question: '',
        options: ['дача', 'ваза', 'живот', 'завтрак'],
        correctAnswer: '3',
      },
      {
        id: 'q14',
        type: 'multiple',
        question: '',
        options: ['доска', 'француз', 'сумка', 'восток'],
        correctAnswer: '3',
      },
      {
        id: 'q15',
        type: 'multiple',
        question: '',
        options: ['запад', 'сказка', 'чудо', 'буфет'],
        correctAnswer: '4',
      },
      {
        id: 'q16',
        type: 'multiple',
        question: '',
        options: ['здание', 'надежда', 'выставка', 'золото'],
        correctAnswer: '2',
      },
      {
        id: 'q17',
        type: 'multiple',
        question: '',
        options: ['студентка', 'дорога', 'разговор', 'художник'],
        correctAnswer: '3',
      },
      {
        id: 'q18',
        type: 'multiple',
        question: '',
        options: ['ресторан', 'голова', 'туалет', 'физика'],
        correctAnswer: '4',
      },
      {
        id: 'q19',
        type: 'multiple',
        question: '',
        options: ['человек', 'товарищ', 'волейбол', 'телефон'],
        correctAnswer: '2',
      },
      {
        id: 'q20',
        type: 'multiple',
        question: '',
        options: ['занятие', 'пианино', 'композитор', 'электричка'],
        correctAnswer: '1',
      },
    ]
  },
  {
    id: 'III',
    title: '①он，②она，③оно，④ониを用いて、次の質問に答えなさい。解答欄には選んだ人称代名詞の<span style="text-decoration: underline;">番号</span>を書きなさい。',
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
        correctAnswer: '1',
      },
    ],
  },
  {
    id: 'V',
    title: '',
    questions: [
      {
        id: 'q_v1',
        type: 'multiple',
        question: '(Студенческое общежитие) находится недалеко от института.',
        options: [
          'Студенческом общежитии',
          'Студенческого общежития',
          'Студенческое общежитие'
        ],
        correctAnswer: '3',
      },
      {
        id: 'q_v2',
        type: 'multiple',
        question: 'Дети купаются в (маленькая река).',
        options: [
          'маленькую реку',
          'маленькой реке',
          'маленькая река'
        ],
        correctAnswer: '2',
      },
      {
        id: 'q_v3',
        type: 'multiple',
        question: 'Сколько лет (твой брат)?',
        options: [
          'твоему брату',
          'твоим братом',
          'твоём брате'
        ],
        correctAnswer: '1',
      },
      {
        id: 'q_v4',
        type: 'multiple',
        question: 'У меня нет (тёплое пальто).',
        options: [
          'тёплым пальто',
          'тёплого пальто',
          'тёплое пальто'
        ],
        correctAnswer: '2',
      },
      {
        id: 'q_v5',
        type: 'multiple',
        question: 'Пётр рисует цветы (синяя ручка).',
        options: [
          'синюю ручку',
          'синей ручкой',
          'синяя ручка'
        ],
        correctAnswer: '2',
      },
      {
        id: 'q_v6',
        type: 'multiple',
        question: 'Мы едем на (первый поезд).',
        options: [
          'первом поезде',
          'первый поезд',
          'первому поезду'
        ],
        correctAnswer: '1',
      },
      {
        id: 'q_v7',
        type: 'multiple',
        question: '(Каждое воскресенье) Михаил плавает в бассейне.',
        options: [
          'Каждом воскресенье',
          'Каждого воскресенья',
          'Каждое воскресенье'
        ],
        correctAnswer: '3',
      },
      {
        id: 'q_v8',
        type: 'multiple',
        question: 'У Кати болит (левая рука).',
        options: [
          'левая рука',
          'левой рукой',
          'левой руке'
        ],
        correctAnswer: '1',
      },
      {
        id: 'q_v9',
        type: 'multiple',
        question: 'Сергей разговаривает со (старый знакомый).',
        options: [
          'старым знакомым',
          'старому знакомому',
          'старого знакомого'
        ],
        correctAnswer: '1',
      },
      {
        id: 'q_v10',
        type: 'multiple',
        question: 'В газете была статья об (это большое дерево).',
        options: [
          'этом большом дереве',
          'это большое дерево',
          'этого большого дерева'
        ],
        correctAnswer: '1',
      },
      {
        id: 'q_v11',
        type: 'multiple',
        question: '(Наша дочь) скучно смотреть этот фильм.',
        options: [
          'Нашу дочь',
          'Наша дочь',
          'Нашей дочери'
        ],
        correctAnswer: '3',
      },
      {
        id: 'q_v12',
        type: 'multiple',
        question: 'Анна Павловна хорошо понимает (свой внук).',
        options: [
          'своего внука',
          'свой внук',
          'своём внуке'
        ],
        correctAnswer: '1',
      },
      {
        id: 'q_v13',
        type: 'multiple',
        question: 'Автобус подходил к (красивое озеро).',
        options: [
          'красивым озером',
          'красивому озеру',
          'красивого озера'
        ],
        correctAnswer: '2',
      },
      {
        id: 'q_v14',
        type: 'multiple',
        question: 'Василий был у (своя девушка).',
        options: [
          'свою девушку',
          'своей девушки',
          'своя девушка'
        ],
        correctAnswer: '2',
      },
      {
        id: 'q_v15',
        type: 'multiple',
        question: 'У Нины есть (новый компьютер).',
        options: [
          'новом компьютере',
          'нового компьютера',
          'новый компьютер'
        ],
        correctAnswer: '3',
      },
    ]
  },
  {
    id: 'VI',
    title: '',
    questions: [
      {
        id: 'q_vi1',
        type: 'multiple',
        question: 'Как долго ты занимаешься фигурным катанием?',
        options: [
          'Я занимаюсь фигурным катанием в школе.',
          'Я занимаюсь фигурным катанием четыре года.',
          'Я хочу заниматься фигурным катанием.'
        ],
        correctAnswer: '2',
      },
      {
        id: 'q_vi2',
        type: 'multiple',
        question: 'Чей это рюкзак?',
        options: [
          'Это его рюкзак.',
          'Это зелёный рюкзак.',
          'Рюкзак на кровати.'
        ],
        correctAnswer: '1',
      },
      {
        id: 'q_vi3',
        type: 'multiple',
        question: 'В каком месяце вы родились?',
        options: [
          'В мае.',
          'В тысяча девятьсот девяносто восьмом году.',
          'В пятницу.'
        ],
        correctAnswer: '1',
      },
      {
        id: 'q_vi4',
        type: 'multiple',
        question: 'С кем Мария играет в шахматы?',
        options: [
          'Она играет у подруги.',
          'Она играет редко.',
          'Она играет с подругой.'
        ],
        correctAnswer: '3',
      },
      {
        id: 'q_vi5',
        type: 'multiple',
        question: 'Кому ты звонил?',
        options: [
          'Папу.',
          'Папе.',
          'С папой.'
        ],
        correctAnswer: '2',
      },
    ]
  },
  {
    id: 'IV',
    title: 'Double Fill-in-the-Blank: Sentence Completion',
    questions: [
      {
        id: 'q6',
        type: 'doubleFillBlank',
        question: 'Fill: Я ___ (to go) в ___ (place).',
        correctAnswer: ['иду', 'магазин'], // Two correct answers
        explanation: 'Correct form of "to go" is "иду" (1st person singular, present), and a common place is "магазин" (shop).',
      },
    ],
  },
];
