export default function About() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold border-b-2 pb-2 border-b-gray-400 mb-4">
        About This App
      </h1>
      <article className="text-gray-100">
        <p>
          This sample application showcases a Retrieval-Augmented Generation
          (RAG) system powered by a large language model (LLM), built to deliver
          smooth and efficient support chat experiences.
        </p>
        <p className="mt-2">
          It harnesses advanced AI capabilities to improve user interactions and
          ensure precise information retrieval.
        </p>
        <p className="mt-2">
          To activate the chat feature, users must set up their Gemini API key
          and provide knowledge base content in JSON format, as illustrated
          below:
        </p>
        <pre className="border border-gray-500 mt-2.5 p-2 rounded">
          <code className="text-xs">
            {`[
    {
    "title": "What is the return policy?",
    "content": "<HTML content>"
    },
    ...
]
          `}
          </code>
        </pre>
      </article>
    </div>
  );
}

export const metadata = {
  title: "About",
  description: "Learn more about this support chat application.",
};
