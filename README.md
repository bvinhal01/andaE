# 🚌 andaÊ — Mobilidade Inteligente RMBH

O **andaÊ** é uma plataforma inovadora de auxílio à mobilidade urbana, focada especificamente nos desafios de transporte da **Região Metropolitana de Belo Horizonte (RMBH)**. O projeto nasceu da necessidade de unificar informações fragmentadas sobre o transporte coletivo (ônibus municipais, metropolitanos e metrô) em uma interface única, moderna e acessível.

O software funciona como um guia de bolso para o passageiro, permitindo desde a consulta rápida de horários até o planejamento complexo de rotas intermunicipais utilizando inteligência artificial.

---

## 🚀 Funcionalidades Principais

*   **Consulta Multimodal:** Integração de dados das redes **BHBus** (PBH), **Ótimo** (Metropolitano), **Move** (BRT) e **Metrô BH**.
*   **Planejador de Rotas com IA:** Utiliza o modelo **Gemini 3 Flash** para sugerir trajetos otimizados entre quaisquer pontos da RMBH, considerando tempo, conforto e previsibilidade.
*   **Mapa Tátil de 3km:** Uma interface de geolocalização simulada que permite ao usuário explorar o ambiente ao redor de sua localização atual em um raio de 3km, com controles táteis de arrasto (pan).
*   **Itinerários Detalhados:** Visualização vertical de pontos de parada com estimativas de tempo e nomes das vias.
*   **Quadro de Horários Dinâmico:** Visualização compacta e organizada de todas as partidas diárias (dias úteis, sábados e domingos).
*   **Sistema de Favoritos:** Permite salvar as linhas mais utilizadas para acesso instantâneo.
*   **Central de Acessibilidade:** 
    *   Suporte completo a **Modo Escuro**.
    *   Modo de **Alto Contraste** para usuários com baixa visão.
    *   Ajuste dinâmico de **escala de fonte**.
*   **Segurança e Login:** Sistema de acesso restrito para preservação das preferências do usuário (Favoritos e Histórico).
    *   Usuário e senha de testes

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando o que há de mais moderno no ecossistema de desenvolvimento web, priorizando performance, ausência de dependências pesadas e carregamento instantâneo via ESM.

### **Core & Framework**
*   **React 19:** Utilização da versão mais recente do framework para gerenciamento de estado e renderização eficiente.
*   **TypeScript:** Garantia de tipagem estática e segurança de código em toda a aplicação.
*   **Tailwind CSS:** Framework utilitário para estilização rápida, responsiva e suporte nativo a temas (Dark/Light).

### **Inteligência Artificial**
*   **Google Gemini API (@google/genai):** Implementação do modelo **gemini-3-flash-preview** para processamento de linguagem natural e consultoria de rotas urbanas em tempo real.

### **Infraestrutura & Ferramentas**
*   **ES Modules & Import Maps:** Carregamento de módulos diretamente do navegador, eliminando a necessidade de complexos processos de build/bundling.
*   **LocalStorage API:** Persistência de dados do usuário (favoritos, histórico de busca e configurações de tema) localmente no navegador.
*   **Lucide-like SVG Icons:** Biblioteca de ícones customizados em formato vetorial para garantir leveza e nitidez em qualquer resolução.
*   **Tailwind Animate:** Utilização de utilitários de animação para transições suaves entre telas e feedbacks visuais.

---

## 🏗️ Arquitetura do Projeto

*   `App.tsx`: O coração da aplicação, contendo a lógica de roteamento de views, estados globais e subcomponentes de interface.
*   `services/geminiService.ts`: Camada de comunicação com a API de IA, configurada com instruções de sistema específicas para a geografia da RMBH.
*   `types.ts`: Definições de interfaces e enums que garantem a integridade dos dados de linhas e horários.
*   `constants.tsx`: Armazenamento de dados estáticos (Mocks) e biblioteca de ícones.

---

## 👤 Autor

Projeto idealizado e arquitetado pelo Engenheiro de Software em formação **Bernardo Vinhal**.

> **Nota:** Este software é um facilitador de consulta. Para dados de tempo real em operação, sempre consulte os canais oficiais (Metrô BH, Ótimo e BHTrans) listados na central de links do aplicativo.

---
© 2026 andaÊ - Mobilidade Urbana RMBH. Todos os direitos reservados.
