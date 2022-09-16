import './Post.css';
import Identicon from 'identicon.js';
import { SiEthereum } from "react-icons/si"

const Post = ({ address, imgHash, tippedAmount}) => {

    var options = {
        background: [21, 21, 21, 255],
        margin: 0.2,
        size: 32
    };

    return (
        <div className="blue-glassmorphism T_Post">
            <div className='T_Post-userInfo' >
                <img
                    alt=''
                    style={{ borderRadius: '50%', objectFit: 'cover', width: 32, height: 32 }}
                    src={`data:image/png;base64,${new Identicon(address, options).toString()}`}
                />
                <p style={{ fontSize: '18px' }}>{address}</p>
            </div>

            <div>
                <img src={`https://ipfs.io/ipfs/${imgHash}`} style={{ borderRadius: '16px' }} width="550px" height="500px" />
            </div>

            <br />

            <div >
                <span>AmountTipped : {tippedAmount}  <SiEthereum /> </span>
            </div>
        </div>
    )
}

export default Post