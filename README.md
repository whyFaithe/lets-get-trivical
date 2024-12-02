# Let's Get Trivical! 🎯

A dynamic quiz application built with React that fetches trivia questions from the Open Trivia Database (OpenTDB) API. Users can customize their quiz experience by selecting specific categories and difficulty levels.

## Features

- **Category Selection**: Choose from multiple trivia categories
- **Difficulty Levels**: Select from Easy, Medium, Hard, or All Levels
- **Interactive UI**: 
  - Real-time feedback on answer selection
  - Color-coded results after submission
  - Score tracking
  - Play again functionality
- **Error Handling**: Graceful handling of API errors with user-friendly messages
- **Responsive Design**: Beautiful UI with dynamic background shapes

## Technical Implementation

### Core Components

- `Quiz.js`: Main quiz component that manages game state and API integration
- `QuizStartScreen.js`: Initial screen for category and difficulty selection
- `QuizQuestion.js`: Individual question component with answer options
- `QuizBackground.js`: SVG background animations

### State Management

The app uses React's useState and useEffect hooks to manage:
- Question data
- User selections
- Game state (locked/unlocked)
- Correct answers tracking
- Error states

### API Integration

The app connects to the Open Trivia Database (OpenTDB) API:
- Base URL: `https://opentdb.com/api.php`
- Fetches 5 multiple-choice questions per quiz
- Supports category and difficulty filtering
- Uses session tokens to prevent question repetition

### Features Highlights

1. **Question Processing**:
   - Automatic decoding of HTML entities in questions and answers
   - Random shuffling of answer options
   - Unique ID generation for answer tracking

2. **Answer Validation**:
   - Real-time validation
   - Score calculation
   - Visual feedback for correct/incorrect answers

3. **Error Handling**:
   - API error detection and user-friendly messages
   - Invalid data structure handling
   - Network error management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Dependencies

- React
- html-encoder-decoder (for handling HTML entities)
- OpenTDB API (no authentication required)

## Usage

1. Launch the app
2. Select a category from the dropdown menu
3. Choose a difficulty level
4. Click "Start Quiz"
5. Answer all questions
6. Click "Check Answers" to see your score
7. Use "Play Again" to start a new quiz

## Contributing

Feel free to submit issues and pull requests to improve the application.

## License

This project is open source and available under the MIT License.
