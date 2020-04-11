const topicData = [
  {
    quizTitle: 'Mission 1 Quiz',
    id: 1,
    tagData: [
      {
        tag: 'Deontology',
        incorrect: 45,
        total: 60,
      },
      {
        tag: 'Fair Use Doctrine',
        incorrect: 40,
        total: 70,
      },
      {
        tag: 'Virtues',
        incorrect: 45,
        total: 90,
      },
      {
        tag: 'Rights',
        incorrect: 30,
        total: 42,
      },
      {
        tag: 'Utilitarianism',
        incorrect: 23,
        total: 30,
      },
    ]
  },
  {
    quizTitle: 'Mission 2 Quiz',
    id: 2,
    tagData: [
      {
        tag: 'Deontology',
        incorrect: 25,
        total: 43,
      },
      {
        tag: 'Fair Use Doctrine',
        incorrect: 4,
        total: 25,
      },
      {
        tag: 'Virtues',
        incorrect: 23,
        total: 40,
      },
      {
        tag: 'Rights',
        incorrect: 3,
        total: 32,
      },
      {
        tag: 'Utilitarianism',
        incorrect: 12,
        total: 50,
      },
    ]
  },
]

const quizQnsData = [
  {
    quizTitle: 'Mission 1 Quiz',
    questionID: "1 1",
    quiz: 1,
    questionNumber: 1,
    tag: 'Deontology',
    total: 30,
    incorrect: 25,
    questionTitle: 'What is the',
    correctOption: 3,
    options: [
      {
        optionNumber: 1,
        title: 'length oq a square?'
      },
      {
        optionNumber: 2,
        title: 'breath of a square?'
      },
      {
        optionNumber: 3,
        title: 'circumference of a circle?'
      },
      {
        optionNumber: 4,
        title: 'age of a raccoon?'
      },
    ]
  },
  {
    quizTitle: 'Mission 1 Quiz',
    questionID: "1 6",
    quiz: 1,
    questionNumber: 6,
    tag: 'Deontology',
    total: 30,
    incorrect: 20,
    questionTitle: 'What is the',
    correctOption: 2,
    options: [
      {
        optionNumber: 1,
        title: 'length oq a square?'
      },
      {
        optionNumber: 2,
        title: 'breadth of a square?'
      },
      {
        optionNumber: 3,
        title: 'circumference of a circle?'
      },
      {
        optionNumber: 4,
        title: 'age of a raccoon?'
      },
    ]
  },
  {
    quizTitle: 'Mission 1 Quiz',
    questionID: "1 2",
    quiz: 1,
    questionNumber: 2,
    tag: 'Fair Use Doctrine',
    total: 30,
    incorrect: 5,
    questionTitle: 'What is wrong in Fair Use Doctrine?',
    correctOption: 4,
    options: [
      {
        optionNumber: 1,
        title: 'Taking notes in meetings'
      },
      {
        optionNumber: 2,
        title: 'Downloading lecture slides from LumiNUS'
      },
      {
        optionNumber: 3,
        title: 'Searching google for math formulas'
      },
      {
        optionNumber: 4,
        title: 'Monetization of Youtube videos with a copyrighted soundtrack'
      },
    ]
  },
  {
    quizTitle: 'Mission 1 Quiz',
    questionID: "1 3",
    quiz: 1,
    questionNumber: 3,
    tag: 'Fair Use Doctrine',
    total: 40,
    incorrect: 35,
    questionTitle: 'What have we done wrong in our lives?',
    correctOption: 2,
    options: [
      {
        optionNumber: 1,
        title: 'Invented guns'
      },
      {
        optionNumber: 2,
        title: 'Started wars'
      },
      {
        optionNumber: 3,
        title: 'Thought about life'
      },
      {
        optionNumber: 4,
        title: 'Burnt fossil fuels'
      },
    ]
  },
  {
    quizTitle: 'Mission 1 Quiz',
    questionID: "1 4",
    quiz: 1,
    questionNumber: 4,
    tag: 'Virtues',
    total: 50,
    incorrect: 35,
    questionTitle: 'No more hard questions please',
    correctOption: 1,
    options: [
      {
        optionNumber: 1,
        title: 'OK chill out'
      },
      {
        optionNumber: 2,
        title: 'Bobs your uncle'
      },
      {
        optionNumber: 3,
        title: 'Math is hard'
      },
      {
        optionNumber: 4,
        title: 'Magic happens here'
      },
    ]
  },
  {
    quizTitle: 'Mission 1 Quiz',
    questionID: "1 7",
    quiz: 1,
    questionNumber: 7,
    tag: 'Virtues',
    total: 40,
    incorrect: 10,
    questionTitle: 'Which Disney Princess had the most virtues?',
    correctOption: 2,
    options: [
      {
        optionNumber: 1,
        title: 'Jane'
      },
      {
        optionNumber: 2,
        title: 'Mulan'
      },
      {
        optionNumber: 3,
        title: 'Elsa'
      },
      {
        optionNumber: 4,
        title: 'Pocahontas'
      },
    ]
  },
  {
    quizTitle: 'Mission 1 Quiz',
    questionID: "1 5",
    quiz: 1,
    questionNumber: 5,
    tag: 'Rights',
    total: 42,
    incorrect: 30,
    questionTitle: 'Never gonna',
    correctOption: 1,
    options: [
      {
        optionNumber: 1,
        title: 'Give you up'
      },
      {
        optionNumber: 2,
        title: 'let you down'
      },
      {
        optionNumber: 3,
        title: 'Run around'
      },
      {
        optionNumber: 4,
        title: 'Desert you'
      },
    ]
  },
  {
    quizTitle: 'Mission 1 Quiz',
    questionID: "1 8",
    quiz: 1,
    questionNumber: 8,
    tag: 'Utilitarianism',
    total: 30,
    incorrect: 23,
    questionTitle: 'What is the trolley problem?',
    correctOption: 2,
    options: [
      {
        optionNumber: 1,
        title: 'One where people need to clean trolleys before use'
      },
      {
        optionNumber: 2,
        title: 'One has to make a decision about killing a loved one or 5 strangers'
      },
      {
        optionNumber: 3,
        title: 'When there are no trolleys left in the supermarket'
      },
      {
        optionNumber: 4,
        title: 'When there is no toilet paper'
      },
    ]
  },
  {
    quizTitle: 'Mission 2 Quiz',
    questionID: "2 1",
    quiz: 2,
    questionNumber: 1,
    tag: 'Virtues',
    total: 40,
    incorrect: 23,
    questionTitle: 'Which Disney Princess had the most virtues?',
    correctOption: 2,
    options: [
      {
        optionNumber: 1,
        title: 'Jane'
      },
      {
        optionNumber: 2,
        title: 'Mulan'
      },
      {
        optionNumber: 3,
        title: 'Elsa'
      },
      {
        optionNumber: 4,
        title: 'Pocahontas'
      },
    ]
  },
  {
    quizTitle: 'Mission 2 Quiz',
    questionID: "2 2",
    quiz: 2,
    questionNumber: 2,
    tag: 'Fair Use Doctrine',
    total: 25,
    incorrect: 4,
    questionTitle: 'What is wrong in Fair Use Doctrine?',
    correctOption: 4,
    options: [
      {
        optionNumber: 1,
        title: 'Taking notes in meetings'
      },
      {
        optionNumber: 2,
        title: 'Downloading lecture slides from LumiNUS'
      },
      {
        optionNumber: 3,
        title: 'Searching google for math formulas'
      },
      {
        optionNumber: 4,
        title: 'Monetization of Youtube videos with a copyrighted soundtrack'
      },
    ]
  },
  {
    quizTitle: 'Mission 2 Quiz',
    questionID: "2 3",
    quiz: 2,
    questionNumber: 3,
    tag: 'Utilitarianism',
    total: 50,
    incorrect: 12,
    questionTitle: 'What is the trolley problem?',
    correctOption: 2,
    options: [
      {
        optionNumber: 1,
        title: 'One where people need to clean trolleys before use'
      },
      {
        optionNumber: 2,
        title: 'One has to make a decision about killing a loved one or 5 strangers'
      },
      {
        optionNumber: 3,
        title: 'When there are no trolleys left in the supermarket'
      },
      {
        optionNumber: 4,
        title: 'When there is no toilet paper'
      },
    ]
  },
  {
    quizTitle: 'Mission 2 Quiz',
    questionID: "2 4",
    quiz: 2,
    questionNumber: 4,
    tag: 'Deontology',
    total: 43,
    incorrect: 25,
    questionTitle: 'What is the',
    correctOption: 2,
    options: [
      {
        optionNumber: 1,
        title: 'length oq a square?'
      },
      {
        optionNumber: 2,
        title: 'breadth of a square?'
      },
      {
        optionNumber: 3,
        title: 'circumference of a circle?'
      },
      {
        optionNumber: 4,
        title: 'age of a raccoon?'
      },
    ]
  },
  {
    quizTitle: 'Mission 2 Quiz',
    questionID: "2 5",
    quiz: 2,
    questionNumber: 5,
    tag: 'Rights',
    total: 50,
    incorrect: 12,
    questionTitle: 'Never gonna',
    correctOption: 1,
    options: [
      {
        optionNumber: 1,
        title: 'Give you up'
      },
      {
        optionNumber: 2,
        title: 'let you down'
      },
      {
        optionNumber: 3,
        title: 'Run around'
      },
      {
        optionNumber: 4,
        title: 'Desert you'
      },
    ]
  },
]

const defaultQuestion = {
  quizTitle: 'Mission 0 Quiz',
  questionTitle: 'According to the book “A Gift of Fire, 4th Ed”, Chapter 1, Section 1.4.2, which is NOT a key idea of Deontology:',
  questionNumber: 1,
  correctOption: 4,
  options: [
    {
      optionNumber: 1,
      title: 'We should follow rules of behavior that we can universally apply to everyone.'
    },
    {
      optionNumber: 2,
      title: 'Actions are considered ethical if they follow from logic, and unethical if they are irrational.'
    },
    {
      optionNumber: 3,
      title: 'People should be treated as ends in themselves, and not merely as means to ends.'
    },
    {
      optionNumber: 4,
      title: 'Universal rules should be broken if the consequences of breaking the rules are more beneficial than abiding by those rules.'
    },
  ]
}

export default {
  topicData,
  quizQnsData,
  defaultQuestion
}
