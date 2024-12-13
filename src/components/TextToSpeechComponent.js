import React, { useState } from 'react';
import { textToSpeech } from '../apis/TextToSpeechAPI'; // Ajuste o caminho conforme necessário

const TextToSpeechComponent = () => {
    const [selectedText, setSelectedText] = useState('');

    const handleTextSelection = () => {
        const text = window.getSelection().toString();
        if (text) {
            setSelectedText(text);
            playAudio(text);
        }
    };

    const playAudio = async (text) => {
        try {
            const audioUrl = await textToSpeech(text); // A URL do áudio retornada pela API
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error('Erro ao reproduzir áudio:', error);
        }
    };

    return (
        <div onMouseUp={handleTextSelection}>
            <p>Selecione qualquer texto aqui para ouvir em voz alta.</p>
            <p>{selectedText}</p>
        </div>
    );
};

export default TextToSpeechComponent;