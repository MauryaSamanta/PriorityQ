import dotenv from 'dotenv';
import { S3Client } from '@aws-sdk/client-s3';

export const saveinAWS=async(key,file)=>{
    const s3=new S3Client({region:process.env.AWS_BUCKET_REGION,
        credentials:{
          accessKeyId:process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
        }
      });
      try {
        const params={
          Bucket:process.env.AWS_BUCKET_NAME,
          Key: key,
          Body:file.buffer,
          ContentType:file.mimetype,
        
         }
          const command=new PutObjectCommand(params);
          const value=await s3.send(command);
          console.log(value);
       } catch (error) {
         console.log(error);
       }
}