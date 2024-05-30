import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { BlobServiceClient } from "@azure/storage-blob";
import { Readable } from "stream";
@Injectable()
export class FileService {

async uploadUserPhoto(photo: Express.Multer.File, fileName: string = uuidv4().toString() + photo.mimetype.replace('image/', '.')) {
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient('user-photos');
        await containerClient.setAccessPolicy('blob');
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        const fileStream = Readable.from(photo.buffer);
        return {
           uploadResponse: await blockBlobClient.uploadStream(fileStream),
           fileName: fileName
        }
    }
}

