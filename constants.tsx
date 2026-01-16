
import React from 'react';
import { BusLine, LineType } from './types';

export const OFFICIAL_SOURCES = [
  { name: 'Metrô BH', url: 'https://www.metrobh.com.br' },
  { name: 'Portal Ótimo', url: 'https://www.otimoonline.com.br' },
  { name: 'BHTrans (Horários)', url: 'https://prefeitura.pbh.gov.br/bhtrans/informacoes/transportes/onibus/consulta-quadros-horarios' },
  { name: 'Moovit RMBH', url: 'https://moovitapp.com/index/pt-br/transporte_p%C3%BAblico-lines-Belo_Horizonte-843-895874' }
];

const generate24hSchedule = () => {
  const schedule = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0');
    schedule.push({ hour, minutes: [0, 20, 40] });
  }
  return schedule;
};

export const MOCK_LINES: BusLine[] = [
  {
    id: '1',
    number: '30',
    name: 'Estação Diamante / Centro',
    type: LineType.MOVE,
    color: '#0056b3',
    city: 'Belo Horizonte',
    origin: 'Estação Diamante',
    destination: 'Centro',
    stops: [
      { id: 's1', name: 'Estação Diamante', street: 'Av. João Rolla Filho', estimatedTime: 'Partida' },
      { id: 's2', name: 'Ponto 1', street: 'Av. Waldyr Soeiro Emrich', estimatedTime: '8 min' },
      { id: 's3', name: 'Ponto 2', street: 'Av. Amazonas', estimatedTime: '15 min' },
      { id: 's4', name: 'Praça Sete', street: 'Av. Afonso Pena', estimatedTime: '22 min' }
    ],
    schedules: {
      weekday: generate24hSchedule(),
      saturday: generate24hSchedule().filter((_, i) => i % 2 === 0),
      sunday: generate24hSchedule().filter((_, i) => i % 3 === 0)
    }
  },
  {
    id: '2',
    number: '3304',
    name: 'Betim / Belo Horizonte',
    type: LineType.OTIMO,
    color: '#2e7d32',
    city: 'Betim',
    origin: 'Terminal Betim',
    destination: 'BH - Centro',
    stops: [
      { id: 's5', name: 'Terminal Betim', street: 'Rod. Fernão Dias', estimatedTime: 'Partida' },
      { id: 's6', name: 'Partage Shopping', street: 'BR-381', estimatedTime: '12 min' },
      { id: 's7', name: 'Praça da Cemig', street: 'Av. Cardeal Eugênio Pacelli', estimatedTime: '25 min' },
      { id: 's8', name: 'Rodoviária BH', street: 'Av. do Contorno', estimatedTime: '45 min' }
    ],
    schedules: {
      weekday: generate24hSchedule(),
      saturday: generate24hSchedule(),
      sunday: []
    }
  },
  {
    id: '3',
    number: '33',
    name: 'Estação Barreiro / Centro',
    type: LineType.MOVE,
    color: '#0056b3',
    city: 'Belo Horizonte',
    origin: 'Estação Barreiro',
    destination: 'Centro',
    stops: [
      { id: 's9', name: 'Estação Barreiro', street: 'Av. Afonso Vaz de Melo', estimatedTime: 'Partida' },
      { id: 's10', name: 'Hospital Júlia Kubitschek', street: 'Rua Dr. Cristiano Rezende', estimatedTime: '10 min' },
      { id: 's11', name: 'Cefet MG', street: 'Av. Amazonas', estimatedTime: '22 min' },
      { id: 's12', name: 'Praça Raul Soares', street: 'Av. Bias Fortes', estimatedTime: '30 min' }
    ],
    schedules: {
      weekday: generate24hSchedule(),
      saturday: generate24hSchedule(),
      sunday: []
    }
  },
  {
    id: '4',
    number: '510C',
    name: 'Terminal Vilarinho / BH - Direta',
    type: LineType.MOVE,
    color: '#d32f2f',
    city: 'Belo Horizonte',
    origin: 'Estação Vilarinho',
    destination: 'Centro (Hospitais)',
    stops: [
      { id: 's13', name: 'Estação Vilarinho', street: 'Av. Vilarinho', estimatedTime: 'Partida' },
      { id: 's14', name: 'Estação São Gabriel', street: 'Av. Cristiano Machado', estimatedTime: '15 min' },
      { id: 's15', name: 'Tupinambás', street: 'Rua dos Tupinambás', estimatedTime: '25 min' }
    ],
    schedules: {
      weekday: generate24hSchedule(),
      saturday: [],
      sunday: []
    }
  },
  {
    id: '5',
    number: 'METRÔ',
    name: 'Eldorado / Vilarinho',
    type: LineType.METRO,
    color: '#004a99',
    city: 'Belo Horizonte',
    origin: 'Estação Eldorado',
    destination: 'Estação Vilarinho',
    stops: [
      { id: 'm1', name: 'Estação Eldorado', street: 'Rua Jequitibás', estimatedTime: '0 min' },
      { id: 'm2', name: 'Estação Cidade Industrial', street: 'Av. Cardeal Eugênio Pacelli', estimatedTime: '3 min' },
      { id: 'm3', name: 'Estação Vila Oeste', street: 'Av. Amazonas', estimatedTime: '6 min' },
      { id: 'm4', name: 'Estação Gameleira', street: 'Rua Cândido de Souza', estimatedTime: '9 min' },
      { id: 'm5', name: 'Estação Calafate', street: 'Rua Platina', estimatedTime: '12 min' }
    ],
    schedules: {
      weekday: generate24hSchedule(),
      saturday: generate24hSchedule(),
      sunday: generate24hSchedule()
    }
  }
];

export const Icons = {
  Bus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9c0 .4.1.8.2 1.2.3 1.1.8 2.8.8 2.8h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h6"/><circle cx="17" cy="18" r="2"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  ),
  ExternalLink: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Heart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  ),
  Star: ({ filled }: { filled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#FFD700" : "none"} stroke={filled ? "#FFD700" : "#000"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  History: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
  MoreHorizontal: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
  )
};
