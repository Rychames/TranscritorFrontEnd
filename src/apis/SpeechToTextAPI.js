import axios from 'axios';

const API_URL = 'http://localhost:5000/api/speech-to-text'; // Altere para o URL da sua API

export const speechToText = async (audioFile) => {
    const formData = new FormData();
    formData.append('audio', audioFile); // Adicione o arquivo de áudio ao FormData

    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Necessário para upload de arquivos
            },
        });
        return response.data; // Retorna a resposta da API
    } catch (error) {
        console.error('Erro ao chamar a API de fala para texto:', error);
        throw error; // Propaga o erro
    }
};