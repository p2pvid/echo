const CONTRACT_NAME = process.env.CONTRACT_NAME ||'pogo.testnet'

function getConfig(env) {
  switch (env) {

  case 'production':
  case 'testnet':
    return {
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      contractName: CONTRACT_NAME,
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    }
  case 'development':
  case 'testnet':
    return {
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      contractName: CONTRACT_NAME,
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    }
  case 'testnet':
    return {
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      contractName: CONTRACT_NAME,
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    }
  case 'local':
    return {
      networkId: 'local',
      nodeUrl: 'http://localhost:3030',
      keyPath: `${process.env.HOME}/.near/validator_key.json`,
      walletUrl: 'http://localhost:4000/wallet',
      contractName: CONTRACT_NAME,
    }
  case 'test':
  case 'ci':
    return {
      networkId: 'shared-test',
      nodeUrl: 'https://rpc.ci-testnet.near.org',
      contractName: CONTRACT_NAME,
      masterAccount: 'test.near',
    }
  case 'ci-testnet':
    return {
      networkId: 'shared-test-staging',
      nodeUrl: 'https://rpc.ci-testnet.near.org',
      contractName: CONTRACT_NAME,
      masterAccount: 'test.near',
    }
  default:
    throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`)
  }
}

module.exports = getConfig
