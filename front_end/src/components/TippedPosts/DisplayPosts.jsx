import React from 'react'
import { useEffect,useContext,useState } from 'react';

import {fetchTippedPosts} from '../../utility/blockchainUtility';

import { accountInfoContext } from '../../App.js';

import './DisplayPosts.css';
import Post from './Post';

const DisplayPosts = () => {

    const {connectionInfo} = useContext(accountInfoContext);

    const [tippedPosts,setTippedPosts] = useState([]);

    useEffect(() => {

        async function fetchPosts(){
            if(connectionInfo.address){
                let posts = await fetchTippedPosts(connectionInfo.address);
                setTippedPosts(prev => posts)
            }
         }

        fetchPosts();

    },[connectionInfo])

    const posts = () => {
        return (
            tippedPosts.map((post)=>{
                return <Post 
                            address = {post.author}  
                            imgHash = {post.imgHash} 
                            tippedAmount = {post.tippedAmount} 
                        />
            })
        )
    }

  return (
    <div className='T_DisplayPosts'>
        { tippedPosts.length === 0 ? <p style={{fontSize:'18px'}}>Sorry No Posts Found</p> :  posts()}
    </div>
  )
}

export default DisplayPosts