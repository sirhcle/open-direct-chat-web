import React from 'react';

export default function ChatPreview({ message, currentTime }) {
  if (!message) return null;

  return (
    <div className="my-4 animate-fade-in">
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 text-center">Vista Previa</label>
      <div className="rounded-xl p-4 bg-[#EFE7DD] dark:bg-[#0b141a] border border-gray-200 dark:border-gray-700 relative overflow-hidden shadow-inner">
        <div className="flex flex-col items-end">
          <div className="bg-[#d9fdd3] dark:bg-[#005c4b] p-2 px-3 rounded-lg rounded-tr-none shadow-sm max-w-[90%] text-left">
              <p className="text-[15px] text-gray-800 dark:text-gray-100 leading-snug whitespace-pre-wrap break-words">{message}</p>
              <div className="flex justify-end items-center gap-1 mt-1 select-none">
                <span className="text-[10px] text-gray-500 dark:text-gray-300/80">{currentTime}</span>
                <svg className="w-3 h-3 text-blue-500" viewBox="0 0 16 11" fill="none"><path d="M11.3 8.99999L15.609 2.65599C15.757 2.43899 15.721 2.14599 15.527 1.97299L14.871 1.38899C14.665 1.20499 14.348 1.21999 14.161 1.42399L10.646 5.23399L10.217 5.80499L9.28801 4.75999L9.30701 4.72999L10.641 3.22699L12.089 1.59599L11.433 1.01199C11.227 0.827988 10.91 0.842988 10.723 1.04699L5.94401 6.42899L5.47101 6.96199L5.55701 5.53399L5.59001 4.98899L5.59301 4.95199L5.63501 4.24999L5.65301 3.95299L5.66301 3.78899C5.68101 3.50199 5.45301 3.26199 5.16601 3.26199H4.26701C4.00701 3.26199 3.79301 3.46099 3.76901 3.71999L3.42301 7.52899L1.17901 5.65799C0.970007 5.48299 0.655007 5.51399 0.481007 5.72199L0.0640074 6.22199C-0.109993 6.43099 -0.0789926 6.74599 0.130007 6.91999L4.18001 10.296C4.35601 10.443 4.61401 10.433 4.77901 10.275L7.81901 7.36999L8.63201 8.28499L5.30601 11.462C5.14101 11.619 5.13201 11.878 5.28701 12.045L5.76701 12.562C5.92301 12.729 6.18201 12.739 6.34801 12.581L11.3 8.99999Z" fill="currentColor"/></svg>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}