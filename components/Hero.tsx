import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-void">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-2 mb-6 text-accent tracking-widest uppercase text-sm font-medium">
            <Sparkles size={16} />
            <span>AI-Powered Brand Architect</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-bold leading-tight mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Manifest <br/> Your Vision.
          </h1>
          
          <p className="max-w-xl mx-auto text-lg text-white/60 mb-12 font-light leading-relaxed">
            Velvet & Void translates your abstract ideas into concrete brand identities using world-class generative AI.
          </p>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-white text-void font-semibold tracking-wide overflow-hidden rounded-full"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Creation <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/20 to-white/0"></div>
      </motion.div>
    </section>
  );
};
