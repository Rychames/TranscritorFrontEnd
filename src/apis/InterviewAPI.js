import axios from 'axios';

// URL base do backend
const API_BASE_URL = 'http://localhost:5000/api/transcriptions';

// Função para criar uma nova entrevista
export const createInterview = async (data) => {
    try {
        const response = await axios.post(API_BASE_URL, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar entrevista:', error);
        throw error;
    }
};

// Função para buscar todas as entrevistas
export const getAllInterviews = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar entrevistas:', error);
        throw error;
    }
};

// Função para buscar uma entrevista por ID
export const getInterviewById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar entrevista:', error);
        throw error;
    }
};

// Função para atualizar uma entrevista
export const updateInterview = async (id, formData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Função para excluir uma entrevista
export const deleteInterview = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir entrevista:', error);
        throw error;
    }
};
