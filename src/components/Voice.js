import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Voice = () => {
  const navigate = useNavigate();
  const commands = [
    {
      command: ['navigate to about', 'go to about', 'open about page', 'show me about'],
      callback: () => navigate('/about'),
      isFuzzyMatch: true, 
      fuzzyMatchingThreshold: 0.2 
    },
    {
      command: ['navigate to contact', 'go to contact', 'open contact page', 'show me contact'],
      callback: () => navigate('/contact')
    }
  ];
  const { transcript, resetTranscript, listening } = useSpeechRecognition({ commands });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default Voice;
