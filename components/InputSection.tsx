import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

interface InputSectionProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) onSubmit(prompt);
  };

  return (
    <section id="create" className="min-h-[80vh] flex items-center justify-center bg-velvet relative py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-high p-12 rounded-3xl"
        >
          <h2 className="font-serif text-4xl mb-6">The Spark</h2>
          <p className="text-white/50 mb-10">
            Describe your idea in as few or as many words as you like. 
            "A coffee shop for introverts," "Cyberpunk sneaker brand," or "Sustainable luxury travel."
          </p>

          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your vision here..."
              disabled={isLoading}
              className="w-full bg-transparent text-3xl md:text-5xl font-serif text-white placeholder-white/20 border-b border-white/10 focus:border-accent outline-none py-4 resize-none min-h-[160px] transition-colors"
            />
            
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className="flex items-center gap-3 text-xl font-medium text-white hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" /> Manifesting...
                  </>
                ) : (
                  <>
                    Generate Concept <ArrowRight />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
