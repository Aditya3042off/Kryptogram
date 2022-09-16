import React from 'react'
import { useEffect,useContext,useState } from 'react';

import {fetchUserPosts} from '../../utility/blockchainUtility';

import { accountInfoContext } from '../../App.js';

import './DisplayPosts.css';
import Post from './Post';

const DisplayPosts = () => {

    const {connectionInfo} = useContext(accountInfoContext);

    const [userPosts,setUserPosts] = useState([]);

    useEffect(() => {

        async function fetchPosts(){
            if(connectionInfo.address){
                let posts = await fetchUserPosts(connectionInfo.address);
                setUserPosts(prev => posts)
            }
         }

        fetchPosts();

    },[connectionInfo])

    const posts = () => {
        return (
            userPosts.map((post)=>{
                return <Post address = {post.author} description={post.description} imgHash = {post.imgHash}  />
            })
        )
    }

  return (
    <div className='M_DisplayPosts'>
        { userPosts.length === 0 ? <p style={{fontSize:'18px'}}>Sorry No Posts Found</p> :  posts()}
    </div>
  )
}

export default DisplayPosts