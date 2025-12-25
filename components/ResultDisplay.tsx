
import React, { useState } from 'react';
import { Copy, Check, Terminal, History } from 'lucide-react';
import { CryptoResult } from '../types';

interface ResultDisplayProps {
  result: CryptoResult | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isError = result.type === 'error';
  
  return (
    <div className={`mt-10 p-1 rounded-lg ${
      isError 
      ? 'bg-red-500/20 border border-red-500/50' 
      : 'bg-emerald-500/20 border border-emerald-500/50'
    } animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <div className="bg-slate-900 rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className={`font-sci-fi text-sm font-bold flex items-center gap-2 ${
            isError ? 'text-red-400' : 'text-emerald-400'
          }`}>
            <Terminal size={16} />
            {isError ? 'ERROR DE PROTOCOLO' : 'RESULTADO DEL PROCESO'}
          </h3>
          <div className="flex gap-2">
            {!isError && (
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-slate-800 rounded transition-colors text-cyan-400"
                title="Copiar al portapapeles"
              >
                {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
              </button>
            )}
          </div>
        </div>

        <div className={`font-mono text-sm break-all whitespace-pre-wrap p-4 rounded border border-slate-800 ${
          isError ? 'text-red-300' : 'text-slate-300'
        } bg-black/40`}>
          {result.text}
        </div>

        <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
          <History size={10} />
          Ejecutado a las: {new Date(result.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
