import {useState,useEffect,createContext} from 'react';
import { Routes, Route} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './pages/Home'; 
import MyPosts from './pages/MyPosts';

import './App.css';

import { fetchPosts } from './utility/blockchainUtility';
import TippedPosts from './pages/TippedPosts';

export const accountInfoContext = createContext();
export const postsDataContext = createContext();

function App() {
  const [connectionInfo,setConnectionInfo] = useState({address:'',chainId:'',error:''});
  const [publicPosts,setPublicPosts] = useState([]);
  const [postDataIsLoading,setPostDataLoading] = useState(true);

  useEffect(() => {
    const assignState = async() => {
      const accounts = await window.ethereum.request({method:'eth_accounts'});

      // console.log(accounts);

      if(accounts.length !== 0) {
        const chainId = await window.ethereum.request({method:'eth_chainId'});
        setConnectionInfo(prev => ({
          ...prev,
          address:accounts[0],
          chainId:parseInt(chainId,16)
        }))
      }
    }
    if(window.ethereum)
      assignState();
  },[])

  useEffect(() => {
    if(connectionInfo.address !== '' && connectionInfo.chainId !== '') {

      const handleAccountsChanged = (accounts) => {
        // for handling the case when user disconnects then accounts array will be empty
        if(accounts.length === 0) accounts.push('');
        setConnectionInfo(prevState => ({
          ...prevState,
          address:accounts[0]
        }))
      };

      const handleChainChanged = (chainId) => {
        setConnectionInfo(prevState => ({
          ...prevState,
          chainId: parseInt(chainId,16)
        }))
      };

      window.ethereum.on('accountsChanged',handleAccountsChanged)

      window.ethereum.on('chainChanged',handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged',handleAccountsChanged);
        window.ethereum.removeListener('chainChanged',handleChainChanged);
      }
    }
  });

  useEffect(() => {
    let posts = [];
    async function fetchPublicPosts() {
       posts = await fetchPosts();
       setPublicPosts(prev => posts);
       
       setPostDataLoading(false);
    }
    fetchPublicPosts();
    
  },[])

  return (
    <accountInfoContext.Provider value={{connectionInfo,setConnectionInfo}}>
      <postsDataContext.Provider value = {{publicPosts,setPublicPosts,postDataIsLoading,setPostDataLoading}}>
      <div className="gradient-bg-welcome">
        <Navbar/>

        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path={`/userPosts/`} element={<MyPosts />} />
          <Route path={`/tippedPosts/`} element={<TippedPosts />} />
        </Routes>

      </div>
      </postsDataContext.Provider>
    </accountInfoContext.Provider>
  );
}

export default App;
