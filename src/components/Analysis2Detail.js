import React from 'react';
import { useParams, Link } from 'react-router-dom';

// O componente recebe 'conversations' via props do App.jsx
const Analysis2Detail = ({ conversations }) => {
  const { chatId } = useParams();

  // Filtra o payload recebido via props para encontrar todas as entradas para este chat
  const chatAnalyses = conversations.filter(
    (item) => item.chat_id == chatId
  );

  // Se nenhum chat for encontrado, exibe uma mensagem
  if (chatAnalyses.length === 0) {
    return (
      <div className="container">
        <h2>Chat não encontrado.</h2>
        <Link to="/">Voltar para a lista</Link>
      </div>
    );
  }

  // Pega informações comuns do primeiro item (todas são iguais para o mesmo chat)
  const { chat_id, customer_name, message } = chatAnalyses[0];

  return (
    <div className="container">
      <Link to="/" className="back-link">
        &larr; Voltar para a Lista
      </Link>
      <h1>Detalhes do Chat #{chat_id}</h1>
      <p>
        <strong>Cliente:</strong> {customer_name}
      </p>

      <div className="card message-card">
        <h2>Transcrição da Conversa</h2>
        <pre>{message}</pre>
      </div>

      <h2>Análises dos Modelos de IA</h2>
      <div className="analyses-container">
        {chatAnalyses.map((analysis) => (
          <div key={analysis.id} className="card analysis-card">
            <h3>Modelo: {analysis.model}</h3>
            <pre>{analysis.chats_resume}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analysis2Detail;