import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers'; // This import will work after installing @mui/x-date-pickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import isSameDay from 'date-fns/isSameDay';
import isAfter from 'date-fns/isAfter';
import { useSelector } from 'react-redux';

const ScheduleMessageDialog = ({ open, handleClose, message, setMessage, qube, zone }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeerror,settimeerror]=useState(false);
  const {_id, avatar_url, username}=useSelector((state)=>state.user);
  const handleScheduleMessage = async() => {
    if (selectedDate && selectedTime && message) {
      const now = new Date();

      if (!isAfter(now, selectedDate)) {
        console.log('Selected date is in the past.');
        return;  
      }
      if (isSameDay(selectedDate, now) && selectedTime < now) {
        settimeerror(true);
        return; 
      }
      const combinedDateTime = new Date(selectedDate);
      combinedDateTime.setHours(selectedTime.getHours());
      combinedDateTime.setMinutes(selectedTime.getMinutes());
      const timeZoneOffset = combinedDateTime.getTimezoneOffset(); // In minutes
      combinedDateTime.setMinutes(combinedDateTime.getMinutes() - timeZoneOffset);
      console.log(combinedDateTime.toISOString());
      // Create the new message object including scheduled_time
      const newMessage = {
        text: message,
        senderName: username,
        senderAvatar: avatar_url,
        sender_id: _id,
        zone: zone,
        qube: qube,
        scheduled_time: combinedDateTime.toISOString(),  // Send the combined date-time in ISO format
      };
      setSelectedDate(null);
      setSelectedTime(null);
      setMessage('');
      settimeerror(false);
      handleClose();
      try {
        const response=await fetch(`https://surf-jtn5.onrender.com/schedmsg`,{
          method:"POST",
          headers: { "Content-Type": "application/json" },    
          body:JSON.stringify(newMessage)
        })

      } catch (error) {
        
      }
    }
  };

  const isToday = isSameDay(selectedDate, new Date());
  const currentTime = new Date();

  return (
    <Dialog 
    open={open} 
    onClose={handleClose} 
    maxWidth="sm" 
    fullWidth
    sx={{ 
      '& .MuiPaper-root': { 
        borderRadius: '24px'  // Make the dialog box corners more rounded
      }
    }}
    >
      <DialogTitle sx={{ textAlign: 'center', padding: '20px 0', letterSpacing: '0.1em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <img src='/assets/schedule.png' alt="Schedule Icon" style={{ width: '30px', height: '30px' }} />
          
        </Box>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ borderRadius: '12px' }} />}
            disablePast
          />
          <TimePicker
            label="Select Time"
            value={selectedTime}
            onChange={(newTime) =>{ setSelectedTime(newTime); settimeerror(false);}}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ borderRadius: '12px' }} />}
            //minTime={isToday ? currentTime : null} 
          />
          {timeerror && <Typography sx={{color:"#e62e31"}}>Select a future time</Typography>}
        </LocalizationProvider>
       
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
        <Button
          onClick={handleScheduleMessage}
          sx={{
            backgroundColor: '#635acc',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px',
            borderRadius: '10px',
            padding: '10px 30px',
            '&:hover': { backgroundColor: '#4a4b9b' },
          }}
        >
          Schedule Message
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleMessageDialog;
