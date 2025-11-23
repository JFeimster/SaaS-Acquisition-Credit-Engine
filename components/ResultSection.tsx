import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrandConcept } from '../types';
import { Download, Share2, Copy, Check, FileJson, FileText, Package } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [jsonDownloaded, setJsonDownloaded] = useState(false);

  // Enhanced Markdown content
  const getMarkdownContent = () => {
    return `
# ${concept.name}
> ${concept.tagline}

---

## The Narrative
${concept.description}

## Vibe
${concept.vibe}

## Target Audience
${concept.targetAudience}

## Signature Offerings
${concept.products.map(p => `### ${p.name} (${p.pricePoint})
${p.description}`).join('\n\n')}

## Marketing Copy
"${concept.marketingCopy}"

## Color Palette
- Primary: ${concept.palette.primary}
- Secondary: ${concept.palette.secondary}
- Accent: ${concept.palette.accent}
- Background: ${concept.palette.background}
    `.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getMarkdownContent()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadMarkdown = () => {
    const textContent = getMarkdownContent();
    const blob = new Blob([textContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${concept.name.replace(/\s+/g, '-')}-Identity.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Also try to download image if it exists
    if (imageUrl) {
       setTimeout(() => {
          const imgLink = document.createElement('a');
          imgLink.href = imageUrl;
          imgLink.download = `${concept.name.replace(/\s+/g, '-')}-Visual.png`;
          document.body.appendChild(imgLink);
          imgLink.click();
          document.body.removeChild(imgLink);
       }, 500);
    }
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleDownloadJSON = () => {
    const jsonContent = JSON.stringify(concept, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${concept.name.replace(/\s+/g, '-')}-Data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setJsonDownloaded(true);
    setTimeout(() => setJsonDownloaded(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: concept.name,
      text: `${concept.name}: ${concept.tagline}\n\n${concept.description}`,
      url: window.location.href // Sharing current app URL as context
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed', err);
      }
    } else {
      // Fallback to clipboard
      handleCopy();
    }
  };

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
          
          {/* Products / Services Section */}
          <div className="col-span-1 md:col-span-12">
             <BentoCard delay={0.6}>
                <div className="flex items-center gap-2 mb-6 text-accent">
                  <Package size={18} />
                  <h3 className="text-sm uppercase tracking-wider">Signature Offerings</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {concept.products.map((product, index) => (
                    <div key={index} className="group border-l border-white/10 pl-6 hover:border-accent transition-colors">
                      <h4 className="font-serif text-xl text-white mb-2 group-hover:text-accent transition-colors">
                        {product.name}
                      </h4>
                      <span className="text-xs uppercase tracking-widest text-white/40 mb-2 block">{product.pricePoint}</span>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  ))}
                </div>
             </BentoCard>
          </div>
          
          {/* Action Bar */}
          <div className="col-span-1 md:col-span-12 mt-8 flex flex-wrap justify-center gap-4">
            {/* Export Markdown + Image */}
            <button 
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-void hover:bg-gray-200 transition-colors text-sm uppercase tracking-widest font-medium min-w-[180px] justify-center"
            >
              {downloaded ? <Check size={16} /> : <FileText size={16} />}
              {downloaded ? 'Saved' : 'Export Kit (.md)'}
            </button>
            
            {/* Export JSON */}
             <button 
              onClick={handleDownloadJSON}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm uppercase tracking-widest min-w-[180px] justify-center"
            >
              {jsonDownloaded ? <Check size={16} /> : <FileJson size={16} />}
              {jsonDownloaded ? 'Saved JSON' : 'JSON Data'}
            </button>
            
            {/* Share */}
             <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm uppercase tracking-widest min-w-[180px] justify-center"
            >
              <Share2 size={16} /> Share
            </button>
            
            {/* Copy */}
             <button 
               onClick={handleCopy}
               className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-sm uppercase tracking-widest min-w-[180px] justify-center"
             >
              {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
};