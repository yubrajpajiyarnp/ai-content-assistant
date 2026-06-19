# AI Content Assistant

AI Content Assistant is a full-stack web application designed to help users create, manage, and improve content with the help of artificial intelligence. The project combines a content management system with AI-powered writing tools, allowing users to generate content ideas, improve existing text, and create SEO metadata from a single platform.

One of the main goals of this project was to explore how locally hosted large language models can be integrated into modern web applications. Instead of relying on paid cloud-based APIs, the application uses Ollama and the Mistral model to perform AI tasks directly on the user's machine.

## Features

### Content Management

* Create new content entries
* View all saved content
* Update existing content
* Delete content
* Store content using SQLite

### AI Features

* Improve grammar and readability
* Enhance writing style and tone
* Generate SEO metadata
* Generate content ideas from a topic
* Run AI locally using Ollama and Mistral

### File Upload Support

* Upload text files
* Extract text automatically
* Use uploaded content directly with AI tools

## Tech Stack

### Frontend

* React
* Vite
* Axios

### Backend

* Node.js
* Express.js

### Database

* SQLite

### AI

* Ollama
* Mistral LLM

### File Processing

* Multer
* pdf-parse
* mammoth

## Project Structure

```text
internship/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── database/
│   ├── server.js
│   └── content.db
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── training/
├── start.sh
└── README.md
```

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd ai-content-assistant
```

### Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs at:

```text
http://localhost:3000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Ollama Setup

Install Ollama from:

https://ollama.com

Download the Mistral model:

```bash
ollama pull mistral
```

Verify installation:

```bash
ollama list
```

If Ollama is not already running:

```bash
ollama serve
```

## Quick Start

A startup script is included to simplify development.

```bash
./start.sh
```

This command automatically starts the backend and frontend servers.

## API Endpoints

### Content Management

```http
GET    /api/content
GET    /api/content/:id
POST   /api/content
PUT    /api/content/:id
DELETE /api/content/:id
```

### AI Features

```http
POST /api/ai/improve
POST /api/ai/seo-meta
POST /api/ai/ideas
```

### File Upload

```http
POST /api/upload
```

## Future Improvements

* PDF file support
* DOCX file support
* Improved user interface
* Dark mode
* User authentication
* Content analytics
* AI chat assistant

## Author

Yubraj Pajiyar

B.Tech in Computer Science and Engineering (Data Science)

Vellore Institute of Technology (VIT)
