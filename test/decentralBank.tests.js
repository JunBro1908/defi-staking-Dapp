var assert = require('assert');
const MBR = artifacts.require('MBR')
const RWD = artifacts.require('RWD')
const DecentralBank = artifacts.require('DecentralBank')
// bring contracts by artifacts and define as variable

require('chai')
//bring library chai
.use(require('chai-as-promised'))
//chai extenstion
.should()

//argument : accounts, function A() => {return X}
// accounts -> [owner, customer] 
contract('DecentralBank', ([owner, customer]) => {
    let mbr, rwd, decentralBank
    
    function tokens(number) {
        return web3.utils.toWei(number,'ether')
    }
    // helper function get num of ether(1) and calculate as wei(10^18) / decimal calculation

    before(async() => {
        mbr = await MBR.new() 
         // get mbr contract
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address,mbr.address)
    
        await rwd.transfer(decentralBank.address, tokens('1000000'))
        // from rwd contract, get transfer function so transfer all rw tokens to DecentralBank
   
        await mbr.transfer(customer, tokens('100'), {from:owner})
        // transfer 100 mbr to investor from owner address
        // accounts[1] -> customer, accounts[0] -> owner
    })
    // anywhere this code inserted, execute first(before the describe)
    
    // what we gonna test. explain it using describe
    describe('Mock MBR Deployment', async () => {
        // print the sentences on the terminal that put in 'it'
        it('matches name successfully', async () => {
            const name = await mbr.name()
            // get mbr name from contract mbr. define as const name 
            assert.equal(name, 'Mock MBR Token')
            /* assertion equal, confirm the name of contract name 
            to notify the deployment is successfully executed */
        })
    })

    describe('Reward Token Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name()
            assert.equal(name, 'Reward Token')
        })
    })

    describe('Decentral Bank Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank')
        })

        it('contract has tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address)
            /* get the function(balanceOf) of rwd tokens to find the amount rwd tokens 
            at the decentralBank and define as balance*/ 
            assert.equal(balance, tokens('1000000'))
            /* the amount of rwd tokens in DecentralBank matches one million rwd tokens then 
            print what we put in 'it' */
        })

    describe('Yield Farming', async () => {
        it('rewards tokens for staking', async () => {
            let result

            result = await mbr.balanceOf(customer)
            // get wallet of customer(token amount)
            assert.equal(result.toString(), tokens('100'),'investor mock wallet balance before staking')
            // because we give 100 tokens as a gift to sign up

            await mbr.approve(decentralBank.address, tokens('100'), {from: customer})
            // get approval from customer of trasnfer 100 tokens for staking
            await decentralBank.depositTokens(tokens('100'), {from:customer})
            // staking 100 tokens

            result = await mbr.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'),'customer mock wallet balance after staking')
            // gift 100 tokens - 100 staking = 0

            
            result = await mbr.balanceOf(decentralBank.address)
            //same result : result = await decentralBank.stakingBalance(customer)
            assert.equal(result.toString(), tokens('100'),'decentral Bank mock wallet balance after staking')
            // check teh balance of DB 0 + 100 staking = 100

            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(),'true','customer is staking status after staking')
            // check isStaking function is working

            await decentralBank.issueTokens({from:owner})
            // only react when owner control
            await decentralBank.issueTokens({from:customer}).should.be.rejected
            // to check only owner can control issueTokens function. if not it should reject the access


            await decentralBank.unstakeTokens({from:customer})
            // only react when customer control
            
            result = await mbr.balanceOf(customer)
            assert.equal(result.toString(),tokens('100'),'customer mock wallet balance')
            /* if customer unstaked, customer's staking balance must be zero. 
            and customer mbr wallet must be 100. one thing for sure using
            stakingBalance to find out customer current wallet tokens is wrong
            because unstaking function do not record how much it transfer on it */
        
            result = await decentralBank.stakingBalance(decentralBank.address)
            assert.equal(result.toString(),tokens('0'), 'decentral Bank mock wallet balance')
            // if customer unstake the balance decentralBank have zero token
        
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(),'false','customer is nstaking status after unstaking')
            // to find out whether customer is currently stkaing
        })
    })
    })
})