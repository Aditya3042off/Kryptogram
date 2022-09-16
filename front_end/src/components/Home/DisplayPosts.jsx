import React,{useState} from 'react'
import { useEffect } from 'react';

import Posts from './Posts';

import { postsDataContext } from '../../App'

import './DisplayPosts.css'
import { useContext } from 'react';

const filterby_options = {
    latest:'Latest',
    mostTipped:'Most Tipped'
}

const DisplayPosts = () => {
    const [filterby,setFilterby] = useState(filterby_options.latest);
    const {publicPosts} = useContext(postsDataContext);

    function handleFilterByChange(evt) {
        setFilterby(prev => evt.target.value);
    }

    const reorderPosts = (() => {
        
        if(filterby === filterby_options.latest) {
            console.log(filterby);
            return publicPosts;
        }

        const roerderedPosts = publicPosts.slice();

        roerderedPosts.sort((obj1,obj2) => {
            if(parseFloat(obj1.tipAmount) === parseFloat(obj2.tipAmount)) 
                return parseInt(obj2.id) - parseInt(obj1.id);

                return parseFloat(obj2.tipAmount) - parseFloat(obj1.tipAmount);
        })

        return roerderedPosts;
    })();

    useEffect(() => {
        const currInput =  document.getElementById(filterby_options.latest);
        currInput.checked = true;
    },[])

  return (
    <div className="DisplayPosts" >
        <div className='Filter' style={{fontSize:'17px'}}>
            <label htmlFor="">Filter By:&nbsp;</label>

            <input type="radio" value = {filterby_options.latest} id={filterby_options.latest} name="filterby_sequence" onClick={handleFilterByChange}/>
            <label htmlFor={filterby_options.latest}>{filterby_options.latest}&nbsp;</label>

            <input type="radio" value = {filterby_options.mostTipped} id={filterby_options.mostTipped} name="filterby_sequence" onClick={handleFilterByChange}/>
            <label htmlFor={filterby_options.mostTipped}>{filterby_options.mostTipped}&nbsp;</label>
        </div>
        <hr />
        <div className="DisplayPosts-posts">
            <Posts publicPosts={reorderPosts} />
        </div>
    </div>
  )
}

export default DisplayPosts