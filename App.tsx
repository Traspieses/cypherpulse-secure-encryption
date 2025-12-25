
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import CryptoForm from './components/CryptoForm';
import ResultDisplay from './components/ResultDisplay';
import InfoSection from './components/InfoSection';
import { encryptText, decryptText } from './services/cryptoService';
import { CryptoResult, AppStatus } from './types';
import { ShieldCheck, Cpu, Terminal } from 'lucide-react';

const App: React.FC = () => {
  const [passphrase, setPassphrase] = useState('');
  const [text, setText] = useState('');
  const [result, setResult] = useState<CryptoResult | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);

  const handleEncrypt = useCallback(async () => {
    if (!passphrase || !text) return;
    setStatus(AppStatus.PROCESSING);
    try {
      const encrypted = await encryptText(text, passphrase);
      setResult({
        text: encrypted,
        type: 'encrypted',
        timestamp: Date.now()
      });
      setStatus(AppStatus.SUCCESS);
    } catch (err) {
      setResult({
        text: 'Fallo crítico en el proceso de encriptación.',
        type: 'error',
        timestamp: Date.now()
      });
      setStatus(AppStatus.ERROR);
    }
  }, [passphrase, text]);

  const handleDecrypt = useCallback(async () => {
    if (!passphrase || !text) return;
    setStatus(AppStatus.PROCESSING);
    try {
      const decrypted = await decryptText(text, passphrase);
      setResult({
        text: decrypted,
        type: 'decrypted',
        timestamp: Date.now()
      });
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      setResult({
        text: err.message || 'Error desconocido al desencriptar.',
        type: 'error',
        timestamp: Date.now()
      });
      setStatus(AppStatus.ERROR);
    }
  }, [passphrase, text]);

  return (
    <div className="min-h-screen cyber-grid pb-20 selection:bg-cyan-500 selection:text-white">
      {/* Elementos decorativos de fondo */}
      <div className="fixed top-0 right-0 w-[40vw] h-[40vh] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[40vw] h-[40vh] bg-fuchsia-600/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <Header />

      <main className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Columna Izquierda: Imagen e Intro */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 aspect-[4/5]">
                <img 
                  src="https://picsum.photos/id/1081/800/1000?grayscale" 
                  alt="Cyber Security Concept" 
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-cyan-400 font-sci-fi text-xs mb-2 animate-pulse">
                    <Terminal size={14} />
                    <span>SYSTEM_ACTIVE // SHIELD_UP</span>
                  </div>
                  <h2 className="text-2xl font-bold font-sci-fi text-white leading-tight">
                    PROTEGE TU LEGADO DIGITAL
                  </h2>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-fuchsia-400">
                <Cpu size={20} />
                <span className="font-sci-fi text-xs uppercase tracking-widest">Estado del Núcleo</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    status === AppStatus.PROCESSING ? 'bg-cyan-500 animate-pulse w-full' : 
                    status === AppStatus.SUCCESS ? 'bg-emerald-500 w-full' :
                    status === AppStatus.ERROR ? 'bg-red-500 w-full' : 'bg-slate-700 w-1/4'
                  }`}
                ></div>
              </div>
              <p className="text-slate-400 text-sm italic">
                {status === AppStatus.IDLE && "> Esperando comandos de usuario..."}
                {status === AppStatus.PROCESSING && "> Procesando vectores criptográficos..."}
                {status === AppStatus.SUCCESS && "> Operación completada con éxito."}
                {status === AppStatus.ERROR && "> Advertencia: Inconsistencia en los datos detectada."}
              </p>
            </div>
          </div>

          {/* Columna Derecha: El Formulario y Resultados */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
            {/* Decoración técnica en esquinas */}
            <div className="absolute top-0 right-0 p-4 opacity-30">
              <ShieldCheck size={40} className="text-cyan-500" />
            </div>

            <CryptoForm 
              passphrase={passphrase}
              setPassphrase={setPassphrase}
              text={text}
              setText={setText}
              onEncrypt={handleEncrypt}
              onDecrypt={handleDecrypt}
              isLoading={status === AppStatus.PROCESSING}
            />

            <ResultDisplay result={result} />
          </div>
        </div>

        <InfoSection />
      </main>

      <footer className="mt-20 border-t border-slate-900 bg-black/50 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="font-sci-fi text-xs text-slate-500 tracking-[0.3em] uppercase">
            CypherPulse v1.0.4 // Zero-Knowledge Protocol
          </p>
          <p className="mt-4 text-slate-600 text-sm">
            Diseñado para la resistencia digital. No se almacenan datos.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
