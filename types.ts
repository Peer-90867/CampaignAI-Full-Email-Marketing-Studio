
export interface EmailCampaign {
  subjectLines: string[];
  bodyCopy: string;
  targetAudience: string;
  tone: string;
  visualPrompt: string;
  imageUrl?: string;
}

export type ImageResolution = '1K' | '2K' | '4K';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

/**
 * Define AIStudio interface to match the expected global type and resolve 
 * conflicts with existing declarations in the environment.
 */
export interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

declare global {
  interface Window {
    // Use the named AIStudio interface to satisfy the requirement that 'aistudio' must be of type 'AIStudio'
    aistudio: AIStudio;
  }
}
