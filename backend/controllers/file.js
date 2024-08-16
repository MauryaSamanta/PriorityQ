import File from "../models/File.js"


export const getFiles=async(req,res)=>{
    const userid=req.user.id;
    const {hubid}=req.params;
    try {
        const files=await File.find({user_id:userid, hub_id:hubid});
        res.status(200).json(files);
    } catch (error) {
        console.log(error);
        res.status(400).json(`Internval Server error`);
    }
}


export const saveFile=async(req,res)=>{
    const userid=req.user.id;
    //console.log(userid);
    const {file_url, file_name, hub_id, folder, name_folder}=req.body;

    try {
        const newfile=new File({
            user_id:userid,
            hub_id:hub_id,
            file_url:file_url,
            file_name:file_name,
            name_folder:name_folder,
            folder:folder
        });
        const savedFile=await newfile.save();
        res.status(200).json(`Success`);

    } catch (error) {
        console.log(error);
        res.status(400).json(`Internal Server Error`);
    }
}

export const addfiletofolder=async(req,res)=>{
    const{fileid,folderid}=req.params;
    try {
        const file=await File.findById(fileid);
        const fileData={file_name:file.file_name, file_url:file.file_url};
        const folder=await File.findById(folderid);
        folder.folder.push(fileData);
        await folder.save();
        const deleteFile=await File.deleteOne({_id:fileid});
        res.status(200).json({file_name:fileData.file_name,file_url:fileData.file_url});
    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
    }
}

export const deleteFiles=async(req,res)=>{
    const {fileid}=req.params;
    try {
        const deleteFile=await File.deleteOne({_id:fileid});
        res.status(200).json(`Success`);
    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
    }
}