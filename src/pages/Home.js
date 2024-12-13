import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Home = ({ darkMode, toggleDarkMode }) => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Bem-vindo ao Transcritor de Entrevistas</h1>
                        <p>
                            Este sistema permite transcrever áudios de entrevistas com timestamps, oferecendo uma forma fácil de visualizar e reproduzir palavras específicas no áudio.
                            Você também pode criar novas entrevistas ou selecionar uma existente para trabalhar.
                        </p>
                        <button
                            className={`btn ${darkMode ? 'btn-light' : 'btn-dark'}`}
                            onClick={toggleDarkMode}
                        >
                            Alternar Modo {darkMode ? 'Claro' : 'Escuro'}
                        </button>
                    </div>

                    <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                        <button
                            className="btn btn-primary mb-3"
                            onClick={() => navigate('/select-interview')}
                        >
                            Acessar Página de Entrevista
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/create-interview')}
                        >
                            Criar Nova Entrevista
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
