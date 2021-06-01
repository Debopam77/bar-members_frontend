import QRCode from 'qrcode';

const generateQRCode = async text => {
    let src = '';
    try {

        src = await QRCode.toDataURL(text);
    }catch(error) {
        alert(error);
    }
    return src;
}

export default generateQRCode;