import React, { useState } from 'react';
import { countryCodes } from '../../data/constants';

export default function TemplateManager({ templates, setTemplates, onSelect }) {
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrefix, setNewPrefix] = useState('+52');
  const [newMessage, setNewMessage] = useState('');

  const saveTemplate = (e) => {
    e.preventDefault();
    if (!newTitle || !newMessage) return;

    const newTemplate = {
      id: Date.now(),
      title: newTitle,
      prefix: newPrefix,
      message: newMessage
    };

    const updated = [newTemplate, ...templates];
    setTemplates(updated); // Actualizamos el estado del padre
    localStorage.setItem('waLinkTemplates', JSON.stringify(updated));

    setNewTitle('');
    setNewMessage('');
    setIsCreating(false);
  };

  const deleteTemplate = (id, e) => {
    e.stopPropagation();
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated);
    localStorage.setItem('waLinkTemplates', JSON.stringify(updated));
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-700 dark:text-white">Guardadas</h3>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${isCreating ? 'text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-900/20' : 'text-green-600 bg-green-50 hover:bg-green-100 dark:bg-green-900/20'}`}
        >
          {isCreating ? 'Cancelar' : '+ Nueva'}
        </button>
      </div>

      {isCreating && (
        <form onSubmit={saveTemplate} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 space-y-3">
          <input
            type="text"
            placeholder="Título (ej: Ventas)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-1 focus:ring-green-500"
            autoFocus
          />
          <div className="flex gap-2">
            <select
              value={newPrefix}
              onChange={(e) => setNewPrefix(e.target.value)}
              className="bg-white dark:bg-gray-700 dark:text-white px-2 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 outline-none"
            >
              {countryCodes.map((c) => (<option key={c.code} value={c.code}>{c.flag}</option>))}
            </select>
            <input
              type="text"
              placeholder="Mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <button type="submit" disabled={!newTitle || !newMessage} className="w-full py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-black disabled:opacity-50">Guardar</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((temp) => (
          <div
            key={temp.id}
            onClick={() => onSelect(temp)}
            className="group relative p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500 shadow-sm hover:shadow-md transition-all cursor-pointer h-full"
          >
            {/* ... contenido de la tarjeta igual ... */}
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white">{temp.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{temp.message}</p>
              </div>
              <span className="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded text-gray-500 dark:text-gray-300 font-mono">{temp.prefix}</span>
            </div>
            <button
              onClick={(e) => deleteTemplate(temp.id, e)}
              // CAMBIO IMPORTANTE AQUÍ ABAJO:
              className="absolute -top-2 -right-2 bg-red-100 text-red-500 p-2 rounded-full shadow-sm hover:bg-red-200 transition-opacity z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100"
              title="Eliminar plantilla"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}