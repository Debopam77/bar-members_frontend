
const convertImgToBuffer = async (file)=> {
    
    if(parseInt(file.size) < 150000) {
        const imgFileTypes = ['.jpeg', '.jfif', '.png', '.jpg'];
        imgFileTypes.forEach((element) => {
            if(file.name.toLowerCase().includes(element))
                imgFileTypes.push('Is an Image');
        });
        if(imgFileTypes[imgFileTypes.length-1] === 'Is an Image'){
            const arrayBufferImage = await file.arrayBuffer();
            const bufferImage = Buffer.from(arrayBufferImage);
            return bufferImage;
        }
        throw new Error('Not an Image file');
    }

    throw new Error('File size exceeded, file should be less than 150KB');
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