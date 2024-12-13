import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SelectInterviewPage from './pages/SelectInterviewPage';
import CreateInterviewPage from './pages/CreateInterviewPage';
import EditInterviewPage from './pages/EditInterviewPage';
import InterviewPage from './pages/InterviewPage';

const App = () => {
    const [darkMode, setDarkMode] = useState(true); // Inicia em modo noturno

    // Atualiza o tema no elemento <html>
    useEffect(() => {
        const rootElement = document.documentElement;
        if (darkMode) {
            rootElement.classList.add('dark-mode');
        } else {
            rootElement.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
                />
                <Route
                    path="/select-interview"
                    element={<SelectInterviewPage darkMode={darkMode} />}
                />
                <Route
                    path="/create-interview"
                    element={<CreateInterviewPage darkMode={darkMode} />}

                />
                <Route
                    path="/edit-interview/:id"
                    element={<EditInterviewPage darkMode={darkMode} />}
                />
                <Route
                    path="/interview"
                    element={<InterviewPage darkMode={darkMode} />}
                />
                <Route
                    path="/interview/:id"
                    element={<InterviewPage darkMode={darkMode}/>}
                />
            </Routes>
        </Router>
    );
};

export default App;
