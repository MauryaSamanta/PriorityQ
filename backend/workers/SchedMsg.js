import cron from "node-cron";
import moment from "moment";
import SchedMsg from "../models/SchedMsg.js";

// This task runs every minute
export const messagecron=(io)=>{cron.schedule('* * * * *', async () => {
  const now = moment().local().format('YYYY-MM-DDTHH:mm:ss.SSS');
  console.log(now);
  // Find messages where the scheduled_time is less than or equal to now
  const messagesToSend = await SchedMsg.find({ 
    scheduled_time: { $lte: now },
    status: 'Pending'
  });
  //console.log(messagesToSend);
  for (const message of messagesToSend) {
    // Send message to the recipient (use your message sending logic)
    console.log(message);
    //io.to(message.zone).emit('receiveMessage', message);
    // Update message status to 'Sent'
    message.status = 'Sent';
    await message.save();
  }
});
}