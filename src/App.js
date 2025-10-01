import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConversationList from './components/ConversationList';
import ConversationDetail from './components/ConversationDetail';
import Analysis2Detail from './components/Analysis2Detail.js';
import './App.css';
import Analysis2 from './components/Analysis2.js';

function App() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função assíncrona para buscar os dados da sua API
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://192.168.10.226:5678/getAllData2');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        setConversations(data);
        setError(null);
      } catch (err) {
        console.error("Falha ao buscar dados: ", err);
        setError("Não foi possível carregar os dados. Verifique se a API está rodando em http://localhost:5678/getAllData e tente novamente.");
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // O array vazio [] garante que a busca seja feita apenas uma vez, quando o componente é montado.

  // Renderização condicional com base no estado
  if (loading) {
    return <div className="app-status">Carregando dados da API...</div>;
  }

  if (error) {
    return <div className="app-status error">{error}</div>;
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Passamos os dados buscados como "props" para os componentes filhos */}
          <Route 
            path="/" 
            element={<Analysis2 conversations={conversations} />} 
          />
          <Route 
            path="/chat/:chatId" 
            element={<Analysis2Detail conversations={conversations} />} 
          />
          <Route 
            path="/analysis2" 
            element={<ConversationList conversations={conversations} />} 
          />
          <Route 
            path="/chat2/:chatId" 
            element={<ConversationDetail conversations={conversations} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;