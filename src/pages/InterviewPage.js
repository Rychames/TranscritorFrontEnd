import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getInterviewById } from "../apis/InterviewAPI";
import AudioPlayer from "../components/AudioPlayer";

const InterviewPage = () => {
    const { id } = useParams(); // Obtém o ID da URL
    const [interview, setInterview] = useState(null); // Estado para armazenar a entrevista
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const audioRef = useRef(null); // Referência do áudio compartilhada

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const data = await getInterviewById(id);
                if (data.transcribed_text) {
                    data.transcribed_text = JSON.parse(data.transcribed_text);
                }
                setInterview(data);
            } catch (err) {
                setError("Erro ao carregar a entrevista.");
            } finally {
                setLoading(false);
            }
        };

        fetchInterview();
    }, [id]);

    const playWordAudio = (start, end) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = start;
            audio.play();
            setTimeout(() => {
                audio.pause();
            }, (end - start) * 1000); // Converter para milissegundos
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container my-5">
            {/* Título centralizado */}
            <div className="text-center">
                <h1>{interview.title}</h1>
                {interview.subtitle && (
                    <h5 className="text-muted">{interview.subtitle}</h5>
                )}
            </div>

            {/* Texto "Transcrição" alinhado à esquerda */}
            <h4 className="mt-4">Transcrição</h4>

            {/* Transcrição */}
            <div className="transcription-text">
                {interview?.transcribed_text?.segments?.length > 0 ? (
                    interview.transcribed_text.segments.map((segment, index) => (
                        <div key={index} className="mb-4">
                            {segment.speaker && (
                                <p className="text-primary fw-bold">
                                    {segment.speaker}
                                </p>
                            )}
                            <p className="text-muted">
                                [{Math.floor(segment.start / 60)}:
                                {Math.floor(segment.start % 60)
                                    .toString()
                                    .padStart(2, "0")}]
                            </p>
                            <p>
                                {segment.words.map((word, i) => (
                                    <span
                                        key={i}
                                        className="word"
                                        style={{
                                            cursor: "pointer",
                                            color: "blue",
                                        }}
                                        onClick={() =>
                                            playWordAudio(word.start, word.end)
                                        }
                                    >
                                        {word.text}{" "}
                                    </span>
                                ))}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>Transcrição indisponível.</p>
                )}
            </div>

            {/* Player de áudio */}
            <AudioPlayer
                audioRef={audioRef}
                audioFile={
                    interview?.audio &&
                    URL.createObjectURL(
                        new Blob([new Uint8Array(interview.audio.data)], {
                            type: "audio/mpeg",
                        })
                    )
                }
            />
        </div>
    );
};

export default InterviewPage;
