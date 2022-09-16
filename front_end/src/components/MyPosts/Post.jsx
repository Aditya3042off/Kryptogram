import './Post.css';
import Identicon from 'identicon.js';

const Post = ({ address, imgHash, description}) => {

    console.log(imgHash)

    var options = {
        background: [21, 21, 21, 255],
        margin: 0.2,
        size: 32
    };

    return (
        <div className="blue-glassmorphism M_Post">
            <div className='M_Post-userInfo'  >
                <img
                    alt=''
                    style={{ borderRadius: '50%', objectFit: 'cover', width: 32, height: 32 }}
                    src={`data:image/png;base64,${new Identicon(address, options).toString()}`}
                />
                <p style={{ fontSize: '18px' }}>{address}</p>
            </div>

            <div className='Post-postImg'>
                <img src={`https://ipfs.io/ipfs/${imgHash}`} style={{ borderRadius: '16px' }} width="550px" height="500px" />
                <p>{description}</p>
            </div>

        </div>
    )
}

export default Post