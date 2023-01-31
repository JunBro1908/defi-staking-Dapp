import React, {Component} from 'react'


class Airdrop extends Component {
    
    constructor() {
        super()
        this.state = {time: {}, seconds: 3600};
        this.timer = 0;
        this.startTime = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        //? binding, we can call or find startTime
    }

    startTimer() {
        if(this.timer == 0 && this.state.seconds >0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }
    
    countDown() {
        let seconds = this.state.seconds -1 
        // count 1

        this.setState({
            time: this.secondsToTime(seconds),
            //convert
            seconds: seconds
            // update seconds
        })

        if (seconds == 0) {
            clearInterval(this.timer)
            // stop the count down

            this.props.issueTokens()
        }
    }

    secondsToTime(secs) {
        let hours, seconds, minutes

        hours = Math.floor(secs / (60 * 60))
        // 5.55 hour => 5 hour

        let devisor_for_minutes = secs % (60 * 60)
        // remainder for minutes
        minutes = Math.floor(devisor_for_minutes / 60)
        // 5.55 minutes => 5 minutes

        let devisor_for_seconds = devisor_for_minutes % 60
        // remainder for seconds
        seconds = Math.ceil(devisor_for_seconds)
        // upper value

        let obj = {
            'h':hours,
            'm':minutes,
            's':seconds
        }
        return obj
    }

    /* because it is not async, we do not need to wait until the other
    contracts render first thus we call after mount*/
    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds)
        this.setState({time: timeLeftVar})
    }

    airdropReleaseTokens() {
        let stakingB = this.props.stakingBalance
        if (stakingB >= '50000000000000000000') {
            this.startTimer()
        }
    }

    render() {
        this.airdropReleaseTokens()
        return ( 
            <div style={{color:'black'}}>{this.state.time.h}:{this.state.time.m}:{this.state.time.s}
            </div>
        )
    }
    // timeLeftVar -> Airdrop -> Main.js -> App.js -> React DOM -> network
}

export default Airdrop;