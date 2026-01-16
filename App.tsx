
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { BusLine, LineType, Stop } from './types';
import { Icons, MOCK_LINES, OFFICIAL_SOURCES } from './constants';

// --- Componente de Login ---

const LoginView: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'passteste@gmail.com' && password === 'passteste') {
      onLogin();
    } else {
      setError('Credenciais incorretas. Tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 z-[500] bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="flex flex-col items-center mb-12">
          <div className="bg-blue-600 p-5 rounded-[32px] text-white shadow-2xl mb-4">
            <Icons.Bus />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white">andaÊ</h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mt-1">Sua Mobilidade Inteligente</p>
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Usuário</label>
            <input 
              type="email"
              placeholder="Ex: seuemail@gmail.com"
              className="w-full bg-gray-50 dark:bg-zinc-900 border-2 border-gray-100 dark:border-zinc-800 p-5 rounded-3xl font-bold focus:outline-none focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Senha</label>
            <input 
              type="password"
              placeholder="Sua senha secreta"
              className="w-full bg-gray-50 dark:bg-zinc-900 border-2 border-gray-100 dark:border-zinc-800 p-5 rounded-3xl font-bold focus:outline-none focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs font-black text-center mt-2 animate-bounce">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-black py-5 rounded-3xl uppercase tracking-widest shadow-xl active:scale-95 transition-all mt-4"
          >
            Entrar no App
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">© 2026 andaÊ - Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};

// --- Subcomponentes de UI ---

const TabButton: React.FC<{ active: boolean; label: string; onClick: () => void }> = ({ active, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-none px-4 py-3 text-[11px] font-black uppercase tracking-tight transition-all border-b-4 whitespace-nowrap ${active ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400'}`}
  >
    {label}
  </button>
);

const AccessibleCloseButton: React.FC<{ onClick: () => void; label?: string; variant?: 'default' | 'danger' }> = ({ onClick, label = "Fechar", variant = 'default' }) => (
  <button 
    onClick={onClick} 
    aria-label={`Fechar ${label}`}
    className={`flex items-center gap-2 group p-2 rounded-2xl transition-all ${variant === 'danger' ? 'hover:bg-red-50 dark:hover:bg-red-950/30' : 'hover:bg-gray-100 dark:hover:bg-zinc-800'}`}
  >
    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${variant === 'danger' ? 'text-red-400 group-hover:text-red-600' : 'text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>{label}</span>
    <div className={`w-10 h-10 flex items-center justify-center rounded-xl group-active:scale-90 transition-transform ${variant === 'danger' ? 'bg-red-100 dark:bg-red-900/40' : 'bg-gray-100 dark:bg-zinc-800'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={variant === 'danger' ? 'text-red-600' : 'text-gray-600 dark:text-gray-300'}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </div>
  </button>
);

// --- Telas Principais ---

const ExplorarView: React.FC<{ 
  activeTab: string; 
  setActiveTab: (t: any) => void;
  onSelectLine: (l: BusLine) => void;
  onOpenLineSearch: () => void;
}> = ({ activeTab, setActiveTab, onSelectLine, onOpenLineSearch }) => {
  const displayResults = useMemo(() => {
    let filtered = MOCK_LINES;
    if (activeTab === 'move') filtered = MOCK_LINES.filter(l => l.type === LineType.MOVE);
    else if (activeTab === 'metro') filtered = MOCK_LINES.filter(l => l.type === LineType.METRO);
    else if (activeTab === 'otimo') filtered = MOCK_LINES.filter(l => l.type === LineType.OTIMO);
    else if (activeTab === 'bhbus') filtered = MOCK_LINES.filter(l => l.type === LineType.BHBUS);
    
    return activeTab === 'all' ? filtered.slice(0, 10) : filtered;
  }, [activeTab]);

  return (
    <div className="animate-in fade-in duration-500 pb-6">
      <div className="mt-2 overflow-x-auto no-scrollbar px-5">
        <div className="flex bg-white dark:bg-zinc-900 rounded-2xl p-1 shadow-sm border border-gray-100 dark:border-zinc-800 min-w-max">
          <TabButton active={activeTab === 'all'} label="Tudo" onClick={() => setActiveTab('all')} />
          <TabButton active={activeTab === 'move'} label="Move" onClick={() => setActiveTab('move')} />
          <TabButton active={activeTab === 'metro'} label="Metrô" onClick={() => setActiveTab('metro')} />
          <TabButton active={activeTab === 'otimo'} label="Ótimo" onClick={() => setActiveTab('otimo')} />
          <TabButton active={activeTab === 'bhbus'} label="BH Bus" onClick={() => setActiveTab('bhbus')} />
        </div>
      </div>

      <div className="mt-6 space-y-4 px-5">
        <h2 className="text-lg font-black tracking-tight text-gray-900 dark:text-gray-100 px-1">
          {activeTab === 'all' ? 'Linhas Populares' : 'Resultados'}
        </h2>

        <div className="grid gap-3">
          {displayResults.map(line => (
            <div 
              key={line.id}
              onClick={() => onSelectLine(line)}
              className="bg-white dark:bg-zinc-900 p-5 rounded-[28px] border-2 border-gray-50 dark:border-zinc-800 shadow-sm active:scale-[0.98] transition-all cursor-pointer flex items-center gap-4"
            >
              <div 
                className="w-14 h-14 rounded-[20px] flex flex-col items-center justify-center text-white font-black shadow-md shrink-0"
                style={{ backgroundColor: line.color }}
              >
                <span className="text-base leading-none">{line.number}</span>
                <span className="text-[7px] mt-0.5 opacity-80 uppercase tracking-tighter font-bold">
                  {line.city.substring(0, 3)}
                </span>
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-black text-gray-900 dark:text-gray-100 leading-tight truncate text-base">{line.name}</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-0.5">{line.type}</p>
              </div>
              <div className="text-gray-950 dark:text-gray-400">
                <Icons.ArrowRight />
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={onOpenLineSearch}
          className="w-full mt-4 bg-white dark:bg-zinc-900 p-5 rounded-[28px] border-2 border-dashed border-gray-200 dark:border-zinc-800 text-gray-400 hover:text-blue-500 transition-all flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs"
        >
          <Icons.Search /> Pesquisar Linha Específica
        </button>
      </div>
    </div>
  );
};

const RoutePlanningView: React.FC<{
  onClose: () => void;
  onCommit: (dest: string) => void;
  history: string[];
}> = ({ onClose, onCommit, history }) => {
  const [origin, setOrigin] = useState('Minha Localização');
  const [destination, setDestination] = useState('');

  return (
    <div className="fixed inset-0 z-[150] bg-white dark:bg-zinc-950 animate-in slide-in-from-right duration-300 flex flex-col p-6">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 bg-gray-50 dark:bg-zinc-900 rounded-full text-gray-900 dark:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          </button>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Planejar Rota</h2>
        </div>
        <AccessibleCloseButton onClick={onClose} label="Fechar" />
      </header>

      <div className="space-y-4 bg-gray-50 dark:bg-zinc-900 p-6 rounded-[32px] border-2 border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-4 border-b border-gray-200 dark:border-zinc-700 pb-4">
           <div className="w-3 h-3 rounded-full bg-blue-500 shrink-0"></div>
           <input 
             className="bg-transparent border-none w-full text-base font-bold focus:outline-none text-gray-900 dark:text-gray-100"
             value={origin}
             onChange={(e) => setOrigin(e.target.value)}
             placeholder="De onde você sai?"
           />
        </div>
        <div className="flex items-center gap-4 pt-2">
           <div className="w-3 h-3 rounded-sm bg-orange-500 shrink-0"></div>
           <input 
             autoFocus
             className="bg-transparent border-none w-full text-base font-bold focus:outline-none text-gray-900 dark:text-gray-100"
             value={destination}
             onChange={(e) => setDestination(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && onCommit(destination)}
             placeholder="Para onde quer ir?"
           />
        </div>
      </div>

      <button 
        onClick={() => onCommit(destination)}
        className="w-full mt-6 bg-blue-600 text-white font-black py-5 rounded-[24px] uppercase tracking-widest shadow-xl active:scale-95 transition-all"
      >
        Traçar Caminho
      </button>

      {history.length > 0 && (
        <div className="mt-10 flex-1 overflow-y-auto no-scrollbar">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Histórico Recente</h3>
          <div className="space-y-2">
            {history.map((h, i) => (
              <button 
                key={i} 
                onClick={() => onCommit(h)}
                className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-[24px] transition-all border border-transparent hover:border-gray-100 dark:hover:border-zinc-700 text-left"
              >
                <Icons.History />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{h}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const LineSearchView: React.FC<{
  onClose: () => void;
  onSelectLine: (l: BusLine) => void;
  history: string[];
}> = ({ onClose, onSelectLine, history }) => {
  const [query, setQuery] = useState('');

  const suggestions = useMemo(() => {
    if (!query) return [];
    return MOCK_LINES.filter(l => 
      l.number.startsWith(query) || 
      l.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
  }, [query]);

  return (
    <div className="fixed inset-0 z-[160] bg-white dark:bg-zinc-950 animate-in slide-in-from-bottom duration-300 flex flex-col">
      <header className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between gap-3">
        <div className="flex-1 bg-gray-50 dark:bg-zinc-900 rounded-xl flex items-center px-4 gap-2 border-2 border-gray-100 dark:border-zinc-800 focus-within:border-blue-500 transition-all">
          <Icons.Search />
          <input 
            autoFocus
            className="bg-transparent border-none w-full py-3 text-sm font-bold focus:outline-none text-gray-900 dark:text-gray-100"
            placeholder="Nº ou nome da linha..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <AccessibleCloseButton onClick={onClose} label="Fechar" />
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {query ? (
          <div className="space-y-2">
            {suggestions.map(line => (
              <button 
                key={line.id}
                onClick={() => onSelectLine(line)}
                className="w-full flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[20px] hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-[10px]" style={{ backgroundColor: line.color }}>{line.number}</div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-black text-gray-900 dark:text-gray-100 leading-none text-sm truncate">{line.name}</p>
                  <p className="text-[8px] font-bold text-gray-400 uppercase mt-1">{line.type}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-300 font-bold text-sm">Digite acima para pesquisar uma linha específica.</div>
        )}
      </div>
    </div>
  );
};

const MapaView: React.FC<{ activeRoute?: string | null; onClear: () => void }> = ({ activeRoute, onClear }) => {
  const [offset, setOffset] = useState({ x: -100, y: -100 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    
    // Limitar o pan para manter o usuário sempre dentro da área visível aproximada
    setOffset(prev => ({
      x: Math.max(-400, Math.min(200, prev.x + dx)),
      y: Math.max(-400, Math.min(200, prev.y + dy))
    }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = () => setIsDragging(false);

  return (
    <div className="absolute inset-0 top-0 bottom-0 bg-gray-100 dark:bg-zinc-950 flex items-center justify-center overflow-hidden touch-none">
      {/* Máscara de Raio de 3km */}
      <div className="relative w-[120vw] h-[120vw] max-w-[600px] max-h-[600px] rounded-full overflow-hidden border-8 border-white/20 dark:border-zinc-800 shadow-[0_0_80px_rgba(0,0,0,0.1)] z-10">
        
        {/* Camada do Mapa Tátil */}
        <div 
          className="absolute w-[200%] h-[200%] transition-transform duration-75 ease-out cursor-grab active:cursor-grabbing"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Desenho do Mapa (BH Style) */}
          <svg className="w-full h-full opacity-60 dark:opacity-40" viewBox="0 0 1000 1000">
            <rect width="1000" height="1000" fill="#e2e8f0" className="dark:fill-zinc-900" />
            
            {/* Ruas Principais */}
            <path d="M0,200 L1000,200" stroke="#fff" strokeWidth="20" className="dark:stroke-zinc-800" />
            <path d="M0,500 L1000,500" stroke="#fff" strokeWidth="30" className="dark:stroke-zinc-800" />
            <path d="M0,800 L1000,800" stroke="#fff" strokeWidth="20" className="dark:stroke-zinc-800" />
            <path d="M200,0 L200,1000" stroke="#fff" strokeWidth="20" className="dark:stroke-zinc-800" />
            <path d="M500,0 L500,1000" stroke="#fff" strokeWidth="30" className="dark:stroke-zinc-800" />
            <path d="M800,0 L800,1000" stroke="#fff" strokeWidth="20" className="dark:stroke-zinc-800" />
            
            {/* Parques / Áreas Verdes */}
            <rect x="550" y="550" width="200" height="200" rx="20" fill="#bbf7d0" className="dark:fill-green-950/30" />
            <circle cx="150" cy="150" r="80" fill="#bbf7d0" className="dark:fill-green-950/30" />
            
            {/* Prédios / Blocos */}
            <rect x="250" y="250" width="100" height="80" rx="8" fill="#cbd5e1" className="dark:fill-zinc-700" />
            <rect x="380" y="250" width="80" height="120" rx="8" fill="#cbd5e1" className="dark:fill-zinc-700" />
            
            {/* Rota Ativa se houver */}
            {activeRoute && (
               <path d="M500,500 Q600,400 800,200" fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" strokeDasharray="20,10" className="animate-[dash_2s_linear_infinite]" />
            )}
          </svg>
        </div>

        {/* Pino de Localização Central Fixa */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
           <div className="relative">
              <div className="absolute inset-0 w-12 h-12 bg-blue-500/20 rounded-full animate-ping"></div>
              <div className="w-10 h-10 bg-blue-600 rounded-full border-4 border-white dark:border-zinc-900 shadow-xl flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="#3b82f6"/></svg>
              </div>
           </div>
        </div>

        {/* Destino Selecionado */}
        {activeRoute && (
           <div className="absolute z-20 pointer-events-none" style={{ top: '35%', left: '75%' }}>
              <div className="bg-orange-500 p-2 rounded-full border-2 border-white shadow-lg animate-bounce">
                <Icons.MapPin />
              </div>
           </div>
        )}
      </div>

      {/* Interface de Controle */}
      <div className="absolute inset-x-0 top-0 p-6 flex flex-col items-center gap-4 z-30 pointer-events-none">
        {activeRoute ? (
          <div className="w-full max-w-sm pointer-events-auto animate-in slide-in-from-top duration-500">
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-[28px] shadow-2xl border border-blue-50 dark:border-zinc-800 flex items-center gap-4">
              <div className="bg-blue-600 p-2.5 rounded-xl text-white">
                <Icons.MapPin />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Destino</p>
                <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 truncate">{activeRoute}</h4>
              </div>
              <button 
                onClick={onClear}
                className="bg-red-50 dark:bg-red-950/30 p-3 rounded-2xl text-red-600 active:scale-95 transition-all border border-red-100 dark:border-red-900/40"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-gray-100 dark:border-zinc-800 shadow-xl">
             <span className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 dark:text-gray-500">Visualizando raio de 3km</span>
          </div>
        )}
      </div>

      {/* Dica de Movimento */}
      <div className="absolute bottom-10 inset-x-0 flex justify-center pointer-events-none z-30">
        <div className="bg-black/10 dark:bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
           <svg className="animate-bounce" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg>
           <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Arraste para explorar</span>
           <svg className="animate-bounce" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<'explorar' | 'mapa' | 'favoritos'>('explorar');
  const [activeTab, setActiveTab] = useState<'all' | 'move' | 'metro' | 'otimo' | 'bhbus'>('all');
  const [isSearchingLine, setIsSearchingLine] = useState(false);
  const [isPlanningRoute, setIsPlanningRoute] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedLine, setSelectedLine] = useState<BusLine | null>(null);
  const [favorites, setFavorites] = useState<BusLine[]>([]);
  const [routeHistory, setRouteHistory] = useState<string[]>([]);
  const [searchHistoryLines, setSearchHistoryLines] = useState<string[]>([]);
  const [showLinks, setShowLinks] = useState(false);
  const [activeMapRoute, setActiveMapRoute] = useState<string | null>(null);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const savedLogin = localStorage.getItem('andae_logged_in');
    if (savedLogin === 'true') setIsLoggedIn(true);

    const savedRoutes = localStorage.getItem('andae_route_history');
    if (savedRoutes) setRouteHistory(JSON.parse(savedRoutes));
    const savedLines = localStorage.getItem('andae_line_history');
    if (savedLines) setSearchHistoryLines(JSON.parse(savedLines));
    
    const savedDarkMode = localStorage.getItem('andae_dark_mode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('andae_logged_in', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileOpen(false);
    localStorage.removeItem('andae_logged_in');
  };

  const toggleDarkMode = () => {
    const newVal = !isDarkMode;
    setIsDarkMode(newVal);
    localStorage.setItem('andae_dark_mode', String(newVal));
    if (newVal) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const toggleHighContrast = () => {
    const newVal = !isHighContrast;
    setIsHighContrast(newVal);
    if (newVal) document.documentElement.classList.add('high-contrast');
    else document.documentElement.classList.remove('high-contrast');
  };

  const adjustFont = (multiplier: number) => {
    setFontScale(multiplier);
    document.documentElement.style.setProperty('--font-multiplier', multiplier.toString());
  };

  const handleCommitRoute = (dest: string) => {
    if (!dest) return;
    const newHistory = [dest, ...routeHistory.filter(h => h !== dest)].slice(0, 5);
    setRouteHistory(newHistory);
    localStorage.setItem('andae_route_history', JSON.stringify(newHistory));
    setActiveMapRoute(dest);
    setIsPlanningRoute(false);
    setView('mapa');
  };

  const handleSelectLine = useCallback((line: BusLine) => {
    const newHistory = [line.number, ...searchHistoryLines.filter(h => h !== line.number)].slice(0, 5);
    setSearchHistoryLines(newHistory);
    localStorage.setItem('andae_line_history', JSON.stringify(newHistory));
    setSelectedLine(line);
    setIsSearchingLine(false);
  }, [searchHistoryLines]);

  const toggleFavorite = (line: BusLine) => {
    setFavorites(prev => prev.find(l => l.id === line.id) ? prev.filter(l => l.id !== line.id) : [...prev, line]);
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-zinc-950 font-sans text-gray-950 flex flex-col overflow-hidden transition-colors">
      <header className={`bg-white dark:bg-zinc-950 px-5 pt-6 pb-4 border-b-2 border-gray-50 dark:border-zinc-800 z-[100] shadow-sm shrink-0 transition-all duration-500 ${view === 'mapa' ? 'pb-2' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-2xl text-white shadow-lg">
              <Icons.Bus />
            </div>
            <div>
               <h1 className="text-2xl font-black tracking-tighter leading-none text-gray-900 dark:text-white">andaÊ</h1>
               <span className="text-[8px] font-black text-gray-400 uppercase tracking-[2px] mt-0.5 block">Mobilidade Urbana</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowLinks(!showLinks)} className="bg-gray-100 dark:bg-zinc-900 p-3 rounded-xl text-gray-950 dark:text-white active:scale-95 transition-transform"><Icons.ExternalLink /></button>
            <button onClick={() => setIsProfileOpen(true)} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 p-3 rounded-xl active:scale-95 transition-transform"><Icons.User /></button>
          </div>
        </div>

        {/* Oculta o "Para onde quer ir?" na aba de mapa */}
        {view !== 'mapa' && (
          <button 
            onClick={() => setIsPlanningRoute(true)}
            className="w-full bg-gray-50 dark:bg-zinc-900 border-2 border-gray-100 dark:border-zinc-800 p-4 rounded-[22px] flex items-center gap-3 active:bg-gray-100 dark:active:bg-zinc-800 transition-all text-left group"
          >
            <div className="w-3 h-3 rounded-sm bg-orange-500 group-active:scale-110 transition-transform shadow-sm"></div>
            <span className="text-sm font-black text-gray-400">Para onde você quer ir?</span>
          </button>
        )}
      </header>

      {isPlanningRoute && <RoutePlanningView onClose={() => setIsPlanningRoute(false)} onCommit={handleCommitRoute} history={routeHistory} />}
      {isSearchingLine && <LineSearchView onClose={() => setIsSearchingLine(false)} onSelectLine={handleSelectLine} history={searchHistoryLines} />}
      {isProfileOpen && (
        <PerfilView 
          onClose={() => setIsProfileOpen(false)} 
          onLogout={handleLogout}
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          isHighContrast={isHighContrast}
          toggleHighContrast={toggleHighContrast}
          fontScale={fontScale}
          adjustFont={adjustFont}
          notificationsEnabled={notificationsEnabled}
          toggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
        />
      )}

      {showLinks && (
        <div className="absolute top-[136px] left-0 right-0 bg-gray-950 text-white px-5 py-6 z-[100] animate-in slide-in-from-top shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 px-1">Links Úteis</h3>
            <button onClick={() => setShowLinks(false)} className="text-gray-400 p-1"><Icons.ChevronRight /></button>
          </div>
          <div className="space-y-2">
            {OFFICIAL_SOURCES.map(source => (
              <a key={source.name} href={source.url} target="_blank" className="flex items-center justify-between bg-white/10 p-4 rounded-2xl border border-white/5 text-xs font-black transition-colors hover:bg-white/20">{source.name} <Icons.ExternalLink /></a>
            ))}
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto no-scrollbar relative w-full max-w-xl mx-auto">
        {view === 'explorar' && (
          <ExplorarView 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onSelectLine={setSelectedLine} 
            onOpenLineSearch={() => setIsSearchingLine(true)}
          />
        )}
        {view === 'mapa' && <MapaView activeRoute={activeMapRoute} onClear={() => setActiveMapRoute(null)} />}
        {view === 'favoritos' && <FavoritosView favorites={favorites} onSelectLine={setSelectedLine} />}
      </main>

      <nav className="h-24 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-t-2 border-gray-50 dark:border-zinc-800 flex items-center justify-around px-4 z-[100] pb-safe shrink-0 transition-colors">
        <button onClick={() => setView('explorar')} className={`flex flex-col items-center gap-2 transition-all ${view === 'explorar' ? 'text-blue-600 scale-105' : 'text-gray-950 dark:text-gray-400 opacity-40'}`}>
          <Icons.Search /><span className="text-[9px] font-black uppercase">Explorar</span>
        </button>
        <button onClick={() => setView('mapa')} className={`flex flex-col items-center gap-2 transition-all ${view === 'mapa' ? 'text-blue-600 scale-105' : 'text-gray-950 dark:text-gray-400 opacity-40'}`}>
          <Icons.MapPin /><span className="text-[9px] font-black uppercase">Mapa</span>
        </button>
        <button onClick={() => setView('favoritos')} className={`flex flex-col items-center gap-2 transition-all ${view === 'favoritos' ? 'text-blue-600 scale-105' : 'text-gray-950 dark:text-gray-400 opacity-40'}`}>
          <Icons.Heart /><span className="text-[9px] font-black uppercase">Favoritos</span>
        </button>
      </nav>

      {selectedLine && (
        <div className="fixed inset-0 z-[250] flex items-end justify-center bg-gray-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-t-[48px] p-8 animate-in slide-in-from-bottom duration-300 overflow-y-auto max-h-[96vh] no-scrollbar shadow-3xl flex flex-col">
            <div className="w-12 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full mx-auto mb-6 shrink-0"></div>
            
            <div className="flex justify-between items-start mb-8 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-[24px] flex flex-col items-center justify-center text-white font-black text-2xl shadow-xl" style={{ backgroundColor: selectedLine.color }}>
                  {selectedLine.number}
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-2xl font-black leading-tight text-gray-900 dark:text-white tracking-tighter truncate">{selectedLine.name}</h2>
                  <button onClick={() => toggleFavorite(selectedLine)} className="mt-2 flex items-center gap-2 p-1.5 bg-gray-50 dark:bg-zinc-800 rounded-lg active:scale-95 transition-transform">
                    <Icons.Star filled={favorites.some(l => l.id === selectedLine.id)} />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Salvar</span>
                  </button>
                </div>
              </div>
              <AccessibleCloseButton onClick={() => setSelectedLine(null)} label="Voltar" variant="danger" />
            </div>

            <div className="flex-1 space-y-12 pb-10">
              <div>
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-[3px] mb-8 flex items-center gap-2"><Icons.MapPin /> Itinerário da Linha</h3>
                <div className="space-y-0 relative ml-6">
                   <div className="absolute left-[7px] top-2 bottom-2 w-1 bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
                   {(selectedLine.stops || []).map((stop, idx) => (
                     <div key={stop.id} className="flex gap-8 pb-8 last:pb-2 group relative">
                        <div className="relative shrink-0 z-10">
                          <div className={`w-4 h-4 rounded-full border-[3px] bg-white dark:bg-zinc-900 shadow-sm transition-colors ${idx === 0 || idx === (selectedLine.stops || []).length - 1 ? 'border-blue-600 scale-125' : 'border-gray-200 dark:border-zinc-700'}`}></div>
                        </div>
                        <div className="flex-1 overflow-hidden -mt-1">
                           <div className="flex justify-between items-start gap-3">
                              <p className="text-sm font-black text-gray-900 dark:text-gray-100 truncate leading-tight">{stop.street}</p>
                              <span className="text-[8px] font-black px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 shrink-0 uppercase">{stop.estimatedTime}</span>
                           </div>
                           <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase truncate opacity-80">{stop.name}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase text-gray-400 tracking-[3px] mb-8 flex items-center gap-2"><Icons.Clock /> Quadro de Horários</h3>
                <div className="bg-gray-50 dark:bg-zinc-950 rounded-[32px] p-5 border border-gray-100 dark:border-zinc-800">
                   <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5">
                     {selectedLine.schedules.weekday.flatMap(h => h.minutes.map(m => `${h.hour}:${m.toString().padStart(2, '0')}`)).sort().map(time => (
                       <div key={time} className="bg-white dark:bg-zinc-900 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 flex items-center justify-center shadow-sm">
                          <span className="text-[10px] font-black text-gray-900 dark:text-gray-100 tabular-nums">{time}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setActiveMapRoute(selectedLine.name); setView('mapa'); setSelectedLine(null); }}
              className="w-full mt-4 py-6 rounded-[32px] font-black uppercase tracking-[4px] shadow-2xl bg-gray-950 dark:bg-zinc-100 dark:text-gray-950 text-white text-sm shrink-0 active:scale-95 transition-all"
            >
              Ver Rota no Mapa
            </button>
            <div className="h-10 shrink-0"></div>
          </div>
        </div>
      )}
    </div>
  );
}

const FavoritosView: React.FC<{ favorites: BusLine[]; onSelectLine: (l: BusLine) => void }> = ({ favorites, onSelectLine }) => (
  <div className="p-5">
    <div className="flex items-center gap-3 mb-6"><div className="bg-red-500 p-2 rounded-xl text-white"><Icons.Heart /></div><h2 className="text-sm font-black uppercase tracking-widest text-gray-700 dark:text-gray-300">Minhas Linhas</h2></div>
    {favorites.length > 0 ? (
      <div className="grid gap-3">
        {favorites.map(line => (
          <div key={line.id} onClick={() => onSelectLine(line)} className="bg-white dark:bg-zinc-900 p-5 rounded-[28px] border-2 border-gray-50 dark:border-zinc-800 shadow-sm flex items-center gap-4 active:scale-98 transition-all">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black" style={{ backgroundColor: line.color }}>{line.number}</div>
            <div className="flex-1 overflow-hidden"><h3 className="font-black text-gray-900 dark:text-white text-sm truncate">{line.name}</h3><p className="text-[10px] font-black text-gray-400 uppercase">{line.type}</p></div>
            <Icons.ChevronRight />
          </div>
        ))}
      </div>
    ) : <div className="bg-white dark:bg-zinc-900 p-16 rounded-[40px] text-center border-2 border-dashed border-gray-100 dark:border-zinc-800 text-gray-400 font-black text-sm">Suas linhas favoritas aparecerão aqui.</div>}
  </div>
);

const PerfilView: React.FC<{ 
  onClose: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  fontScale: number;
  adjustFont: (m: number) => void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
}> = ({ onClose, onLogout, isDarkMode, toggleDarkMode, isHighContrast, toggleHighContrast, fontScale, adjustFont, notificationsEnabled, toggleNotifications }) => {
  const [subPage, setSubPage] = useState<string | null>(null);

  const menuItems = [
    { id: 'config', label: 'Configurações', icon: <Icons.Settings />, desc: 'Ajustes da conta e temas' },
    { id: 'access', label: 'Acessibilidade', icon: <Icons.Info />, desc: 'Fontes e contraste' },
    { id: 'help', label: 'Ajuda', icon: <Icons.History />, desc: 'Central de suporte' },
    { id: 'about', label: 'Sobre o App', icon: <Icons.ExternalLink />, desc: 'Versão e informações' },
  ];

  const renderSubPage = () => {
    switch(subPage) {
      case 'config':
        return (
          <div className="space-y-8 animate-in slide-in-from-right">
            <h4 className="text-xl font-black text-gray-900 dark:text-white">Configurações</h4>
            <div className="space-y-4">
              <button 
                onClick={toggleNotifications}
                className="w-full flex items-center justify-between p-6 bg-gray-50 dark:bg-zinc-900 rounded-[28px] border border-gray-100 dark:border-zinc-800"
              >
                <div className="text-left">
                  <span className="font-black text-sm block">Notificações</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Alertas de horários</span>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${notificationsEnabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-zinc-700'}`}>
                   <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </button>
              
              <button 
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-between p-6 bg-gray-50 dark:bg-zinc-900 rounded-[28px] border border-gray-100 dark:border-zinc-800"
              >
                <div className="text-left">
                  <span className="font-black text-sm block">Modo Escuro</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Visual escuro do app</span>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-zinc-700'}`}>
                   <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </button>
            </div>
          </div>
        );
      case 'access':
        return (
          <div className="space-y-6 animate-in slide-in-from-right">
            <h4 className="text-xl font-black text-gray-900 dark:text-white">Acessibilidade</h4>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-[28px] border border-gray-100 dark:border-zinc-800">
                <span className="font-black text-sm block mb-4">Fonte Maior</span>
                <div className="flex gap-2">
                  <button onClick={() => adjustFont(1)} className={`flex-1 py-3 rounded-xl font-black text-xs ${fontScale === 1 ? 'bg-blue-600 text-white' : 'bg-white dark:bg-zinc-800'}`}>Padrão</button>
                  <button onClick={() => adjustFont(1.2)} className={`flex-1 py-3 rounded-xl font-black text-xs ${fontScale === 1.2 ? 'bg-blue-600 text-white' : 'bg-white dark:bg-zinc-800'}`}>Média</button>
                  <button onClick={() => adjustFont(1.4)} className={`flex-1 py-3 rounded-xl font-black text-xs ${fontScale === 1.4 ? 'bg-blue-600 text-white' : 'bg-white dark:bg-zinc-800'}`}>Grande</button>
                </div>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-[28px] border border-gray-100 dark:border-zinc-800">
                 <div className="flex items-center justify-between">
                    <span className="font-black text-sm block">Alto Contraste</span>
                    <button 
                      onClick={toggleHighContrast}
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${isHighContrast ? 'bg-blue-600' : 'bg-gray-300 dark:bg-zinc-700'}`}
                    >
                       <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isHighContrast ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                 </div>
              </div>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="space-y-6 animate-in slide-in-from-right">
            <h4 className="text-xl font-black text-gray-900 dark:text-white">Ajuda</h4>
            <div className="space-y-3">
               <button onClick={() => setSubPage('help_faq')} className="w-full bg-gray-50 dark:bg-zinc-900 p-6 rounded-[24px] text-left font-black text-sm flex justify-between group active:bg-gray-100 transition-all">
                  <span>Perguntas Frequentes</span> <Icons.ChevronRight />
               </button>
               <button onClick={() => setSubPage('help_support')} className="w-full bg-gray-50 dark:bg-zinc-900 p-6 rounded-[24px] text-left font-black text-sm flex justify-between group active:bg-gray-100 transition-all">
                  <span>Falar com Suporte</span> <Icons.ChevronRight />
               </button>
            </div>
          </div>
        );
      case 'help_faq':
        return (
          <div className="space-y-8 animate-in slide-in-from-right overflow-y-auto max-h-[70vh] pb-10">
            <h4 className="text-xl font-black text-gray-900 dark:text-white">Perguntas Frequentes</h4>
            <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800">
                <h5 className="font-black text-sm mb-2 text-blue-600">O que é o andaÊ?</h5>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed italic">andaÊ é uma ideia pensada e arquitetada pelo Engenheiro de Software em formação BERNARDO VINHAL, desenvolvida com o intuito de melhorar a mobilidade urbana e fazer com que ela seja mais clara.</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800">
                <h5 className="font-black text-sm mb-2 text-blue-600">Futuramente vão ter novas atualizações?</h5>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed">Sim, a ideia inicial vai ser aprimorada em breve.</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800">
                <h5 className="font-black text-sm mb-2 text-blue-600">Aplicativo de celular, mas e os idosos?</h5>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed">O aplicativo foi pensado como uma forma muito simples de visualizar essas rotas, pesquisas mostram que idosos e crianças conseguem usar, porém tudo pode ser melhorado.</p>
              </div>
            </div>
          </div>
        );
      case 'help_support':
        return (
          <div className="space-y-6 animate-in slide-in-from-right">
            <h4 className="text-xl font-black text-gray-900 dark:text-white">Suporte</h4>
            <div className="p-8 bg-blue-50 dark:bg-blue-950/30 rounded-[32px] border-2 border-blue-100 dark:border-blue-900/50 text-center">
               <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                  <Icons.ExternalLink />
               </div>
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">E-mail para contato</p>
               <a href="mailto:contato@andae.com.br" className="text-lg font-black text-blue-700 dark:text-blue-400 break-all underline">contato@andae.com.br</a>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-6 animate-in slide-in-from-right h-full flex flex-col items-center justify-center py-10">
            <div className="w-24 h-24 bg-blue-600 rounded-[32px] flex items-center justify-center text-white mb-6 shadow-xl"><Icons.Bus /></div>
            <h4 className="text-2xl font-black text-gray-900 dark:text-white">andaÊ</h4>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[5px] text-center px-10 leading-loose">Mobilidade Inteligente para a Região Metropolitana</p>
            <div className="mt-8 text-[10px] font-bold text-gray-400 uppercase">© 2026 andaÊ - Todos os direitos reservados.</div>
            <div className="mt-10 flex flex-col gap-2 w-full max-w-[200px]">
               <button onClick={() => setSubPage('about_terms')} className="bg-gray-100 dark:bg-zinc-900 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Termos de Uso</button>
               <button onClick={() => setSubPage('about_privacy')} className="bg-gray-100 dark:bg-zinc-900 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Privacidade</button>
            </div>
          </div>
        );
      case 'about_terms':
        return (
          <div className="space-y-4 animate-in slide-in-from-right overflow-y-auto max-h-[70vh]">
            <h4 className="text-xl font-black">Termos de Uso</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">Ao utilizar o andaÊ, você concorda que as informações de horários são baseadas em dados públicos e podem sofrer alterações sem aviso prévio das operadoras locais. O app atua como facilitador de consulta.</p>
            <p className="text-xs font-black uppercase text-gray-400 mt-10">© 2026 andaÊ - Todos os direitos reservados.</p>
          </div>
        );
      case 'about_privacy':
        return (
          <div className="space-y-4 animate-in slide-in-from-right overflow-y-auto max-h-[70vh]">
            <h4 className="text-xl font-black">Privacidade</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">Sua localização é utilizada apenas para calcular rotas em tempo real e não é armazenada em nossos servidores. Priorizamos a segurança dos seus dados de navegação.</p>
            <p className="text-xs font-black uppercase text-gray-400 mt-10">© 2026 andaÊ - Todos os direitos reservados.</p>
          </div>
        );
      default: return null;
    }
  };

  const handleBack = () => {
    if (subPage?.startsWith('help_')) setSubPage('help');
    else if (subPage?.startsWith('about_')) setSubPage('about');
    else setSubPage(null);
  };

  return (
    <div className="fixed inset-0 z-[300] bg-white dark:bg-zinc-950 animate-in slide-in-from-right duration-300 flex flex-col">
      <header className="px-4 py-4 border-b border-gray-50 dark:border-zinc-800 flex items-center justify-between shrink-0">
        <div className="flex items-center">
          {subPage ? (
            <button 
              onClick={handleBack} 
              className="p-5 -ml-4 -my-4 text-gray-950 dark:text-white active:bg-gray-50 dark:active:bg-zinc-900 rounded-full transition-colors flex items-center gap-3"
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
               <span className="text-[12px] font-black uppercase tracking-widest">Voltar</span>
            </button>
          ) : (
            <h2 className="text-xl font-black text-gray-950 dark:text-white ml-2">Meu Perfil</h2>
          )}
        </div>
        {!subPage && <AccessibleCloseButton onClick={onClose} label="Sair" variant="danger" />}
      </header>

      <div className="p-10 flex flex-col flex-1 overflow-y-auto no-scrollbar">
        {!subPage ? (
          <>
            <div className="flex flex-col items-center mb-10">
              <div className="w-24 h-24 bg-blue-50 dark:bg-zinc-900 border-4 border-white dark:border-zinc-800 rounded-[32px] flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-xl overflow-hidden relative">
                <div className="scale-150 opacity-90 transition-transform active:scale-125"><Icons.User /></div>
              </div>
              <h3 className="text-xl font-black dark:text-white">Passageiro Andaê</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Status: Explorador Urbano</p>
            </div>
            
            <div className="w-full space-y-3">
              {menuItems.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => setSubPage(item.id)}
                  className="w-full bg-gray-50 dark:bg-zinc-900 p-6 rounded-[28px] text-left group active:bg-gray-100 dark:active:bg-zinc-800 transition-all flex items-center gap-5 border border-transparent dark:border-zinc-800/50"
                >
                  <div className="p-3.5 bg-white dark:bg-zinc-950 rounded-2xl text-gray-950 dark:text-gray-100 shadow-sm">{item.icon}</div>
                  <div className="flex-1">
                    <span className="font-black text-sm block dark:text-gray-100 leading-none">{item.label}</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase mt-1.5 inline-block">{item.desc}</span>
                  </div>
                  <Icons.ChevronRight />
                </button>
              ))}

              <button 
                onClick={onLogout}
                className="w-full mt-6 bg-red-50 dark:bg-red-950/20 p-6 rounded-[28px] text-left group active:bg-red-100 transition-all flex items-center gap-5 border border-red-100 dark:border-red-900/30"
              >
                <div className="p-3.5 bg-white dark:bg-zinc-950 rounded-2xl text-red-600 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                </div>
                <div className="flex-1">
                  <span className="font-black text-sm block text-red-600">Sair da conta</span>
                  <span className="text-[9px] font-bold text-red-400 uppercase mt-1.5 inline-block">Encerrar sessão atual</span>
                </div>
                <Icons.ChevronRight />
              </button>
            </div>
          </>
        ) : (
          <div className="h-full">
            {renderSubPage()}
          </div>
        )}
        
        <div className="mt-auto pt-12 text-center opacity-20 dark:opacity-10 shrink-0">
           <p className="text-[11px] font-black uppercase tracking-[8px] dark:text-white">andaÊ</p>
           <p className="text-[8px] font-bold uppercase mt-2 dark:text-white">Região Metropolitana de BH</p>
        </div>
      </div>
    </div>
  );
};
