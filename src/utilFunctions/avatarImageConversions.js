
const convertImgToBuffer = async (file)=> {
    
            if(parseInt(file.size) < 400000) {
                //Convert Image file to a arrayBuffer
                const imageBuffer = await file.arrayBuffer();
                return imageBuffer;
            }

            throw new Error('File size exceeded, file should be less than 400KB');
}

export {convertImgToBuffer};