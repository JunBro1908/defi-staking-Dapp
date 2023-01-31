const Migrations = artifacts.require("Migrations");
// using artifacts.require, we can use Migrations.sol 

/* when we deploy our contract, by export Migration, we can update
new contract(modify contracts or something) address everytime */
module.exports = function(deployer) {
    deployer.deploy(Migrations);
};