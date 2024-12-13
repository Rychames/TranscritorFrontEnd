import React, { useEffect, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getInterviewById, updateInterview } from '../apis/InterviewAPI';

const EditInterviewPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        interviewers: '',
        interviewees: '',
        observation_date: '',
        transcription_date: '',
        correction_date: '',
        interview_type: '',
        interview_json: '',
        audio_blob_url: '', // URL gerada para o áudio no backend
        audio: null,        // Novo arquivo de áudio
    });
    const [error, setError] = useState(null);

    const convertISODateToYYYYMMDD = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const interview = await getInterviewById(id);
                const audioStreamUrl = `http://localhost:5000/api/transcriptions/${id}/audio`;

                setFormData({
                    title: interview.title,
                    subtitle: interview.subtitle,
                    interviewers: interview.interviewers,
                    interviewees: interview.interviewees,
                    observation_date: convertISODateToYYYYMMDD(interview.observation_date), // Convertendo a data
                    transcription_date: convertISODateToYYYYMMDD(interview.transcription_date), // Convertendo a data
                    correction_date: convertISODateToYYYYMMDD(interview.correction_date), // Convertendo a data
                    interview_type: interview.interview_type,
                    interview_json: JSON.stringify(interview.interview_json, null, 2),
                    audio_blob_url: audioStreamUrl, // URL para o streaming
                });
            } catch (error) {
                console.error('Erro ao carregar entrevista:', error);
                setError('Erro ao carregar os dados da entrevista.');
            }
        };

        fetchInterview();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            audio: file,
        });
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key === 'interview_json') {
                    formDataToSend.append(key, JSON.stringify(JSON.parse(formData[key])));
                } else if (key !== 'audio_blob_url') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            await updateInterview(id, formDataToSend);
            navigate('/select-interview');
        } catch (error) {
            console.error('Erro ao atualizar a entrevista:', error);
            setError('Erro ao atualizar a entrevista.');
        }
    };

    return (
        <div className="container my-5">
            <Button variant="link" onClick={() => navigate('/select-interview')} className="mb-3">
                <FaArrowLeft /> Voltar para Seleção de Entrevistas
            </Button>
            <h2>Editar Entrevista</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSaveChanges}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
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
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formInterviewers">
                    <Form.Label>Entrevistadores</Form.Label>
                    <Form.Control
                        type="text"
                        name="interviewers"
                        value={formData.interviewers}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formInterviewees">
                    <Form.Label>Entrevistados</Form.Label>
                    <Form.Control
                        type="text"
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
                        name="interview_type"
                        value={formData.interview_type}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formAudioPreview">
                    <Form.Label>Áudio Existente</Form.Label>
                    {formData.audio_blob_url ? (
                        <audio controls className="w-100">
                            <source src={formData.audio_blob_url} type="audio/mpeg" />
                            Seu navegador não suporta o elemento de áudio.
                        </audio>
                    ) : (
                        <p>Nenhum áudio disponível no momento.</p>
                    )}
                </Form.Group>

                <Form.Group controlId="formAudio">
                    <Form.Label>Substituir Áudio</Form.Label>
                    <Form.Control
                        type="file"
                        name="audio"
                        accept="audio/*"
                        onChange={handleFileChange}
                    />
                    <Form.Text className="text-muted">
                        Carregue um novo arquivo para substituir o áudio existente.
                    </Form.Text>
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
                    Salvar Alterações
                </Button>
            </Form>
        </div>
    );
};

export default EditInterviewPage;