---
title: "Sentiment-Analysis"
date: "2025-02-13"
description: "Sentiment-Analysis is a web-based application that analyzes user-provided text and determines its sentiment using machine learning techniques."
tags: ["HTML", "CSS", "JavaScript", "FLASK", "PYTHON", "NLP", "ML"]
source: "https://github.com/Hritikraj8804/Sentiment-Analysis"
link: "https://sentiment.chcha.in"
status: "COMPLETED"
---

# Sentiment Analysis

**Sentiment-Analysis** is a web-based application designed to analyze textual data and determine the underlying sentiment (Positive, Negative, or Neutral). The system uses Natural Language Processing (NLP) and Machine Learning techniques to process user input and display accurate sentiment results in real time.

## Key Features

- **Text Input**: Users can enter custom text directly into the application.
- **Sentiment Detection**: Automatically classifies text as Positive, Negative, or Neutral.
- **Machine Learning Model**: Uses trained ML/NLP models for sentiment prediction.
- **Real-Time Results**: Displays sentiment results instantly on the webpage.
- **User-Friendly Interface**: Clean and intuitive UI for easy interaction.

## Project Architecture

1. **Frontend**:
   - Provides an interface for users to input text.
   - Displays sentiment analysis results dynamically.
   - Built using HTML, CSS, and JavaScript.

2. **Backend**:
   - Processes text data using NLP techniques.
   - Executes sentiment prediction using a trained ML model.
   - Implemented using Flask and Python.

3. **Model Integration**:
   - Preprocessed text is vectorized and passed to the ML model.
   - The predicted sentiment is returned to the frontend.

## Getting Started

### Prerequisites

- **Python** (version >= 3.7)
- **Flask**
- **Required Python Libraries**:
  - pandas
  - numpy
  - scikit-learn
  - nltk
  - flask

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hritikraj8804/Sentiment-Analysis.git
   cd Sentiment-Analysis
    ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv env
   source env/bin/activate   # On Windows: env\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:

   ```bash
   python app.py
   ```

5. Open your browser and navigate to:

   ```
   http://localhost:5000
   ```

### Usage

1. Enter any text into the input field.
2. Click the **Analyze** button.
3. View the predicted sentiment instantly on the screen.

## Tech Stack

| Technology   | Purpose             |
| ------------ | ------------------- |
| HTML/CSS/JS  | Frontend            |
| Flask        | Backend framework   |
| Python       | ML & NLP processing |
| Scikit-learn | Model training      |
| NLTK         | Text preprocessing  |

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a pull request.

---

We hope **Sentiment-Analysis** helps you explore and understand sentiment detection using machine learning! 🚀
