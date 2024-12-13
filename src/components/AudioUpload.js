import React, { useState } from 'react';
import axios from 'axios';

const AudioUpload = () => {
    const [audioFile, setAudioFile] = useState(null);

    const handleFileChange = (event) => {
        setAudioFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('audio', audioFile);

        try {
            const response = await axios.post('http://localhost:5000/api/transcriptions', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Upload successful:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Audio</button>
        </div>
    );
};

export default AudioUpload;