
const convertImgToBuffer = async (file)=> {
    
    if(parseInt(file.size) < 250000) {
        //Convert Image file to a arrayBuffer
        const arrayBufferImage = await file.arrayBuffer();
        const bufferImage = Buffer.from(arrayBufferImage);
        return bufferImage;
    }

    throw new Error('File size exceeded, file should be less than 250KB');
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

const getAvatar = (member)=> {
    let bufferImage;
    let url;
    if(!member)
        return undefined;
    //If the member object has a avatar field
    if(member.avatar && member.avatar.data.length > 0){
        //Getting the array from the member.avatar object
        bufferImage = member.avatar.data;
        //get url from the blob
        url = URL.createObjectURL(convertBufferToImg(bufferImage));
    }
    return {
        bufferImage : bufferImage,
        url : url
    }
}

export {convertImgToBuffer, convertBufferToImg, getFileURL, getAvatar};