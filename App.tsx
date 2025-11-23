import React, { useState, useRef } from 'react';
import { Hero } from './components/Hero';
import { InputSection } from './components/InputSection';
import { ResultSection } from './components/ResultSection';
import { generateBrandIdentity, generateBrandImage } from './services/geminiService';
import { AppState, BrandConcept } from './types';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [concept, setConcept] = useState<BrandConcept | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLElement>(null);

  const handleStart = () => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGenerate = async (prompt: string) => {
    setAppState(AppState.GENERATING_TEXT);
    setError(null);
    setConcept(null);
    setImageUrl(null);

    try {
      // 1. Generate Text Concept
      const brandConcept = await generateBrandIdentity(prompt);
      setConcept(brandConcept);
      setAppState(AppState.GENERATING_IMAGE);

      // 2. Generate Image (Parallel or Sequential depending on UX preference, sequential here to use brand name)
      const image = await generateBrandImage(brandConcept);
      setImageUrl(image);
      setAppState(AppState.COMPLETE);

    } catch (err) {
      console.error(err);
      setError("The creative spirits are turbulent. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-void text-white selection:bg-accent selection:text-black">
      {/* Navigation - Minimal Sticky */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none">
        <div className="flex justify-between items-center max-w-7xl mx-auto pointer-events-auto">
          <div className="font-serif font-bold text-xl tracking-tighter">V&V.</div>
          <div className="flex gap-4">
             {/* Add nav items if needed */}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <Hero onStart={handleStart} />

      {/* Input */}
      <div ref={inputRef as React.RefObject<HTMLDivElement>}>
        <InputSection 
          onSubmit={handleGenerate} 
          isLoading={appState === AppState.GENERATING_TEXT || appState === AppState.GENERATING_IMAGE} 
        />
      </div>

      {/* Error Handling */}
      {appState === AppState.ERROR && (
        <div className="p-10 text-center text-red-400 bg-velvet border-t border-red-900/30">
          <p>{error}</p>
        </div>
      )}

      {/* Loading Overlay for Image Generation phase (Text is fast, Image takes time) */}
      {appState === AppState.GENERATING_IMAGE && concept && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
           <div className="mb-4">
              <Loader2 className="w-12 h-12 text-accent animate-spin" />
           </div>
           <h2 className="text-2xl font-serif text-white mb-2">Manifesting {concept.name}...</h2>
           <p className="text-white/50">Crafting visual identity</p>
        </div>
      )}

      {/* Results */}
      {concept && (
        <ResultSection concept={concept} imageUrl={imageUrl} />
      )}
      
      {/* Footer */}
      <footer className="py-12 text-center text-white/20 text-sm border-t border-white/5 bg-void">
        <p>&copy; 2024 Velvet & Void. Powered by Gemini.</p>
      </footer>
    </div>
  );
}
