import { useState, useRef } from 'react';
import { InputGroup, Icon, Alert } from 'rsuite';
import { useCallback } from 'react';
import { useParams } from 'react-router';
import { storage } from '../../../misc/firebase';
import { AudioRecorder } from 'react-audio-voice-recorder';

const MicSystem = ({ afterUpload }) => {
  const { chatId } = useParams();

  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const audioRecorderRef = useRef();

  const toggleRecording = () => {
    if (isRecording) {
      audioRecorderRef.current.stopRecording();
    } else {
      audioRecorderRef.current.startRecording();
    }
    setIsRecording(prev => !prev);
  };

  const onUpload = useCallback(
    async audioData => {
      setIsUploading(true);
      try {
        const audioBlob = new Blob([audioData], { type: 'audio/mp3' });

        const snap = await storage
          .ref(`/chat/${chatId}`)
          .child(`audio_${Date.now()}.mp3`)
          .put(audioBlob, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });

        const file = {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
        setIsUploading(false);
        afterUpload([file]);
      } catch (error) {
        setIsUploading(false);
        Alert.error(error.message);
      }
    },
    [afterUpload, chatId]
  );

  return (
    <InputGroup.Button
      onClick={toggleRecording}
      disabled={isUploading}
      className={isRecording ? 'animate-blink' : ''}
    >
      <Icon icon={isRecording ? 'stop-circle' : ''} />
      <AudioRecorder
        ref={audioRecorderRef}
        mimeType="audio/mp3" // Change the mimeType to match the actual format
        onRecordingComplete={onUpload}
        downloadOnSavePress={false}
      />
    </InputGroup.Button>
  );
};

export default MicSystem;
