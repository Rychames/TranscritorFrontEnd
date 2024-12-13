import React, { useState } from 'react';
import axios from 'axios';

const SpeechToText = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [transcription, setTranscription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setAudioFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!audioFile) {
            alert('Por favor, selecione um arquivo de áudio!');
            return;
        }
      
        const formData = new FormData();   
        formData.append('file', audioFile);
 
        try {
            setLoading(true);
            setTranscription('');  // Limpa a transcrição anterior
      
            console.log('Enviando arquivo para o backend...');
            const response = await axios.post('http://localhost:5000/api/speech-to-text', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
      
            console.log('Resposta do backend:', response.data);
      
            // Verifique se o status é true
            if (response.data.status) {
                setTranscription(response.data.text); // Acesse o campo 'text' corretamente
            } else {
                alert('Erro na transcrição: O status retornou falso!');
            }
      
        } catch (error) {
            console.error('Erro ao transcrever áudio:', error);
            alert('Erro ao transcrever áudio. Verifique o console para mais detalhes.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Transcrição de Áudio</h1>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="mb-3 w-50">
                    <label htmlFor="audioFile" className="form-label">
                        Selecione um arquivo de áudio:
                    </label>
                    <input
                        type="file"
                        accept="audio/*"
                        className="form-control"
                        id="audioFile"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Transcrevendo...' : 'Enviar'}
                </button>
            </form>
            {transcription && (
                <div className="mt-4">
                    <h3>Transcrição:</h3>
                    <p className="border rounded p-3 bg-light">{transcription}</p>
                </div>
            )}
        </div>
    );
};

export default SpeechToText;