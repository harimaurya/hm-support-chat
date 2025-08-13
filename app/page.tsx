import About from "@/components/about/about";
import AppConfig from "@/components/app-config/app-config";
import Chat from "@/components/chat/chat";

export default function Home() {
  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold mb-5">RAG Chat Application</h1>

        <About />
        <AppConfig />
        <Chat />
      </div>
    </>
  );
}
