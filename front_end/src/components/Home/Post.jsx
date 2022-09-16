import './Post.css';
import Identicon from 'identicon.js';
import { accountInfoContext,postsDataContext } from '../../App';
import { SiEthereum } from "react-icons/si"
import { useState, useContext } from 'react';
import { TipPost } from '../../utility/blockchainUtility';

const Post = ({ address, imgHash, tipAmount, description,postId }) => {
    const [tipInput, setTipInput] = useState(0.001);
    const { connectionInfo} = useContext(accountInfoContext);
    const {setPublicPosts,setPostDataLoading} = useContext(postsDataContext);

    const handleTipChange = (evt) => {
        setTipInput(evt.target.value);
    }

    const handleClick = async () => {
        setPostDataLoading(prev => true);
        let tipperAddress = connectionInfo.address;
        let posts = await TipPost(tipInput, tipperAddress,postId);
        
        setPublicPosts(prev=>posts);
        setPostDataLoading(prev => false)
        
    }

    var options = {
        background: [21, 21, 21, 255],
        margin: 0.2,
        size: 32
    };

    return (
        <div style={{ fontSize: '18px', padding: '20px' }} className="blue-glassmorphism Post">
            <div className='Post-userInfo' style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center' }} >
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

            <div className='Post-formComp'>
                <span><SiEthereum />{tipAmount} </span>
                <div className='tipping-form'>
                    <input style={{ width: "100px" }} type="number" value={tipInput} onChange={handleTipChange} min="0.001" max="1" step="0.001" />
                    <button style={{ width: "50px" }} onClick={handleClick}><SiEthereum /> </button>
                </div>
            </div>
        </div>
    )
}

export default Post