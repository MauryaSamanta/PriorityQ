import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery, IconButton, Typography } from '@mui/material';
import WaveSurfer from 'wavesurfer.js';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SpeedIcon from '@mui/icons-material/Speed'; // Speed icon for playback rate control

const CustomAudioPlayer = ({ audioURL,recording }) => {
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null); // Use a ref to track the WaveSurfer instance
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1); // State to track playback speed
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

  const handleSpeedChange = () => {
    const nextRate = playbackRate === 3 ? 1 : playbackRate + 0.5; // Cycle from 1x to 3x
    setPlaybackRate(nextRate);
    if (waveSurferRef.current) {
      waveSurferRef.current.setPlaybackRate(nextRate);
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
        height: 50,
        responsive: true,
        hideScrollbar: true,
        normalize: true,
        backgroundColor: 'transparent',
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
      <IconButton onClick={(e)=>{e.stopPropagation();handlePlayPause();}} style={playButtonStyles}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      
      <div
        ref={waveformRef}
        style={{ width: !isMobile ? '200px' : '100px', marginLeft: '16px', height: '60px' }}
      />

      {/* Speed Control Button */}
    {!recording && (  <div style={{ marginLeft: '16px', display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={(e)=>{e.stopPropagation();handleSpeedChange();}} style={speedCircleStyles}>
    <Typography variant="caption" sx={{ color: '#fff' }}>
      {`${playbackRate}x`}
    </Typography>
  </IconButton>
      </div>)}
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

const speedCircleStyles = {
  backgroundColor: '#635acc',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
};

export default CustomAudioPlayer;
