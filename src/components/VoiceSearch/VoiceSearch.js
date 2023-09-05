import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState,useEffect } from 'react';
function VoiceSearch(setInputValue){
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);

    const handleStartListening = () => {
        resetTranscript();
        SpeechRecognition.startListening()
        setIsListening(true);
        
      };
    
      const handleStopListening = () => {
        SpeechRecognition.stopListening()
        setIsListening(false);
      };
    
      useEffect(() => {
        if (isListening) {
            console.log('Transcript:', transcript);
          setInputValue(transcript); 
        }
      }, [isListening, transcript,setInputValue]);

      return {
        handleStartListening,
        handleStopListening,
        isListening,
      };
    }
    
    export default VoiceSearch;