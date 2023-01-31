import React, {Component} from 'react'
// get react
import './App.css'
import Navbar from './Navbar';
// get css and Navbar files
import Web3 from 'web3';
import MBR from '../truffle_abis/MBR.json'
// to connect the network, network Id is needed. and it save in truffle_abis > network > Id
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'
import Main from './Main.js'


class App extends Component {
    

    // componentWillMount function call loadweb3 immediately(before mount)
    async componentWillMount() {
        await this.loadWeb3()
        // call loadweb3
        await this.loadBlockchainData()
    }

     // get block chain data
    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        // get accounts using web3.eth.getAccounts and put it const var
        
        this.setState({account: account[0]})
        //update account info first

        //console.log(account)
    
        const networkId = await web3.eth.net.getId()
        /* get network id. we use ganache and it's id is 5777
        first we get network id by using web3 methods and set variable   */
        
        //console.log(networkId, 'Network ID')


        // load mbr contract
        const mbrData = MBR.networks[networkId]
        // use network id, we set mbr network and make mbrData

        //if mbr data is true = exist
        if(mbrData) {
            const mbr = new web3.eth.Contract(MBR.abi, mbrData.address)
            // get contract abi and address, make new instance mbr

            this.setState({mbr})
            /* we get mbr contract as an object in to the state
            if contract changed state will be update */
            
            let mbrBalance = await mbr.methods.balanceOf(this.state.account).call()
            /* as we announce before we get mbr info through web3 methods and we already set address in state
            get it from web3 thus we should put methods and it is call back function(method) so we put .call() */
            this.setState({mbrBalance: mbrBalance.toString()})
            // we get mbr balance, change as string and put it in to state.

            //console.log({balance: mbrBalance})
        }
        else {
        // can not bring mbr data
            window.alert('mbr contract not deployed')
        }


        //load rwd
        const rwdData = RWD.networks[networkId]
        
        if(rwdData) {
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)

            this.setState({rwd})

            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString()})
            
            //console.log({rwdBalance: rwdBalance})
        }
        else {
            window.alert('rwd contract not deployed')
        }
        
 
        //load decentralBank
        const decentralBankData = DecentralBank.networks[networkId]

        if(decentralBankData) {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            this.setState({decentralBank})

            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance: stakingBalance.toString()})

            var stakers = await decentralBank.methods.getStakers().call()
            this.setState({stakers: stakers})
            // get stakers address as array

            let totalStaken = await decentralBank.methods.getTotalstaken().call()
            this.setState({totalStaken: totalStaken.toString()})
            // get total staken tokens

            let historyAddress = await decentralBank.methods.getAddress().call()
            let historyAmount = await decentralBank.methods.getAmount().call()
            let historyType = await decentralBank.methods.getType().call()
            this.setState({historyAddress:historyAddress})
            this.setState({historyAmount:historyAmount})
            this.setState({historyType:historyType})
        }
        else {
            window.alert('decentralBank contract not deployed')
        }

        // get all contract, finally no more loading thus we put false
        this.setState({loading:false})
    }

        //connect blockchain(metamask) to react. we should use await and async to get data each steps
        async loadWeb3() {
            if(window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                await window.ethereum.enable()
            } // if ethereum is detected, make new instance Web3 and enable it
            else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
            } // if web3 is detected by currentProvider make new instance Web3
            else {
                window.alert('no connection')
            } // if ethereum and web3 is not detected make an alarm
        }

    // stake button : approval -> transferFrom -> deposit tokens -> staking enable
    stakeTokens = (amount) => {
        this.setState({loading:true})
        // content = loading..

        // approve -> deposit
        this.state.mbr.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
        // approve decentralBank address to use X amount of money
            
            this.state.decentralBank.methods.depositTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
            // get decentralBank object from 'this.state' and we use depositTokens function. put amount and customer's address and execute transaction.
                
                this.setState({loading:false})
                // content = <Main.js />
            })
        })
    }

    unstakeTokens = (amount) => {
        this.setState({loading:true})

        this.state.decentralBank.methods.unstakeTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({loading:false})
        })
    }

    unstakeTokensall = () => {
        this.setState({loading:true})

        this.state.decentralBank.methods.unstakeTokensall().send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({loading:false})
        })
    }

    issueTokens = () => {
        this.setState({loading:true})

        this.state.decentralBank.methods.issueTokens().send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({loading:false})
        })
    }


    // put initial value
    constructor(props) {
        super(props)
        this.state = {
            account: "0x0",
            mbr: {},
            rwd: {},
            decentralBank: {},
            mbrBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            totalStaken: '0',
            stakers: [],
            historyAddress: [],
            historyAmount: [],
            historyType: [],
            loading: true
        }
    }
    /* the way to interact dynamically about account : this.state -> constructor(props)
     -> Navbar account={this.state.account} -> Navbar.js -> {this.props.account} */

    // put react code here
    render() {

        /* make loading. if we access main component before loading data, collapse happens 
        thus before loading state become 'false', we should print loading page so that we can prevent error*/
        let content
        {this.state.loading ? 
        content = <p id='loader' className='text-center' style={{margin:'30px'}}>
        LOADING PLEASE WAIT...
        </p> : content= <Main
        mbrBalance={this.state.mbrBalance}
        rwdBalance={this.state.rwdBalance}
        stakingBalance={this.state.stakingBalance}
        totalStaken= {this.state.totalStaken}
        stakers= {this.state.stakers}
        historyAddress= {this.state.historyAddress} 
        historyAmount= {this.state.historyAmount}
        historyType= {this.state.historyType}
        stakeTokens= {this.stakeTokens}
        unstakeTokens= {this.unstakeTokens}
        issueTokens={this.issueTokens}
        unstakeTokensall= {this.unstakeTokensall}
        // get props so that in Main.js we can access these props
        />}
        
        
        return (
            <div>
                <Navbar account = {this.state.account}/>
                <div className='container-fluid mt-5'>
                    <div className='col'>
                        <main role='main' className='col-lg-12 ml-auto mr-auto' style={{maxWidth:'700px', minHeight:'100vm'}}>
                            <div>
                                {content}
                            </div>
                        </main>
                    </div> 
                </div>
            </div>
        )
    }
}
export default App;
// export app file and progress rendering
// rendering pages one by one : true * n and then false print