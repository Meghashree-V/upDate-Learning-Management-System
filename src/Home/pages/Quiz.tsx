import { useState } from "react";
import { CheckCircle, XCircle, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const quizData = {
  title: "React Fundamentals Quiz",
  description: "Test your understanding of React basics",
  timeLimit: 15, // minutes
  questions: [
    {
      id: 1,
      question: "What is the correct way to create a functional component in React?",
      options: [
        "function MyComponent() { return <div>Hello</div>; }",
        "const MyComponent = () => { return <div>Hello</div>; }",
        "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
        "Both A and B are correct"
      ],
      correctAnswer: 3,
      explanation: "Both function declarations and arrow functions can be used to create functional components in React."
    },
    {
      id: 2,
      question: "Which hook is used to manage state in functional components?",
      options: [
        "useEffect",
        "useState",
        "useContext",
        "useReducer"
      ],
      correctAnswer: 1,
      explanation: "useState is the primary hook for managing state in functional components."
    },
    {
      id: 3,
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "JavaScript Extension",
        "Java Syntax Extension",
        "JavaScript eXtended"
      ],
      correctAnswer: 0,
      explanation: "JSX stands for JavaScript XML, which allows us to write HTML-like syntax in JavaScript."
    },
    {
      id: 4,
      question: "When does a React component re-render?",
      options: [
        "When props change",
        "When state changes",
        "When parent component re-renders",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "React components re-render when props change, state changes, or when the parent component re-renders."
    },
    {
      id: 5,
      question: "What is the virtual DOM?",
      options: [
        "A copy of the real DOM kept in memory",
        "A JavaScript library",
        "A React component",
        "A CSS framework"
      ],
      correctAnswer: 0,
      explanation: "The virtual DOM is a JavaScript representation of the real DOM that React uses for efficient updates."
    }
  ]
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit * 60);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizData.questions[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{quizData.title}</CardTitle>
            <p className="text-muted-foreground">{quizData.description}</p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">{quizData.questions.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Questions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-muted-foreground">{quizData.timeLimit} minutes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-muted-foreground">Certificate</p>
              </div>
            </div>
            
            <div className="bg-lms-red-light p-4 rounded-lg">
              <h3 className="font-medium mb-2">Instructions:</h3>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Read each question carefully</li>
                <li>• Select the best answer for each question</li>
                <li>• You can navigate back to previous questions</li>
                <li>• Submit your quiz before time runs out</li>
                <li>• Minimum 70% score required to pass</li>
              </ul>
            </div>
            
            <Button 
              size="lg" 
              onClick={() => setQuizStarted(true)}
              className="bg-gradient-primary hover:bg-primary-hover text-white"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / quizData.questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-green-500' : 'bg-red-500'}`}>
              {passed ? <Award className="w-10 h-10 text-white" /> : <XCircle className="w-10 h-10 text-white" />}
            </div>
            <CardTitle className="text-2xl">
              {passed ? 'Congratulations!' : 'Quiz Complete'}
            </CardTitle>
            <p className="text-muted-foreground">
              {passed ? 'You have successfully passed the quiz!' : 'Better luck next time!'}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {score}/{quizData.questions.length}
              </div>
              <div className="text-lg text-muted-foreground">
                {percentage.toFixed(0)}% Score
              </div>
              <div className={`text-sm font-medium ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {passed ? 'PASSED' : 'FAILED'} (70% required)
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Review Answers:</h3>
              {quizData.questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{question.question}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your answer: {question.options[userAnswer]} 
                          {!isCorrect && (
                            <span className="block text-green-600">
                              Correct answer: {question.options[question.correctAnswer]}
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2 bg-lms-red-light p-2 rounded">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retake Quiz
              </Button>
              {passed && (
                <Button className="bg-gradient-primary hover:bg-primary-hover text-white">
                  Download Certificate
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{quizData.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {quizData.questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">{question.question}</h2>
            
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-lms-red-light cursor-pointer">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-gradient-primary hover:bg-primary-hover text-white"
            >
              {currentQuestion === quizData.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;