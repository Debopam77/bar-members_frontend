import React, {useState} from 'react';
import '../style/index.scss';
import './../style/MemberCard.scss';

function MemberCardBack({src, url}) {
    const [imageSRC, setImageSRC] = useState('');
    const showQRCode = async ()=> {
        setImageSRC( await src );
    }
    showQRCode();
    return (
        <div className={'card '}>
            <div>
                <div className='memberName'><div className='advocateIcon'/><div className='associationChunk'><div className='associationHeading'>Displaced Lawyers' Bar Association</div><div className='associationAddress'>Barrackpore Court, WB, Kolkata - 700120</div></div></div>
                <div className='centerQRCode'>
                    <img src={imageSRC} className='QRCode' alt='qrcode'></img>
                    <div className='signature'>

                        <div className='dateElement'>
                            <div className='dateText'>Issue Date :</div>
                            <div className='dateSpace'></div>
                        </div>
                        
                        <div className='signatureSpace'/>
                        <div className='signatureText'>Secretary (DLBA, BKP)</div>
                    </div>
                </div>
                <div className='QRCodeURL'>{url}</div>
            </div>
        </div>);
}

export default MemberCardBack;