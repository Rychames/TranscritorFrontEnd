import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import { getAllInterviews, deleteInterview } from '../apis/InterviewAPI'; // Importando as funções necessárias

const SelectInterviewPage = ({ darkMode }) => {
    const navigate = useNavigate(); // Inicializando o hook useNavigate
    const [interviews, setInterviews] = useState([]); // Estado para armazenar as entrevistas
    const [loading, setLoading] = useState(true); // Estado para controlar o loading
    const [error, setError] = useState(null); // Estado para armazenar erros

    // Função para buscar entrevistas
    const fetchInterviews = async () => {
        try {
            const data = await getAllInterviews();
            setInterviews(data);
        } catch (err) {
            setError('Erro ao carregar entrevistas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterviews(); // Chama a função ao montar o componente
    }, []);

    const handleAddInterview = () => {
        navigate('/create-interview'); // Redirecionando para a página de criação de nova entrevista
    };

    const handleEditInterview = (id) => {
        navigate(`/edit-interview/${id}`); // Redirecionando para a página de edição da entrevista
    };

    const handleDeleteInterview = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta entrevista?')) {
            try {
                await deleteInterview(id); // Chama a função para excluir a entrevista
                setInterviews(interviews.filter(interview => interview.id !== id)); // Atualiza a lista de entrevistas
            } catch (err) {
                setError('Erro ao excluir a entrevista');
            }
        }
    };

    // Renderização do componente
    return (
        <div className={`container my-5 ${darkMode ? 'dark-mode' : ''}`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <label htmlFor="interviewSelect" className="me-2 h1">Selecione a Entrevista:</label>
                <Button variant="success" onClick={handleAddInterview}>NOVA ENTREVISTA</Button>
            </div>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            <ListGroup>
                {interviews.map(interview => (
                    <ListGroup.Item key={interview.id} className="d-flex align-items-center">
                        <FaEdit
                            className="me-2"
                            onClick={() => handleEditInterview(interview.id)}
                            style={{ cursor: 'pointer' }}
                        />
                        <FaTrash
                            className="me-2"
                            onClick={() => handleDeleteInterview(interview.id)}
                            style={{ cursor: 'pointer' }}
                        />
                        {/* Adicionando redirecionamento no título */}
                        <span
                            className="flex-grow-1 text-primary"
                            onClick={() => navigate(`/interview/${interview.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            {interview.title}
                        </span>
                    </ListGroup.Item>
                ))}
            </ListGroup>

        </div>
    );
};

export default SelectInterviewPage;