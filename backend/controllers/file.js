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

export const getFilesUser=async(req,res)=>{
    const userid=req.params.userid;
    try {
        const files=await File.find({user_id:userid});
        console.log(files);
        res.status(200).json(files);
    } catch (error) {
        console.log(error);
        res.status(200).json(`Error`);
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

export const createfolder=async(req,res)=>{
    const {hubid, foldername, id}=req.params;
    //console.log(req.body);
    //const{id,name_folder}=req.body;
    //console.log(name_folder);
    try {
        const newfile=new File({
            user_id:id,
            hub_id:hubid,
            file_url:'',
            file_name:'',
            name_folder:foldername,
            folder:[]
        })
        const savedFile=await newfile.save();
        res.status(200).json(savedFile);
    } catch (error) {
        console.log(error);
        res.status(400).json(`Error`);
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