import React, {Component} from 'react'
import bank from '../bank.png'


class Navbar extends Component {
    render() {
        return (
            <nav className='navbar navbar-dark fixed-top shadow p-0' style={{backgroundColor:'#F4C16B', height:'80px'}}>
                <a className='navbar-brand col-sm-3 col-md-2 mr-0' style={{color:'white'}}>
                <img src={bank} height='70' width='70' className='d-inline-block-align' alt='bank'/>
                &nbsp; <b>DAPP MBR Decentralized Bank</b>
                </a>
                <ul className='navbar-nav px-3' style={{backgroundColor:'white', opacity:'.5'}}>
                    <li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
                        <small style={{color:'black'}}><b>ACCOUNT :  {this.props.account}</b>
                        </small>
                    </li>
                </ul>
            </nav>
        )
    }
}
// we do not need to use className when we touch img file because img itself can bring img source.
// &nbsp; means blank

export default Navbar;