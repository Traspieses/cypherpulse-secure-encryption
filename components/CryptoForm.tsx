
import React from 'react';
import { Shield, Key, FileText, Lock, Unlock } from 'lucide-react';

interface CryptoFormProps {
  passphrase: string;
  setPassphrase: (val: string) => void;
  text: string;
  setText: (val: string) => void;
  onEncrypt: () => void;
  onDecrypt: () => void;
  isLoading: boolean;
}

const CryptoForm: React.FC<CryptoFormProps> = ({
  passphrase,
  setPassphrase,
  text,
  setText,
  onEncrypt,
  onDecrypt,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <div className="relative group">
        <label className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-2 ml-1 tracking-wider uppercase">
          <Key size={16} /> Clave de Acceso (Passphrase)
        </label>
        <div className="relative">
          <input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Introduce tu clave secreta..."
            className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-500 text-white p-4 rounded-lg outline-none transition-all duration-300 placeholder:text-slate-600 focus:ring-1 focus:ring-cyan-500/50"
          />
        </div>
      </div>

      <div className="relative group">
        <label className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-2 ml-1 tracking-wider uppercase">
          <FileText size={16} /> Mensaje Secreto / Hash Cifrado
        </label>
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe el texto a encriptar o el código a desencriptar..."
            rows={5}
            className="w-full bg-slate-900/80 border border-slate-700 focus:border-cyan-500 text-white p-4 rounded-lg outline-none transition-all duration-300 placeholder:text-slate-600 focus:ring-1 focus:ring-cyan-500/50 resize-none font-mono text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <button
          onClick={onEncrypt}
          disabled={isLoading || !passphrase || !text}
          className="cyber-button flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold py-4 px-6 rounded shadow-lg shadow-cyan-950 hover:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <Lock size={20} className="group-hover:rotate-12 transition-transform" />
          ENCRIPTAR DATOS
        </button>
        <button
          onClick={onDecrypt}
          disabled={isLoading || !passphrase || !text}
          className="cyber-button flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white font-bold py-4 px-6 rounded shadow-lg shadow-fuchsia-950 hover:shadow-fuchsia-500/20 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <Unlock size={20} className="group-hover:-rotate-12 transition-transform" />
          DESENCRIPTAR DATOS
        </button>
      </div>
    </div>
  );
};

export default CryptoForm;
