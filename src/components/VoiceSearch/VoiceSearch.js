import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useEffect,useRef } from 'react';
import LoadingDots from '../LoadingDots/LoadingDots'

function VoiceSearch(inputValue,setInputValue,setIsKeyDown){
    const { transcript, resetTranscript, listening } = useSpeechRecognition();
    const silenceTimeoutRef = useRef(null);

    const handleStartListening = () => {
        resetTranscript();
        SpeechRecognition.startListening()
        setIsKeyDown(true);
        setInputValue("Loading")
      };
    
      const handleStopListening = () => {
        console.log("stop listening called");
        SpeechRecognition.stopListening()
        setIsKeyDown(false);
        setInputValue(transcript);
        console.log('Transcript:', transcript);       
      };

      useEffect(() => {
        if (listening) {
          // User is speaking, clear the silence timeout
          clearTimeout(silenceTimeoutRef.current);
        } else {
          // User has stopped speaking, start a silence timeout
          silenceTimeoutRef.current = setTimeout(() => {
            handleStopListening();
          }, 500); // Adjust the timeout duration as needed
        }
    
        return () => {
          clearTimeout(silenceTimeoutRef.current); // Clean up the timeout on unmount
        };
      }, [listening]);
    
    
      return {
        handleStartListening,
        handleStopListening,
      };
    }
    
    export default VoiceSearch;