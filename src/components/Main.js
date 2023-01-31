import React, {Component} from 'react'
import mbr from '../mbr.png'
import Airdrop from './Airdrop.js'
import Intro from './Intro.js'
import Static from './Static.js'

class Main extends Component {
    render() {
        // console.log(this.props.mbrBalance)

        return (
            <div id='content' className='mt-5 mb-5 mr-auto ml-auto' style={{opacity:'.9'}}>
                <Intro/>
                <div className='mt-5' style={{border: '1px solid #8B572A'}}>
                    <table className='table text-muted text-center mt-5'>
                        <thead>
                            <tr style={{color:'black'}}>
                                <th scope='col'>Staking Balance</th>
                                <th scope='col'>Reward Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{color:'black'}}>
                                <td>{window.web3.utils.fromWei(this.props.stakingBalance,'Ether')} MBR</td>
                                <td>{window.web3.utils.fromWei(this.props.rwdBalance,'Ether')} RWD</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='card mb-2' style={{opacity:'.9'}}>
                        <form 
                        onSubmit={(event) => {
                            event.preventDefault()
                            // prevent multiple progress when click many times

                            let amount
                            amount = this.input.value.toString()
                            // value of the input (string)

                            amount = window.web3.utils.toWei(amount, 'Ether')
                            this.props.stakeTokens(amount)
                            //call the function
                        }}
                        className='mb-3'>
                            <div style={{borderSpacing:'0 rem'}}>
                                <label className='float-left ml-5 mt-3 mb-3' style={{marginLeft:'15px'}}><b>Stake Tokens</b></label>
                                <span className='float-right mr-5 mt-3' style={{marginRight:'8px'}}>
                                    <b>Budget :</b>  {window.web3.utils.fromWei(this.props.mbrBalance,'Ether')}
                                </span>
                                <div className='input-group mb-4 ml-5'>
                                    <input style={{height:'53px', width:'140px'}}
                                    ref={(input)=> {this.input = input}}
                                    // set argument of this function equal to this.input

                                    type='text'
                                    placeholder='0'
                                    required />
                                    <div className='input-group-open'>
                                        <div className='input-group-text'>
                                            <img src={mbr} alt='mbr' height='40px'/>
                                            &nbsp;MBR
                                        </div>
                                    </div>
                                </div>
                                <button type='summit' className='btn btn-primary btn-lg btn-block ml-auto mr-auto mt-5' style={{background:'#8B572A', border: '0px', width:'400px'}}><b>DEPOSIT</b></button>
                            </div>
                        </form>
                        <div className='row ml-auto mr-auto mb-3'>
                            <div className="col-sm">
                                <button type='summit' 
                                    onClick={(event) => {
                                        event.preventDefault()

                                        let amount
                                        amount = this.input.value.toString()
                                        // value of the input (string)

                                        amount = window.web3.utils.toWei(amount, 'Ether')
                                        this.props.unstakeTokens(amount)
                                        //call the function
                                }}
                                className='btn btn-primary btn-lg btn-block' style={{width:'300px', height:'50px',background:'#8B572A', border:'0px'}}><b>WITHDRAW</b></button>
                            </div>
                            <div className="col-sm">
                                <button type='summit' 
                                    onClick={(event) => {
                                        event.preventDefault()
                                    
                                        this.props.unstakeTokensall()
                                        //call the function
                                }}
                                className='btn btn-primary btn-lg btn-block' style={{width:'70px', height:'50px', background:'#8B572A', border:'0px'}}><b>ALL</b></button>
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-1 mb-3' style={{color:'gray'}}>
                        <b>AIRDROP</b>
                        <Airdrop 
                            stakingBalance = {this.props.stakingBalance} 
                            issueTokens = {this.props.issueTokens}/> 
                    </div>
                </div>
                <Static
                    totalStaken= {this.props.totalStaken}
                    stakers= {this.props.stakers}
                    historyAddress= {this.props.historyAddress} 
                    historyAmount= {this.props.historyAmount}
                    historyType= {this.props.historyType}/>
            </div>
        )
    }
    // to get props of main we should announce props beside the component
}

export default Main;