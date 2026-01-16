
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getRouteAdvice(origin: string, destination: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um especialista em mobilidade urbana e consultor estratégico do aplicativo **Andaê**, focado na Região Metropolitana de Belo Horizonte (RMBH).
      
      O usuário quer ir de "${origin}" para "${destination}".
      
      Sua missão é propor as melhores rotas possíveis, considerando deslocamentos reais do dia a dia. Pense como um passageiro comum que busca eficiência e menos estresse.
      
      **Instruções de Resposta:**
      1. Forneça exatamente 3 opções de rotas:
         - **Opção 1: Rota mais rápida** (Foco em tempo, usando Move ou Linhas Diretas).
         - **Opção 2: Conforto / Menos Trocas** (Ideal para quem quer evitar baldeações).
         - **Opção 3: Rota Alternativa/Previsível** (Uso de Metrô ou vias principais para fugir de trânsito).

      2. Para cada rota, descreva o caminho de forma SEQUENCIAL e ORGANIZADA:
         - Use ícones: 🚶 (Caminhada), 🚌 (Ônibus), 🚇 (Metrô), 📍 (Ponto/Estação), 🕒 (Tempo).
         - Detalhe: Local de embarque -> Linha -> Local de desembarque -> Conexão (se houver) -> Destino final.

      3. Seja claro sobre o motivo da escolha (ex: "Esta rota evita o trânsito da Av. Amazonas").

      4. Use Markdown para formatação. Mantenha os textos curtos, diretos e em tópicos.

      5. Ao final, cite que horários exatos devem ser conferidos nos canais oficiais (Metrô BH, Ótimo, BHTrans).

      **Região de Atuação:** 34 cidades da RMBH (BH, Betim, Contagem, Ibirité, Santa Luzia, Neves, Nova Lima, etc).`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Não foi possível calcular as rotas agora. Verifique sua conexão ou tente buscar por termos mais específicos.";
  }
}
