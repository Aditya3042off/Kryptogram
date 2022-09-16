import React,{useContext} from 'react'

import {NavLink} from 'react-router-dom';

import logo from '../assets/logo.png';
import {connectWallet} from '../utility/blockchainUtility';
import Identicon from 'identicon.js';
import { accountInfoContext } from '../App.js';

import './Navbar.css';

const Navbar = () => {

    const {connectionInfo,setConnectionInfo} = useContext(accountInfoContext);

    const handleClick = async() => {

        if(window.ethereum) {
            const accounts = await window.ethereum.request({method:'eth_accounts'});
            if(accounts.length !== 0)
                return;
        }

        const connectionInfo = await connectWallet();
        setConnectionInfo(prev => connectionInfo);
    }

    const displayAddress = () => {
        let address = '';

        if(connectionInfo.address === ''){
            address = '0x0';
            return address;
        }

        address = connectionInfo.address.slice(0,5) +'...' +connectionInfo.address.slice(-3);
        return address;
    }

  return (
    <div className='gradient-bg-welcome root' style={{height:'70px'}}>
        <div className='Navbar'>
            <div className="Navbar-brand">
                <img src={logo} alt="" width='180px' height='65px'/>
            </div>
            <div className="Navbar-links">
                <ul>
                    <li>
                        <NavLink 
                                to="/"
                                style={({isActive}) => isActive ?  {color:'#a2d2ff',textDecoration:'none'} : {color:'azure',textDecoration:'none'}}
                                >
                                    Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                                 style={({isActive}) => isActive ?  {color:'#a2d2ff',textDecoration:'none'} : {color:'azure',textDecoration:'none'}}
                                 to="/userPosts">My Posts</NavLink>
                    </li>

                    <li>
                        <NavLink
                                 style={({isActive}) => isActive ?  {color:'#a2d2ff',textDecoration:'none'} : {color:'azure',textDecoration:'none'}}
                                 to="/tippedPosts">Tipped Posts</NavLink>
                    </li>
                </ul>
            </div>
            <div className="Navbar-connect">
                    <span>Account: {displayAddress()}</span>
                    &nbsp;
                    { connectionInfo.address
                        ? <img
                            width='20'
                            height='20'
                            alt=''
                            src={`data:image/png;base64,${new Identicon(connectionInfo.address, 20).toString()}`}
                        />
                        : <span></span>
                    }
                    &nbsp;
                    <button className='Navbar-custom-btn Navbar-btn' onClick={handleClick}><span>CONNECT</span></button>
            </div>
        </div>
    </div>
  )
}

export default Navbar