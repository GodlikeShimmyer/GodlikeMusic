import React, { useState } from 'react';

const Home = () => {
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const convertAndPlayVideo = async () => {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await fetch('http://localhost:3000/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
      } else {
        console.error('Error converting video to MP3');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Video to MP3 Converter</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={convertAndPlayVideo}>Convert and Play</button>
    </div>
  );
};

export default Home;
