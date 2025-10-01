import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 1. Importar o axios
import axios from 'axios';
import ConversationList from './components/ConversationList';
import ConversationDetail from './components/ConversationDetail';
import Analysis2Detail from './components/Analysis2Detail.js';
import './App.css';

// A URL do seu backend. Lembre-se que o ngrok gera uma URL nova a cada vez que é iniciado.
const BACKEND_URL = "https://34fc6bcaeeef.ngrok-free.app";
import Analysis2 from './components/Analysis2.js';

function App() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar os dados, agora com axios
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 2. Usar axios.get para a requisição.
        // O axios já converte a resposta para JSON automaticamente.
        // Os dados ficam disponíveis em `response.data`.
        const response = await axios.get(`${BACKEND_URL}/getAllData`, {
          // O ngrok pode exigir este cabeçalho para evitar sua tela de aviso.
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        
        setConversations(response.data);
        setError(null);
      } catch (err) {
        // 3. Tratamento de erro simplificado.
        // O axios automaticamente rejeita a promise para status de erro (4xx, 5xx),
        // então o erro é capturado diretamente no bloco catch.
        console.error("Falha ao buscar dados: ", err);
        let errorMessage = `Não foi possível carregar os dados. Verifique se a API está rodando em ${BACKEND_URL}/getAllData e tente novamente.`;
        if (err.response) {
          // O servidor respondeu com um status de erro
          errorMessage += ` (Status: ${err.response.status})`;
        } else if (err.request) {
          // A requisição foi feita, mas não houve resposta (ex: CORS, rede)
          errorMessage = "Erro de rede. Não foi possível conectar à API. Verifique sua conexão e a configuração de CORS no servidor.";
        }
        setError(errorMessage);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // O array vazio [] garante que a busca seja feita apenas uma vez.

  // O restante do componente permanece o mesmo
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
