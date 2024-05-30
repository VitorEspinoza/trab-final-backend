import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { Readable } from "stream";
@Injectable()
export class FileService {

    private photoContainer = 'user-photos';

    private containerClient: ContainerClient;

    constructor() {
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        this.containerClient = blobServiceClient.getContainerClient(this.photoContainer);
    }

    private getBlobNameFromUrl(photoUrl: string) {
        const url = new URL(photoUrl);
        return url.pathname.split('/').pop();
    }

    async uploadUserPhoto(photo: Express.Multer.File, fileName: string = uuidv4().toString() + photo.mimetype.replace('image/', '.')) {
            const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
            const fileStream = Readable.from(photo.buffer);
            return {
                uploadResponse: await blockBlobClient.uploadStream(fileStream),
                fileName: fileName
            };
    }

    async deleteUserPhoto(photoUrl: string) {
            const blobName = this.getBlobNameFromUrl(photoUrl);
            const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
            return blockBlobClient.delete();   
    }
}
