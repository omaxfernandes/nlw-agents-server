import { db } from "./connection.ts";
import { audioChunks } from "./schema/audio-chunks.ts";
import { rooms } from "./schema/rooms.ts";
import { generateEmbeddings } from "../services/gemini.ts";

// Função para popular chunks de áudio de exemplo
async function seedAudioChunks() {
  console.log("🎵 Gerando chunks de áudio de exemplo...");

  // Buscar as primeiras salas criadas
  const existingRooms = await db.select().from(rooms).limit(3);

  if (existingRooms.length === 0) {
    console.log("❌ Nenhuma sala encontrada. Execute o seed principal primeiro.");
    return;
  }

  // Exemplos de transcrições para diferentes tipos de conteúdo
  const transcriptions = [
    "Bem-vindos à nossa aula sobre JavaScript moderno. Hoje vamos falar sobre async/await e como eles simplificam o trabalho com Promises. O async/await é uma sintaxe que permite escrever código assíncrono de forma mais limpa e legível.",
    
    "Promises são objetos que representam a eventual conclusão ou falha de uma operação assíncrona. Elas têm três estados: pending, fulfilled e rejected. Quando usamos async/await, estamos trabalhando com promises de forma mais intuitiva.",
    
    "Para declarar uma função assíncrona, usamos a palavra-chave async antes da declaração da função. Dentro dessa função, podemos usar await para esperar que uma promise seja resolvida antes de continuar a execução do código.",
    
    "React é uma biblioteca JavaScript para construir interfaces de usuário. Ele usa um conceito chamado Virtual DOM para otimizar a renderização de componentes. O JSX é uma extensão de sintaxe que permite escrever elementos React de forma similar ao HTML.",
    
    "O useState é um Hook do React que permite adicionar estado a componentes funcionais. Ele retorna um array com dois elementos: o valor atual do estado e uma função para atualizá-lo. É fundamental para criar componentes interativos.",
    
    "O useEffect é outro Hook importante do React. Ele permite realizar efeitos colaterais em componentes funcionais, como chamadas de API, manipulação do DOM ou limpeza de recursos. Ele executa após a renderização do componente.",
    
    "Node.js é um runtime JavaScript que permite executar JavaScript no servidor. Ele usa o motor V8 do Google Chrome e é construído sobre um modelo de I/O não-bloqueante, orientado a eventos, que o torna leve e eficiente.",
    
    "O Express é um framework web para Node.js que simplifica a criação de APIs e aplicações web. Ele fornece um conjunto robusto de recursos para aplicações web e móveis, incluindo roteamento, middlewares e manipulação de requests.",
    
    "TypeScript é um superconjunto tipado de JavaScript que compila para JavaScript puro. Ele adiciona tipagem estática opcional e outros recursos como interfaces, enums e genéricos, ajudando a detectar erros em tempo de desenvolvimento."
  ];

  // Para cada sala, inserir alguns chunks
  for (const room of existingRooms) {
    console.log(`📝 Processando sala: ${room.name}`);
    
    // Selecionar algumas transcrições aleatórias para esta sala
    const roomTranscriptions = transcriptions.slice(0, 3);
    
    for (const transcription of roomTranscriptions) {
      try {
        console.log(`  🔄 Gerando embeddings para: "${transcription.substring(0, 50)}..."`);
        
        // Gerar embeddings para a transcrição
        const embeddings = await generateEmbeddings(transcription);
        
        // Inserir no banco
        await db.insert(audioChunks).values({
          roomId: room.id,
          transcription,
          embeddings,
        });
        
        console.log(`  ✅ Chunk inserido com sucesso`);
      } catch (error) {
        console.error(`  ❌ Erro ao processar transcrição:`, error);
      }
    }
  }

  console.log("🎉 Chunks de áudio criados com sucesso!");
}

// Executar o seed
seedAudioChunks()
  .then(() => {
    console.log("✨ Processo concluído!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Erro durante o seed:", error);
    process.exit(1);
  });
