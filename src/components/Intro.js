import React, {Component} from 'react'
import MBR_poster from '../MBR_poster.png'

class Intro extends Component {
    render() {
        return (
            <div className='d-flex flex-column text-center mr-auto ml-auto' style={{opacity:'.9', maxWidth:'670px', minHeight:'100vm'}}>
                <div className='p-2 mb-3 mt-5 font-weight-bold'><h2>Hello, there</h2></div>   
                <div className='p-2 ml-auto mr-auto mb-3' style={{maxWidth:'800px'}}>Welcome! MB is a crypto-coin established on January 28th, 2023. 
                    <br/>It was created by JunBro, C.T.O of the SJH company . 
                    <br/>This cryptoCurrency havs a symbolic meaning of the footsteps of MakBangRu with SJH. 
                    <img className='ml-auto mr-auto mt-4 mb-4' src={MBR_poster} alt='MBR' height='500px' width='400px'/>
                    <br/>You can also meet the MakBangRu daily life at 'mbr_lovelys' instargram. Anytime visit us! 
                    <br/>For the more infomation about SJH, Visit our 
                    <b style={{color:'gray', cursor:'pointer'}}
                    onClick={() => window.open('https://junbro1908.github.io/firstweb/src/index.html', '_blank')}
                    > website </b> 
                    <br/>Then, have a nice day~
                </div>            
            </div>
        )
    }
}

export default Intro;
