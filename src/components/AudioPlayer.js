import React, { useState, useEffect } from "react";
import "../styles/AudioPlayer.css";

const AudioPlayer = ({ audioRef, audioFile }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    useEffect(() => {
        if (audioRef.current && audioFile) {
            audioRef.current.src = audioFile;
            audioRef.current.playbackRate = playbackSpeed;
        }
    }, [audioFile, playbackSpeed, audioRef]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            const progressPercentage = (audio.currentTime / audio.duration) * 100;
            setProgress(progressPercentage);

            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
            setCurrentTime(`${minutes}:${seconds}`);
        }
    };

    const handleLoadedMetadata = () => {
        const audio = audioRef.current;
        if (audio) {
            const minutes = Math.floor(audio.duration / 60);
            const seconds = Math.floor(audio.duration % 60).toString().padStart(2, "0");
            setDuration(`${minutes}:${seconds}`);
        }
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        if (audio) {
            const seekTime = (e.target.value / 100) * audio.duration;
            audio.currentTime = seekTime;
            setProgress(e.target.value);
        }
    };

    const changePlaybackSpeed = (e) => {
        const speed = parseFloat(e.target.value);
        setPlaybackSpeed(speed);
        if (audioRef.current) {
            audioRef.current.playbackRate = speed;
        }
    };

    return (
        <div className="audio-player shadow-sm p-3 bg-light fixed-bottom">
            <div className="progress-bar-container">
                <input
                    type="range"
                    className="custom-progress-bar mb-3"
                    value={progress}
                    onChange={handleSeek}
                    min="0"
                    max="100"
                />
            </div>
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            >
                Seu navegador não suporta a reprodução de áudio.
            </audio>
            <div className="d-flex align-items-center gap-3">
                <button
                    onClick={togglePlayPause}
                    className="btn btn-light btn-lg"
                >
                    {isPlaying ? (
                        <i className="bi bi-pause-fill fs-3"></i>
                    ) : (
                        <i className="bi bi-play-fill fs-3"></i>
                    )}
                </button>
                <span className="text-muted small">
                    {currentTime} / {duration}
                </span>
                <select
                    className="form-select form-select-sm w-auto"
                    value={playbackSpeed}
                    onChange={changePlaybackSpeed}
                >
                    <option value="0.5">0.5x</option>
                    <option value="1">1.0x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2.0x</option>
                </select>
            </div>
        </div>
    );
};

export default AudioPlayer;
