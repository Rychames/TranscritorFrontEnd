import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // URL do backend

// Função para enviar texto e receber áudio
export const textToSpeech = async (text, language = 'pt-BR', voice = 'pt-BR-AntonioNeural') => {
    try {
        const response = await axios.post(`${API_BASE_URL}/text-to-speech`, {
            text,
            language,
            voice,
        });
        return response.data; // Retorna o áudio gerado (ou URL)
    } catch (error) {
        console.error('Erro na API de texto para fala:', error);
        throw error;
    }
};
