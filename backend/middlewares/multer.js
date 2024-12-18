import multer from "multer";
const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 500000,
  },
});
//const multerUpload = multer({});
const avatarupload = multerUpload.single("avatar");

const attachmentsMulter = multerUpload.single("file");

const folderMulter=multerUpload.array("files",10);

const audioMulter=multerUpload.single("audio");

export { avatarupload, attachmentsMulter, folderMulter, audioMulter };
