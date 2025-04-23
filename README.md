

## Demo Video

Check out our application demo video:

[![Demo Video](https://img.youtube.com/vi/PF7CONkY7Wc/0.jpg)](https://youtu.be/PF7CONkY7Wc)

# Glow-in-the-Dark Widget Chatbot

This project is a simple chatbot application that can answer questions about a fictional product called the "Glow-in-the-Dark Widget". The application consists of a React/TypeScript/Tailwind CSS frontend and a FastAPI/LangChain backend.

## Features

- Modern UI built with React, TypeScript, and Tailwind CSS
- Simple backend using FastAPI and LangChain
- Docker-based setup for easy deployment
- Answers 3 predefined questions about the Glow-in-the-Dark Widget:
  1. What color is it?
  2. Does it need batteries?
  3. Where can I get one?

## Prerequisites

- Docker and Docker Compose

## Running the Application

1. Clone this repository
2. Open a terminal in the project root directory
3. Run the following command:

```bash
docker-compose up --build
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
chatbot-AI/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   └── src/
│       ├── components/
│       │   └── Chat.tsx
│       ├── services/
│       │   └── chatService.ts
│       ├── types/
│       │   └── chat.ts
│       ├── App.tsx
│       └── index.tsx
└── backend/
    ├── Dockerfile
    ├── requirements.txt
    └── main.py
```

## Questions and Answers

The chatbot is trained to answer the following questions about the Glow-in-the-Dark Widget:

1. **What color is it?**
   Answer: The Glow-in-the-Dark Widget comes in a phosphorescent green color when charged, but appears white in daylight.

2. **Does it need batteries?**
   Answer: No, the Glow-in-the-Dark Widget doesn't need batteries. It absorbs light energy during the day and glows for up to 8 hours at night.

3. **Where can I get one?**
   Answer: You can purchase the Glow-in-the-Dark Widget from our online store at www.glowwidget.com or from select retailers nationwide.

For any other questions, the chatbot will apologize and suggest asking about one of the topics it knows about. 
