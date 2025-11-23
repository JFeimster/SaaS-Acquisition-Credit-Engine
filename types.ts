export interface BrandPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface BrandConcept {
  name: string;
  tagline: string;
  description: string;
  targetAudience: string;
  palette: BrandPalette;
  vibe: string;
  marketingCopy: string;
}

export interface GeneratedAsset {
  concept: BrandConcept | null;
  imageUrl: string | null;
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING_TEXT = 'GENERATING_TEXT',
  GENERATING_IMAGE = 'GENERATING_IMAGE',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}
