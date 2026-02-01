
import React, { useState } from 'react';
import { generateCampaignText, generateCampaignImage } from './geminiService';
import { EmailCampaign, ImageResolution } from './types';
import Button from './Button';

const CampaignGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaign, setCampaign] = useState<EmailCampaign | null>(null);
  const [resolution, setResolution] = useState<ImageResolution>('1K');
  const [isImageGenerating, setIsImageGenerating] = useState(false);

  const handleGenerateText = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const result = await generateCampaignText(prompt);
      setCampaign(result);
    } catch (err) {
      console.error(err);
      alert("Failed to generate campaign copy. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!campaign?.visualPrompt) return;

    // Check for API key selection
    if (typeof window.aistudio !== 'undefined') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        // Proceeding as per instructions: assume success after call
      }
    }

    setIsImageGenerating(true);
    try {
      const imgUrl = await generateCampaignImage(campaign.visualPrompt, resolution);
      setCampaign(prev => prev ? { ...prev, imageUrl: imgUrl } : null);
    } catch (err: any) {
      if (err.message === "AUTH_REQUIRED") {
        await window.aistudio.openSelectKey();
      } else {
        alert("Image generation failed. This might be due to API limits or safety filters.");
      }
    } finally {
      setIsImageGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10 mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Create a New Campaign</h2>
        <p className="text-slate-500 mb-8">Describe your product, promotion, or event, and we'll handle the rest.</p>
        
        <div className="space-y-4">
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Summer clearance sale for an eco-friendly yoga wear brand. Offering 40% off everything."
            className="w-full h-32 p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all resize-none text-lg"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleGenerateText} 
              isLoading={isGenerating}
              className="w-full md:w-auto px-10 py-4 text-lg"
            >
              Generate Copy & Ideas
            </Button>
          </div>
        </div>
      </div>

      {campaign && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Subject Lines
              </h3>
              <div className="space-y-3">
                {campaign.subjectLines.map((s, i) => (
                  <div key={i} className="p-3 bg-indigo-50 text-indigo-900 rounded-xl border border-indigo-100 text-sm font-medium">
                    {s}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Body
              </h3>
              <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100 italic">
                {campaign.bodyCopy}
              </div>
            </section>
            
            <section className="bg-slate-900 p-6 rounded-3xl shadow-lg text-white">
              <h3 className="text-xl font-bold mb-4">Strategy Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Target Audience</p>
                  <p className="text-sm">{campaign.targetAudience}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Tone</p>
                  <p className="text-sm">{campaign.tone}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center">
              <h3 className="text-xl font-bold text-slate-900 mb-4 w-full flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Campaign Visual
              </h3>
              
              <div className="w-full aspect-video bg-slate-100 rounded-2xl overflow-hidden mb-6 relative border-2 border-dashed border-slate-200 flex items-center justify-center">
                {campaign.imageUrl ? (
                  <img src={campaign.imageUrl} alt="Generated Campaign Visual" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center px-6">
                    <p className="text-slate-400 text-sm mb-2">No visual generated yet.</p>
                    <p className="text-slate-400 text-xs">{campaign.visualPrompt.substring(0, 100)}...</p>
                  </div>
                )}
                {isImageGenerating && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="font-semibold text-slate-800">Creating high-res visual...</p>
                    <p className="text-xs text-slate-500 mt-2">Generating 4K marketing assets can take a few seconds.</p>
                  </div>
                )}
              </div>

              <div className="w-full space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm font-medium text-slate-600">Resolution</span>
                  <div className="flex gap-2">
                    {(['1K', '2K', '4K'] as ImageResolution[]).map(res => (
                      <button
                        key={res}
                        onClick={() => setResolution(res)}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                          resolution === res 
                            ? 'bg-indigo-600 text-white shadow-md' 
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        {res}
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleGenerateImage} 
                  isLoading={isImageGenerating}
                  variant="secondary"
                  className="w-full py-4"
                >
                  Generate 4K Visual
                </Button>
                
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                   <p className="text-xs text-indigo-700 flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>High-quality image generation requires your own API key. You will be prompted to select one from a paid project. Visit <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline font-bold">billing docs</a> for info.</span>
                   </p>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
               <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-widest text-center">Visual Brief</h3>
               <p className="text-xs text-slate-500 leading-relaxed text-center italic">
                 "{campaign.visualPrompt}"
               </p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignGenerator;
