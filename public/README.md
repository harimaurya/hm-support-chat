# RAG Support Chat

A Next.js-powered intelligent support chat application featuring a **Retrieval-Augmented Generation (RAG) system** powered by Google's Gemini LLM for context-aware, knowledge-based responses.

## 🎯 Overview

RAG Support Chat is an advanced AI-powered customer support solution that combines the power of **Large Language Models (LLM)** with **Retrieval-Augmented Generation (RAG)** technology. Unlike traditional chatbots, this system retrieves relevant information from your custom knowledgebase and uses it to generate accurate, contextual responses through semantic search and AI reasoning.

## 🚀 Key Features

### RAG System Capabilities
- 🧠 **Retrieval-Augmented Generation**: Combines semantic search with LLM reasoning for accurate responses
- 🔍 **Semantic Search**: Advanced document retrieval using embedding-based similarity matching
- 📚 **Custom Knowledgebase Integration**: Upload and index your own documentation for domain-specific responses
- 🎯 **Context-Aware Responses**: AI generates answers based on retrieved relevant documents
- 🔄 **Dynamic Knowledge Retrieval**: Real-time document search for each user query

### User Experience
- 💬 **Intelligent Chat Interface**: Modern, responsive chat UI with real-time messaging
- ⚙️ **Easy Configuration**: Simple setup for API keys and knowledgebase management
- 🎨 **Modern Design**: Built with Tailwind CSS and shadcn/ui components
- 📱 **Responsive Layout**: Works seamlessly across desktop and mobile devices
- 🌙 **Dark Mode Support**: Elegant theme switching capabilities

## 🏗️ Architecture

### RAG Pipeline
1. **Document Ingestion**: Your knowledgebase content is processed and indexed
2. **Query Processing**: User questions are analyzed for semantic meaning
3. **Information Retrieval**: Relevant documents are retrieved using semantic search
4. **Context Augmentation**: Retrieved content is formatted as context for the LLM
5. **Response Generation**: Gemini LLM generates accurate responses based on the context
6. **Answer Delivery**: Contextual, knowledgebase-backed responses are delivered to users

## 🎯 Use Cases

- **Customer Support**: Automated, accurate responses to customer inquiries
- **Internal Knowledge Base**: Employee self-service for company information
- **Product Documentation**: Interactive documentation assistance
- **FAQ Automation**: Dynamic FAQ responses based on your content
- **Training and Onboarding**: Interactive learning assistance

## 📈 Benefits of RAG Architecture

- **Accuracy**: Responses are grounded in your actual documentation
- **Relevance**: Semantic search ensures contextually appropriate information retrieval
- **Scalability**: Easy to update knowledgebase without retraining models
- **Cost-Effective**: Leverages existing LLMs while maintaining domain expertise
- **Transparency**: Clear connection between responses and source documents

### Technical Components
- **Frontend**: Next.js 14+ with TypeScript and Tailwind CSS
- **LLM Integration**: Google Gemini API for natural language processing
- **Semantic Search**: Custom implementation for document retrieval
- **State Management**: React Context for configuration and chat state
- **UI Components**: shadcn/ui for consistent, accessible interface

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- **Google Gemini API key** (for LLM capabilities)
- Your knowledgebase content (documents, FAQs, support articles, etc.)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <repo-directory>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env.local` file in the root directory:
```bash
# Add any required environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### RAG and LLM Resources
- [Retrieval-Augmented Generation Paper](https://arxiv.org/abs/2005.11401)
- [Google Gemini API Documentation](https://ai.google.dev/)
- [Semantic Search Best Practices](https://www.pinecone.io/learn/semantic-search/)

### Framework Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
