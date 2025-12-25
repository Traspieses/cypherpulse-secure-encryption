
import React from 'react';
import { Info, ShieldCheck, Zap, Globe } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <section className="mt-12 border-t border-slate-800 pt-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
          <Info size={24} />
        </div>
        <h2 className="text-2xl font-sci-fi font-bold text-white tracking-tight">CÓMO FUNCIONA ESTE PROTOCOLO</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
          <ShieldCheck className="text-cyan-400 mb-4" size={32} />
          <h3 className="text-cyan-100 font-bold mb-2 uppercase text-sm">AES-GCM 256-bit</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Utilizamos el estándar de encriptación más avanzado del mundo. El modo GCM no solo cifra el texto, sino que también verifica su integridad, asegurando que nadie haya manipulado los datos.
          </p>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-colors">
          <Zap className="text-blue-400 mb-4" size={32} />
          <h3 className="text-blue-100 font-bold mb-2 uppercase text-sm">PBKDF2 Derivación</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Tu contraseña nunca se guarda directamente. Se somete a 100,000 iteraciones de hashing con una "sal" (salt) aleatoria para crear una llave maestra extremadamente difícil de hackear por fuerza bruta.
          </p>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-fuchsia-500/30 transition-colors">
          <Globe className="text-fuchsia-400 mb-4" size={32} />
          <h3 className="text-fuchsia-100 font-bold mb-2 uppercase text-sm">Privacidad Local</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Todo el procesamiento ocurre exclusivamente en tu navegador (Client-Side). Tus datos y llaves nunca salen de tu dispositivo, garantizando total soberanía sobre tu información.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
