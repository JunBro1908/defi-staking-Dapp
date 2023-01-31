import React, {Component} from 'react'


class Static extends Component {
    render() {
        const stakers = this.props.stakers
        const num_stakers = stakers.length

        const historyAddress = this.props.historyAddress 
        const historyAmount= this.props.historyAmount
        const historyType= this.props.historyType
        console.log(historyType)

        function eachStakers() {
            
            const rendering = () => {
            const result = [];
                for (let i = 0; i < stakers.length; i++) {
                result.push(<span key={i}>{stakers[i] + " "}</span>);
                }
                return result;
            };
            
            return <div>{rendering()}</div>;
        }

        function stakingHistory() {
            const rendering = () => {
            const result = [];
                for (let i = 0; i < historyAddress.length; i++) {
                    if(historyType[i] == 0) {
                        result.push(<tr><td>{'stake'}</td><td>{historyAddress[i]}</td><td style={{color:'blue'}}>{window.web3.utils.fromWei(historyAmount[i],'Ether')}</td></tr>);
                    }
                    else {
                        result.push(<tr><td>{'unstake'}</td><td>{historyAddress[i]}</td><td style={{color:'red'}}>{window.web3.utils.fromWei(historyAmount[i],'Ether')}</td></tr>);
                    }
                };
                return result;
            };
            
            return <tbody>{rendering()}</tbody>;
        }


        return (
            <div className='text-center mt-5' style={{border: '1px solid #8B572A'}}>
                <div>
                    <h2 className='mt-4 ml-3 mr-3 pt-2' style={{color:'white',background:'#d49863', height:'60px',borderRadius:'5px 5px 5px 5px'}}>The Figure of MBR mock tokens</h2><br/><br/>
                    <b>Total amount of stake</b><br/><b style={{color:'red'}}>{window.web3.utils.fromWei(this.props.totalStaken,'Ether')}</b> MBR is currently staking!<br/><br/>
                    <b>How many wallets are staking</b><br/><b style={{color:'red'}}>{num_stakers}</b> addresses are connected! <br/><br/>
                    <b>Currently staking address</b><br/><p style={{color:'gray'}}>{eachStakers()}</p>
                </div>
                <div className='mt-4 ml-3 mr-3'>
                    <h4 className='mb-3'><b>Staking history</b></h4>
                    <table className='table text-muted text-center mt-1'>
                        <thead>
                            <tr style={{color:'black'}}>
                                <th scope='col'>Type</th>
                                <th scope='col'>Address</th>
                                <th scope='col'>Amount</th>
                            </tr>
                        </thead>
                        {stakingHistory()}
                    </table>
                </div>
            </div>
        )
    }
}

export default Static;