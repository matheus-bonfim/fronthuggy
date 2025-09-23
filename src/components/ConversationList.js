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
      });
    }
    return acc;
  }, []);
  return uniqueChats;
};

// O componente recebe 'conversations' via props do App.jsx
const ConversationList = ({ conversations }) => {
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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {uniqueConversations.map((chat) => (
            <tr key={chat.chat_id}>
              <td>{chat.chat_id}</td>
              <td>{chat.customer_id}</td>
              <td>{chat.customer_name}</td>
              <td>
                <Link to={`/chat/${chat.chat_id}`}>
                  <button className="view-button">Ver Análises</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConversationList;