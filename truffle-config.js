require('babel-register');
require('babel-polyfill');
//bring babel

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }, // hook up with ganache
  },

  // to connecte our contracts to truffle
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/truffle_abis/',
  /* we will build our app with json so it is nessecary to read solidity
  to json. by using this we store the json(read from sol) to abis file 
  which is needed to access the contracts with js */
  compilers: {
    // set up with solidity
    solc: {
      version: '^0.5.0',
      optimizer: {
        enabled: true,
        runs: 200
      },
    }
  }
}

