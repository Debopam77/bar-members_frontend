
const convertImgToBuffer = async (file)=> {
    
    if(parseInt(file.size) < 400000) {
        //Convert Image file to a arrayBuffer
        const arrayBufferImage = await file.arrayBuffer();
        const bufferImage = Buffer.from(arrayBufferImage);
        return bufferImage;
    }

    throw new Error('File size exceeded, file should be less than 400KB');
}

const convertBufferToImg = (bufferArray) => {

    const bufferImage = Uint8Array.from(bufferArray).buffer;

    //convert buffer image to a blob
    const imageConverted = (new Blob([bufferImage], { type: 'image/png' }));

    return imageConverted;
}

const getFileURL = (file)=> {
    const url = URL.createObjectURL(file);

    return url
}

export {convertImgToBuffer, convertBufferToImg, getFileURL};