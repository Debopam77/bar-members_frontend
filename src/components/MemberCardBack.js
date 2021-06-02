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
                    <img src={imageSRC} className='qrcode' alt='qrcode'></img>
                    <div>{url}</div>
                </div>
            </div>
        </div>);
}

export default MemberCardBack;