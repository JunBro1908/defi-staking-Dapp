const MBR = artifacts.require('MBR')
const RWD = artifacts.require('RWD')
const DecentralBank = artifacts.require('DecentralBank')

//async make the code delay until the data arrive like await
module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(MBR)
    // await : wait until deploy and get data from MBR
    const mbr = await MBR.deployed()
    // deploy MBR contract on block chain and we use tehter contract as const MBR.
    
    await deployer.deploy(RWD)
    const rwd = await RWD.deployed()

    await deployer.deploy(DecentralBank, rwd.address, mbr.address)
    const decentralBank = await DecentralBank.deployed()
    // DecentralBank is the contract and decentralBank is the name of variable which indicate the contract
    
    await rwd.transfer(decentralBank.address,'100000000000000000000000')
    /* we use transfer function in rwd. put decentralBank address and amount of money(one million coin = totalSupply) 
    to transfer all rwd token to decentral Bank */

    await mbr.transfer(accounts[1], '100000000000000000000')
    await mbr.transfer(accounts[2], '100000000000000000000')    
    await mbr.transfer(accounts[3], '100000000000000000000')    
    
    // we use transfer function in mbr. input the investor address(second one for example) and we gona give 100 coin for sign up
};