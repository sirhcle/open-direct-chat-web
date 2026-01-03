import React from 'react';

export default function Footer() {

  const androidUrl = "https://play.google.com/store/apps/details?id=chr.sirhcleapps.sociallauncher";
  const iosUrl = "https://apps.apple.com/mx/app/open-direct-chat/id6755072807";

  return (
    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col items-center space-y-6 animate-fade-in">

      {/* SECCIÓN DE DESCARGA APP */}
      <div className="text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
          Disponible también en móvil
        </p>
        <div className="flex flex-wrap justify-center gap-3">

          {/* Botón Android */}
          <a
            href={androidUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Disponible en Google Play"
            className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-all transform hover:-translate-y-0.5 shadow-md"
          >
            {/* Icono Play Store */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.17,10.87C21.17,11.25 21.17,12.75 20.17,13.13L17.69,14.01L15.39,12L17.69,9.97L20.17,10.87M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" /></svg>
            <div className="text-left leading-none">
              <div className="text-[9px] uppercase font-medium opacity-80">Disponible en</div>
              <div className="text-xs font-bold">Google Play</div>
            </div>
          </a>

          {/* Botón iOS */}
          <a
            href={iosUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consíguelo en App Store"
            className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-all transform hover:-translate-y-0.5 shadow-md"
          >
            {/* Icono Apple */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" /></svg>
            <div className="text-left leading-none">
              <div className="text-[9px] uppercase font-medium opacity-80">Consíguelo en</div>
              <div className="text-xs font-bold">App Store</div>
            </div>
          </a>

        </div>
      </div>


      <a
        href="https://buymeacoffee.com/sirhcleapps"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Invítame un café"
        className="flex items-center gap-2 text-xs text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium pt-2"
      >
        <svg
          className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M18 8h1a4 4 0 010 8h-1" />
          <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
        ¿Te sirvió? Invítame un café
      </a>
    </div>
  );
}