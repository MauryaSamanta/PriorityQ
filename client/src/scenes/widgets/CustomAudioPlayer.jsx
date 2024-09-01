import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import WaveSurfer from 'wavesurfer.js';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const CustomAudioPlayer = ({ audioURL,chat }) => {
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null); // Use a ref to track the WaveSurfer instance
  const [isPlaying, setIsPlaying] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const handlePlayPause = () => {

    if (waveSurferRef?.current && audioURL) {
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
        barWidth: 4,
        barGap: 3,
        barRadius: 20,
        height:  50,
        responsive: true,
        hideScrollbar: true,
        normalize: true,
        backgroundColor: 'transparent', // Remove the background color
      });

      waveSurferRef.current.load(audioURL);
      
      waveSurferRef.current.on('finish', () => {
        setIsPlaying(false);
      });
      // Cleanup WaveSurfer instance on component unmount
      return () => {
        if (waveSurferRef.current) {
          waveSurferRef.current.destroy();
          waveSurferRef.current = null;
        }
      };
    }
  }, [audioURL]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={handlePlayPause} style={playButtonStyles}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <div
        ref={waveformRef}
        style={{ width: !isMobile?'200px':'100px', marginLeft: '16px', height: '60px' }}
      />
    </div>
  );
};

const playButtonStyles = {
  backgroundColor: '#ffcc00',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  color: '#fff',
};

export default CustomAudioPlayer;
