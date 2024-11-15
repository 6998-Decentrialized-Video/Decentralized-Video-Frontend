import { create } from 'ipfs-http-client';
// import { createFFmpeg } from '@ffmpeg/ffmpeg';

const ipfs = create({ url: 'http://127.0.0.1:5001/api/v0' });
// const ffmpeg = createFFmpeg({ log: true });

class IPFSWrapper {
    constructor() {
        this.address = 'http://127.0.0.1:5001/api/v0';
    }

    async addFile(file, previewPercentage = 10) {
        try {
            // Upload main video to IPFS
            console.log("addFile called");
            const asyncFileIterable = await this.blobToAsyncIterable(file);
            console.log("finished asynciterable");
            console.log(asyncFileIterable);
            const videoCid = await this.uploadToIPFS(asyncFileIterable);
            console.log("video uploaded");
            // Generate and upload preview clip
            // const previewFile = await this.generatePercentagePreview(file, previewPercentage);
            // const previewCid = await this.uploadToIPFS(previewFile);
            const previewCid = videoCid;

            return { video_cid: videoCid, preview_cid: previewCid };
        } catch (error) {
            console.error("Failed to add file to IPFS:", error);
        }
    }

    async blobToAsyncIterable(blob) {
        console.log("Blob");
        return blob.stream();
    }


    async uploadToIPFS(file) {
        const result = await ipfs.add(file);
        return result.path;  // IPFS hash (CID) of the file
    }

    // async generatePercentagePreview(file, percentage = 10) {
    //     if (!ffmpeg.isLoaded()) await ffmpeg.load();
    //
    //     const fileName = file.name;
    //     ffmpeg.FS('writeFile', fileName, await fetch(URL.createObjectURL(file)).then(res => res.arrayBuffer()));
    //
    //     const { duration } = await this.getVideoMetadata(file);
    //
    //     // Calculate preview duration based on percentage
    //     const previewDuration = (duration * percentage) / 100;
    //
    //     // Generate preview using ffmpeg
    //     await ffmpeg.run('-i', fileName, '-t', `${previewDuration}`, '-c:v', 'libx264', 'preview.mp4');
    //
    //     const previewData = ffmpeg.FS('readFile', 'preview.mp4');
    //     return new Blob([previewData.buffer], { type: 'video/mp4' });
    // }

    async getVideoMetadata(file) {
        return new Promise((resolve, reject) => {
            const videoElement = document.createElement('video');
            videoElement.src = URL.createObjectURL(file);

            videoElement.onloadedmetadata = () => {
                resolve({
                    duration: videoElement.duration,
                    width: videoElement.videoWidth,
                    height: videoElement.videoHeight
                });
            };

            videoElement.onerror = (error) => {
                reject("Failed to load video metadata:", error);
            };
        });
    }

    async pinFile(cid) {
        const response = await fetch(`${this.address}/pin/add?arg=${cid}`, { method: 'POST' });
        if (!response.ok) throw new Error("Failed to pin file on IPFS");
        return await response.json();
    }

    async unpinFile(cid) {
        const response = await fetch(`${this.address}/pin/rm?arg=${cid}`, { method: 'POST' });
        if (!response.ok) throw new Error("Failed to unpin file on IPFS");
        return await response.json();
    }

    async listPinnedFiles() {
        const response = await fetch(`${this.address}/pin/ls`, { method: 'POST' });
        if (!response.ok) throw new Error("Failed to list pinned files on IPFS");
        return await response.json();
    }

    async deleteFile(cid) {
        try {
            await this.unpinFile(cid);
            const gcResponse = await fetch(`${this.address}/repo/gc`, { method: 'POST' });
            if (!gcResponse.ok) throw new Error("Failed to run garbage collection on IPFS");
            return await gcResponse.json();
        } catch (error) {
            console.error("Failed to delete file from IPFS:", error);
        }
    }
}

export default IPFSWrapper;
