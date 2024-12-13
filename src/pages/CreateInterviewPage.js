import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { createInterview } from '../apis/InterviewAPI';
import axios from 'axios';

const CreateInterviewPage = ({ darkMode }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        interviewers: '',
        interviewees: '',
        observation_date: '',
        transcription_date: '',
        correction_date: '',
        interview_type: '',
        audio: null, // Campo para o arquivo de áudio
    });

    const [error, setError] = useState(null); // Para exibir erros

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData({
                ...formData,
                audio: files[0], // Atualiza o estado com o arquivo de áudio
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Criação do FormData
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });

            // Enviar áudio para API de transcrição
            if (formData.audio) {
                const audioFormData = new FormData();
                audioFormData.append('audio', formData.audio);

                const response = await axios.post('http://localhost:5000/api/speech-to-text', audioFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                // Adicionar transcrição ao formData
                formDataToSend.append('transcribed_text', JSON.stringify(response.data)); // Transcrição retornada pela API
            }

            // Enviar entrevista para o backend
            const newInterview = await createInterview(formDataToSend);
            console.log('Entrevista criada com sucesso:', newInterview);
            navigate('/select-interview');
        } catch (error) {
            console.error('Erro ao criar a entrevista:', error);
            setError('Erro ao criar a entrevista.'); // Atualiza o estado de erro
        }
    };

    return (
        <div className={`container my-5 ${darkMode ? 'dark-mode' : ''}`}>
            <Button variant="link" onClick={() => navigate('/select-interview')} className="mb-3">
                <FaArrowLeft /> Voltar para Seleção de Entrevista
            </Button>
            <h2>Criar Nova Entrevista</h2>
            {error && <Alert variant="danger">{error}</Alert>} {/* Exibe mensagem de erro */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o título"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formSubtitle">
                    <Form.Label>Subtítulo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o subtítulo"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formInterviewers">
                    <Form.Label>Entrevistador(es)/Observador(es)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite os nomes"
                        name="interviewers"
                        value={formData.interviewers}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formInterviewees">
                    <Form.Label>Entrevistado(s)/Observado(s)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite os nomes"
                        name="interviewees"
                        value={formData.interviewees}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formObservationDate">
                    <Form.Label>Data de Observação</Form.Label>
                    <Form.Control
                        type="date"
                        name="observation_date"
                        value={formData.observation_date}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formTranscriptionDate">
                    <Form.Label>Data de Transcrição</Form.Label>
                    <Form.Control
                        type="date"
                        name="transcription_date"
                        value={formData.transcription_date}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formCorrectionDate">
                    <Form.Label>Data de Correção</Form.Label>
                    <Form.Control
                        type="date"
                        name="correction_date"
                        value={formData.correction_date}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formInterviewType">
                    <Form.Label>Tipo de Entrevista</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o tipo de entrevista"
                        name="interview_type"
                        value={formData.interview_type}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formAudioFile">
                    <Form.Label>Upload de Áudio</Form.Label>
                    <Form.Control
                        type="file"
                        name="audio" // O nome do campo deve ser 'audio'
                        onChange={handleChange}
                        accept="audio/*"
                    />
                </Form.Group>

                <Form.Group controlId="formInterviewJson">
                    <Form.Label>JSON da Entrevista</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        name="interview_json"
                        value={formData.interview_json}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Criar Entrevista
                </Button>
            </Form>
        </div>
    );
};

export default CreateInterviewPage;