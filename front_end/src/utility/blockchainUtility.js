const Web3  = require('web3/dist/web3.min.js');
const Kryptogram = require('../contract_abi/Kryptogram.json');

export let web3 = new Web3('https://ropsten.infura.io/v3/bdee707cfd8247049f6d8c291bcecf34');

export async function connectWallet(){
    const connectionInfo = {address:'',chainId:'',error:''};
    if(window.ethereum) {
        web3 = new Web3(window.ethereum);
        try{
            const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const chainId = await web3.eth.getChainId();
            
            return ({address,chainId,error:''});
        }
        catch(error){
            if(error.code === 4001){
                return ({
                    ...connectionInfo,
                    error:'please login to your account using metamask'
                })
            }
        }
    }
    else {
        return ({
            ...connectionInfo,
            error:'Metamask is not available. Please download it'
        })
    }
}

export async function fetchPosts() {
    const kryptogramContract = new web3.eth.Contract(Kryptogram.abi,Kryptogram.networks['3'].address);

    const postsCount = await kryptogramContract.methods.postsCount().call();

    let posts = [];

    for(let i=postsCount;i >= 1;i--) {
        const result = await kryptogramContract.methods.posts(i).call();

        let post = {
            id: result.id,
            imgHash: result.imgHash,
            description: result.description,
            createdTime: result.createdTime,
            tipAmount: web3.utils.fromWei(result.tipAmount,'ether'),
            author: result.author
        }

        posts.push(post);
    }
    return posts;
}

export async function createPost(imgHash,description,address,networkId) {
    web3 = new Web3(window.ethereum);

    const kryptogramContract = new web3.eth.Contract(Kryptogram.abi,Kryptogram.networks[networkId].address);

    await kryptogramContract.methods.createPost(imgHash,description).send({from:address});

    let posts = await fetchPosts();

    return posts;
}

export async function TipPost(tipAmount,tipperAddress,postId) {
    const web3 = new Web3(window.ethereum);
    const kryptogramContract = new web3.eth.Contract(Kryptogram.abi,Kryptogram.networks['3'].address);

    await kryptogramContract.methods.tipPostAuthor(postId).send({
        from:tipperAddress,
        value:web3.utils.toWei(tipAmount.toString(),'ether')
    });

    let posts = await fetchPosts();

    return posts;
}

export async function fetchUserPosts(address) {
    console.log(address)
    const web3 = new Web3(window.ethereum);
    const kryptogramContract = new web3.eth.Contract(Kryptogram.abi,Kryptogram.networks['3'].address);

    let posts = await kryptogramContract.getPastEvents('PostCreated',{
        filter:{
            author:address
        },
        fromBlock: 0,
        toBlock: 'latest'
    })

    console.log(posts)

    let userPosts = [];

    for(let post of posts) {
        let userPost = {
            author : post.returnValues.author,
            description : post.returnValues.description,
            imgHash : post.returnValues.imgHash
        }

        userPosts.unshift(userPost);
    }

    return userPosts;
}

export async function fetchTippedPosts(address) {
    const web3 = new Web3(window.ethereum);
    const kryptogramContract = new web3.eth.Contract(Kryptogram.abi,Kryptogram.networks['3'].address);

    let posts = await kryptogramContract.getPastEvents('PostTipped',{
        filter:{
            donor:address
        },
        fromBlock: 0,
        toBlock: 'latest'
    })

    let tippedPosts = [];

    for(let post of posts) {
        let tippedPost = {
            author : post.returnValues.author,
            imgHash : post.returnValues.imgHash,
            tippedAmount : web3.utils.fromWei(post.returnValues.amountTipped,'ether')
        }

        tippedPosts.unshift(tippedPost);
    }

    return tippedPosts;
}

