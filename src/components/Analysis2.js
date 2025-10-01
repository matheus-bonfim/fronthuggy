import React from 'react';
import { Link } from 'react-router-dom';

// Função para processar os dados e obter uma lista de chats únicos
const getUniqueChats = (data) => {
  const uniqueChats = data.reduce((acc, current) => {
    if (!acc.some(item => item.chat_id === current.chat_id)) {
      acc.push({
        chat_id: current.chat_id,
        customer_id: current.customer_id,
        customer_name: current.customer_name,
        is_client: current.is_client,
        contract_n1: current.contract_n1,
        reason_cancellation: current.reason_cancellation,
        expl_cancellation: current.expl_cancellation,
        confidence: current.confidence
      });
    }
    return acc;
  }, []);
  return uniqueChats;
};

// O componente recebe 'conversations' via props do App.jsx
const Analysis2 = ({ conversations }) => {
  const uniqueConversations = getUniqueChats(conversations);

  return (
    <div className="container">
      <h1>Análise de Conversas</h1>
      <table className="conversation-table">
        <thead>
          <tr>
            <th>Chat ID</th>
            <th>Customer ID</th>
            <th>Nome do Cliente</th>
            <th>É Cliente?</th>
            <th>Número do contrato</th>
            <th>Motivo de Cancelamento</th>
            <th>Explicação do Cancelamento</th>
            <th>Confiança (%)</th>
            <th>Ações</th>
            
          </tr>
        </thead>
        <tbody>
          {uniqueConversations.map((chat) => (
            
            <tr key={chat.chat_id}>
              <td>{chat.chat_id}</td>
              <td>{chat.customer_id}</td>
              <td>{chat.customer_name}</td>
              <td>{chat.is_client ? "Sim" : "Não"}</td>
              <td>{chat.contract_n1}</td>
              <td>{chat.reason_cancellation}</td>
              <td>{chat.expl_cancellation}</td>
              <td>{chat.confidence}</td>
              <td>
                <Link to={`/chat/${chat.chat_id}`}>
                  <button className="view-button">Ver mensagens e resumo</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analysis2;