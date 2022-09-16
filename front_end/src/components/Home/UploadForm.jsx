import { useContext,useState } from 'react';
import {BsImageFill} from 'react-icons/bs'
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

import './UploadForm.css';

import { accountInfoContext,postsDataContext } from '../../App';

import { createPost } from '../../utility/blockchainUtility';

const infid = process.env.REACT_APP_INFURA_ID;
const infsc = process.env.REACT_APP_INFURA_SECRET;

const auth = 'Basic ' + Buffer.from(infid + ':' + infsc).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

const UploadForm = () => {

  const {connectionInfo} = useContext(accountInfoContext);
  const {setPublicPosts,setPostDataLoading} = useContext(postsDataContext);

  const [image,setImage] = useState({});
  const [description,setDescription] = useState('');

  const handlePostSubmit = async (evt) => {
		evt.preventDefault();
		setPostDataLoading(true);

		const imgHash = await client.add(image);

		let newPosts = await createPost(imgHash.path,description,connectionInfo.address,connectionInfo.chainId);

		setPublicPosts(prev => newPosts);
		setPostDataLoading(false);
		
		setImage({});
		setDescription('');
  }

  return (
	<div className="UploadForm">
		<form action="">
			<div className="img-box">
				<label htmlFor="img-input">
					<p style={{fontSize:'30px'}}><BsImageFill/> <br />Select Image</p>
					 
					<input id='img-input' type="file" accept="image/*" style={{color:'azure'}} onChange={(evt) => setImage(prev => evt.target.files[0])}/>
				</label>
			</div>
			<div className="description-box">
				<label style={{color:'azure',fontSize:'20px'}} className='label'>Description</label>
				<input type="text" maxLength={140} id='description' value={description}  style={{fontSize:'15px'}} onChange={(evt) => setDescription(prev => evt.target.value)}/>
			</div>
			<div className="btn-box" >
				<button className="custom-btn btn" onClick={handlePostSubmit}><span>Submit</span></button>
			</div>
		</form>
	</div>
  )
}

export default UploadForm