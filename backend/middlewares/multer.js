import multer from "multer";
const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const avatarupload = multerUpload.single("avatar");

const attachmentsMulter = multerUpload.single("file");

const folderMulter=multerUpload.array("files",10);

export { avatarupload, attachmentsMulter, folderMulter };
