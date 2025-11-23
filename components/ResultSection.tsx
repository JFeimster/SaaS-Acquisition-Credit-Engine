import React from 'react';
import { motion } from 'framer-motion';
import { BrandConcept } from '../types';
import { Download, Share2, Copy } from 'lucide-react';

interface ResultSectionProps {
  concept: BrandConcept;
  imageUrl: string | null;
}

interface BentoCardProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}

const BentoCard = ({ children, className = "", delay = 0 }: BentoCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`glass p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors ${className}`}
  >
    {children}
  </motion.div>
);

export const ResultSection: React.FC<ResultSectionProps> = ({ concept, imageUrl }) => {
  return (
    <section className="min-h-screen bg-void py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Header - Full Width */}
          <div className="col-span-1 md:col-span-12 mb-10 text-center">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-serif text-6xl md:text-8xl text-white mb-4"
            >
              {concept.name}
            </motion.h2>
            <p className="text-xl text-accent font-light tracking-widest uppercase">{concept.tagline}</p>
          </div>

          {/* Main Visual - Large Card */}
          <div className="col-span-1 md:col-span-8 h-[500px] md:h-[600px]">
            <BentoCard className="h-full !p-0 overflow-hidden relative group">
              {imageUrl ? (
                <>
                  <img 
                    src={imageUrl} 
                    alt="Brand Mood" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-8 left-8">
                    <span className="text-xs uppercase tracking-widest text-white/70 mb-2 block">Visual Identity</span>
                    <p className="text-white text-lg font-light max-w-md">{concept.vibe}</p>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-velvet animate-pulse">
                  <p className="text-white/30">Generating Visuals...</p>
                </div>
              )}
            </BentoCard>
          </div>

          {/* Description & Target - Side Stack */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
            <BentoCard delay={0.2} className="flex-1 flex flex-col justify-center">
              <h3 className="text-accent text-sm uppercase tracking-wider mb-4">The Narrative</h3>
              <p className="text-white/80 leading-relaxed text-lg">
                {concept.description}
              </p>
            </BentoCard>
            
            <BentoCard delay={0.3} className="flex-1">
              <h3 className="text-accent text-sm uppercase tracking-wider mb-4">Target Audience</h3>
              <p className="text-white/60 font-light">
                {concept.targetAudience}
              </p>
            </BentoCard>
          </div>

          {/* Color Palette */}
          <div className="col-span-1 md:col-span-6 lg:col-span-4">
            <BentoCard delay={0.4} className="h-full">
              <h3 className="text-accent text-sm uppercase tracking-wider mb-6">Color Palette</h3>
              <div className="grid grid-cols-2 gap-4 h-40">
                {Object.entries(concept.palette).map(([key, color]) => (
                  <div key={key} className="group relative rounded-lg overflow-hidden h-full">
                    <div 
                      className="w-full h-full"
                      style={{ backgroundColor: color }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                      <span className="text-xs font-mono text-white uppercase">{color}</span>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>

          {/* Marketing Copy */}
          <div className="col-span-1 md:col-span-6 lg:col-span-8">
            <BentoCard delay={0.5} className="h-full flex flex-col justify-center">
               <h3 className="text-accent text-sm uppercase tracking-wider mb-4">Marketing Copy</h3>
               <blockquote className="font-serif text-2xl md:text-3xl italic text-white/90 leading-snug">
                 "{concept.marketingCopy}"
               </blockquote>
            </BentoCard>
          </div>
          
          {/* Action Bar */}
          <div className="col-span-1 md:col-span-12 mt-8 flex justify-center gap-6">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm uppercase tracking-widest">
              <Download size={16} /> Save Asset
            </button>
             <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm uppercase tracking-widest">
              <Share2 size={16} /> Share
            </button>
             <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black font-semibold hover:bg-white transition-colors text-sm uppercase tracking-widest">
              <Copy size={16} /> Copy Prompt
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
};