"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { Loader, SendHorizontal } from "lucide-react";

export default function Echo() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const p = searchParams.get("prompt");
    if (p) {
      const decoded = decodeURIComponent(p);
      setPrompt(decoded);
      simulateSubmission(decoded);
    }
  }, [searchParams]);

  const simulateSubmission = (p) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setSubmittedPrompt(p);
    fetchAnswer(p);
    
    const url = new URL(window.location.href);
    url.searchParams.delete("prompt");
    window.history.replaceState({}, "", url);
  };

  const fetchAnswer = async (prompt) => {
    try {
      const res = await fetch("/api/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.reply);
      } else {
        setResponse("Failed to fetch response: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error fetching the answer:", error);
      setResponse("Error fetching the answer: " + error.message);
    } finally {
      setPrompt("");
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isProcessing) return;
    
    setSubmittedPrompt(prompt);
    fetchAnswer(prompt);
  };

  return (
    <main className="min-h-screen bg-backgroun text-foreground flex flex-col items-center justify-center">
      <NavBar />

      <div className="mt-20 max-w-2xl w-full px-4">
        <h1 className="text-6xl font-proxima text-center font-semibold mb-4">How can I help?</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">

          <div className="flex h-full items-center border border-border mt-2">
            <input
              type="text"
              placeholder="Ask echo!"
              className="bg-transparent p-2 flex-grow h-16 text-2xl px-8 focus:outline-none text-muted-foreground"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              disabled={isProcessing || !prompt.trim()} 
              className={`h-16 w-24 flex items-center justify-center cursor-pointer border-border border-l transition text-text-disabled ${
                isProcessing || !prompt.trim() 
                ? "bg-surface-alt cursor-not-allowed" 
                : "bg-transparent"
              }`}
            >
              {isProcessing ? <Loader className="animate-spin" /> : <SendHorizontal />}
            </button>
          </div>
        </form>

        {submittedPrompt && (
          <>
            <p className="bg-background border-border border text-2xl text-foreground p-4">{response || <Loader className="animate-spin" />}</p>
          </>
        )}
      </div>
    </main>
  );
}
