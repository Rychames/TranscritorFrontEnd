import React, { useState } from 'react';
import { textToSpeech } from '../apis/TextToSpeechAPI';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTextToSpeech = async () => {
        setLoading(true);
        try {
            const response = await textToSpeech(text);
            setAudioUrl(response.download_url || response); // Ajuste conforme a resposta da API
        } catch (error) {
            alert('Erro ao converter texto em fala.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Texto para Fala</h2>
            <textarea
                className="form-control mb-3"
                rows="4"
                placeholder="Digite seu texto aqui..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                className="btn btn-primary"
                onClick={handleTextToSpeech}
                disabled={loading || !text}
            >
                {loading ? 'Processando...' : 'Converter'}
            </button>
            {audioUrl && (
                <div className="mt-3">
                    <h4>Resultado:</h4>
                    <audio controls src={audioUrl}>
                        Seu navegador não suporta o elemento de áudio.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default TextToSpeech;
