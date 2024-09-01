import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Box from '@mui/material/Box';

const ChatAudioPlayer = ({ audioURL }) => {
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (waveSurferRef.current) {
      if (isPlaying) {
        waveSurferRef.current.pause();
      } else {
        waveSurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (waveformRef.current && !waveSurferRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#635acc',
        progressColor: '#ffcc00',
        cursorColor: '#ffcc00',
        barWidth: 2,
        barGap: 2,
        barRadius: 2,
        height: 80,
        responsive: true,
        hideScrollbar: true,
        normalize: true,
        backgroundColor: 'transparent',
      });

      waveSurferRef.current.load(audioURL);

      return () => {
        if (waveSurferRef.current) {
          waveSurferRef.current.destroy();
          waveSurferRef.current = null;
        }
      };
    }
  }, [audioURL]);

  return (
    <Box display="flex" alignItems="center" mt={2} mb={2}>
      <IconButton onClick={handlePlayPause} sx={{ color: '#ffcc00' }}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <Box
        ref={waveformRef}
        sx={{
          width: '100%',
          ml: 2,
          height: '80px',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
        }}
      />
    </Box>
  );
};

export default ChatAudioPlayer;
