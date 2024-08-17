import Message from "../models/Message.js";

export const messages=async(req,res)=>{
    const {qubeid}=req.params;
    const {tag}=req.body;
    try {
        const messages=await Message.find({qube_id:qubeid, tags:tag});
        console.log(messages);
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
    }
}

export const tags = async (req, res) => {
  const { qubeid } = req.params;
  //console.log("hello");
  try {
    // Find all messages for the given qubeid with tags
    const messages = await Message.find({ qube_id: qubeid, tags: { $exists: true, $ne: "" } });

    // Create a map to count occurrences of each tag
    const tagCount = messages.reduce((acc, message) => {
      const tag = message.tags;
      if (tag) {
        if (acc[tag]) {
          acc[tag] += 1;
        } else {
          acc[tag] = 1;
        }
      }
      return acc;
    }, {});

    // Convert the tag count map to an array of objects
    const tagCountsArray = Object.entries(tagCount).map(([tag, count]) => ({
      tag,
      count,
    }));
    
    res.json({tagCountsArray});
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
