import React,{useContext} from 'react'

import { postsDataContext } from '../../App'
import Post from './Post';

import './Posts.css'

const Posts = ({publicPosts}) => {
    const {postDataIsLoading} = useContext(postsDataContext);

    if(postDataIsLoading === true) {
        return (
            <h3 style={{textAlign:'center'}}>
                Loading...
            </h3>
        );
    }
    const renderPosts = () => {
        console.log(publicPosts);
        return publicPosts.map((post,idx)=> {
            return <Post 
                        key={idx}
                        address = {post.author}
                        imgHash = {post.imgHash}
                        description = {post.description}
                        tipAmount = {post.tipAmount}
                        postId = {post.id} 
                    />
        })
    }

  return (
    <div className='Posts'>
        {renderPosts()}
    </div>
  )
}

export default Posts