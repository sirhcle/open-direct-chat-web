import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { countryCodes } from '../data/constants';

import Header from './OpenDirectChat/Header';
import ChatPreview from './OpenDirectChat/ChatPreview';
import TemplateManager from './OpenDirectChat/TemplateManager';
import Footer from './OpenDirectChat/Footer';

export default function OpenDirectChat() {
  // --- ESTADOS ---
  const [activeTab, setActiveTab] = useState('generator'); 
  const [isDark, setIsDark] = useState(false);
  
  const [prefix, setPrefix] = useState('+52');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  
  const qrRef = useRef(null);

  // --- EFECTOS ---
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    const savedHistory = localStorage.getItem('waLinkHistory');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    
    const savedTemplates = localStorage.getItem('waLinkTemplates');
    if (savedTemplates) setTemplates(JSON.parse(savedTemplates));

    setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []);

  // --- FUNCIONES LÓGICAS ---
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  useEffect(() => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length > 0) {
      const fullNumber = prefix.replace('+', '') + cleanPhone;
      const encodedMessage = encodeURIComponent(message);
      setGeneratedUrl(`https://wa.me/${fullNumber}?text=${encodedMessage}`);
      setCopied(false);
    } else {
      setGeneratedUrl('');
    }
  }, [prefix, phone, message]);

  const addToHistory = () => {
    const newItem = { id: Date.now(), prefix, phone, message };
    const newHistory = [newItem, ...history.filter(item => item.phone !== phone)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('waLinkHistory', JSON.stringify(newHistory));
  };

  const handleAction = (action) => {
    if (!generatedUrl) return;
    addToHistory();

    if (action === 'open') window.open(generatedUrl, '_blank');
    
    if (action === 'copy') {
      navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }

    if (action === 'download' && qrRef.current) {
        const svg = qrRef.current.querySelector("svg");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const downloadLink = document.createElement("a");
          downloadLink.download = `whatsapp-qr-${phone}.png`;
          downloadLink.href = canvas.toDataURL("image/png");
          downloadLink.click();
        };
    }
  };

  const loadFromHistory = (item) => {
    setPrefix(item.prefix);
    setPhone(item.phone);
    setMessage(item.message);
    setActiveTab('generator');
  };

  const selectTemplate = (temp) => {
    setPrefix(temp.prefix);
    setMessage(temp.message);
    setActiveTab('generator');
  };

  // --- RENDERIZADO ---
  return (
    // CAMBIO PRINCIPAL: max-w-md en mobile, pero md:max-w-5xl en desktop para ensanchar
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md md:max-w-5xl border border-gray-100 dark:border-gray-700 transition-colors duration-300 relative">
      
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-100 dark:border-gray-700">
        <button onClick={() => setActiveTab('generator')} className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${activeTab === 'generator' ? 'text-green-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
          Nuevo Mensaje {activeTab === 'generator' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-t-full"></div>}
        </button>
        <button onClick={() => setActiveTab('templates')} className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${activeTab === 'templates' ? 'text-green-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
          Mis Plantillas {activeTab === 'templates' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-t-full"></div>}
        </button>
      </div>

      {/* VISTA GENERADOR: LAYOUT DIVIDIDO EN DESKTOP */}
      {activeTab === 'generator' && (
        <div className="animate-fade-in grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* COLUMNA IZQUIERDA (Inputs y Acciones) - Ocupa 5/12 del espacio en desktop */}
          <div className="md:col-span-5 space-y-6">
            <form onSubmit={(e) => { e.preventDefault(); handleAction('open'); }} className="space-y-4">
              <div>
                 <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Número</label>
                 <div className="flex shadow-sm rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-green-500 transition">
                    <select value={prefix} onChange={(e) => setPrefix(e.target.value)} className="bg-gray-50 dark:bg-gray-700 dark:text-white px-2 py-3 text-gray-700 outline-none border-r border-gray-200 dark:border-gray-600 text-sm cursor-pointer hover:bg-gray-100">
                      {countryCodes.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                    </select>
                    <input type="tel" placeholder="123 456 7890" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={12} className="flex-1 px-4 py-3 outline-none text-gray-700 dark:text-white dark:bg-gray-700 dark:placeholder-gray-400" />
                </div>
              </div>
              
              <div>
                 <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Mensaje</label>
                 <textarea rows="4" placeholder="Escribe tu mensaje..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition resize-none" />
              </div>

              <button type="submit" disabled={!phone} className={`w-full font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${phone ? 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-[1.02] shadow-green-500/30' : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-400 cursor-not-allowed'}`}>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> Abrir Chat
              </button>

              {generatedUrl && (
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => handleAction('copy')} className="py-2 px-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition flex items-center justify-center gap-2">
                    {copied ? <span className="text-green-500">✓ Copiado</span> : 'Copiar Link'}
                  </button>
                  <button type="button" onClick={() => handleAction('download')} className="py-2 px-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition flex items-center justify-center gap-2">
                    Bajar QR
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* COLUMNA DERECHA (Resultados y Contexto) - Ocupa 7/12 del espacio */}
          <div className="md:col-span-7 space-y-6 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 pt-6 md:pt-0 md:pl-8">
             
             {/* Vista previa del Chat */}
             <div>
                <ChatPreview message={message} currentTime={currentTime} />
                {!message && (
                  <div className="text-center py-8 text-gray-400 text-sm bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-dashed border-gray-200 dark:border-gray-600">
                    <p>Escribe un mensaje para ver la vista previa</p>
                  </div>
                )}
             </div>

             {/* Grid para Historial y QR */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Historial */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Recientes</h3>
                    {history.length > 0 && <button onClick={() => { setHistory([]); localStorage.removeItem('waLinkHistory'); }} className="text-xs text-red-400 hover:underline">Borrar</button>}
                  </div>
                  {history.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">No hay historial reciente.</p>
                  ) : (
                    <div className="space-y-2">
                      {history.map((item) => (
                        <div key={item.id} onClick={() => loadFromHistory(item)} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition group border border-transparent hover:border-green-200 dark:hover:border-green-800">
                          <div className="flex flex-col overflow-hidden"><span className="text-gray-800 dark:text-gray-200 font-medium font-mono text-xs">{item.prefix} {item.phone}</span><span className="text-[10px] text-gray-400 truncate">{item.message || "Sin mensaje"}</span></div>
                          <div className="text-gray-300 group-hover:text-green-500 transition scale-75">⚡️</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center justify-center">
                  {generatedUrl ? (
                    <div className="animate-fade-in flex flex-col items-center">
                      <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">Escanea el QR</p>
                      <div ref={qrRef} className="p-2 bg-white rounded-lg shadow-sm border border-gray-200"><QRCodeSVG value={generatedUrl} size={100} level={"M"} /></div>
                    </div>
                  ) : (
                    <div className="h-32 w-full flex items-center justify-center text-gray-300 text-xs border border-dashed border-gray-200 dark:border-gray-600 rounded-xl">
                      QR Pendiente
                    </div>
                  )}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* VISTA PLANTILLAS */}
      {activeTab === 'templates' && (
        <TemplateManager templates={templates} setTemplates={setTemplates} onSelect={selectTemplate} />
      )}

      <Footer />
    </div>
  );
}