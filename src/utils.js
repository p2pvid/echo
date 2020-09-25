import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'
import * as nearlib from 'near-api-js';


const nearConfig = getConfig(process.env.NODE_ENV || 'development')



	// Initializing contract
	export async function InitContract() {
		const nearConfig = getConfig(process.env.NODE_ENV || 'development');

		// Initializing connection to the NEAR
		const near = await nearlib.connect({
			deps: {
				keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore(),
			},
			...nearConfig,
		});

		// Needed to access wallet
		const walletConnection = new nearlib.WalletConnection(near);

		// Load in account data
		let currentUser;
		if (walletConnection.getAccountId()) {
			currentUser = {
				accountId: walletConnection.getAccountId(),
				balance: (await walletConnection.account().state()).amount,
			};
		}

		// Initializing our contract APIs by contract name and configuration.
		const contract = await new nearlib.Contract(walletConnection.account(), nearConfig.contractName, {
			// View methods are read only. They don't modify the state, but usually return some value.
			viewMethods: ['getTier', 'getTiersList', 'displayGlobalTiers'],
			// Change methods can modify the state. But you don't receive the returned value when called.
			changeMethods: ['createTier', 'deleteTier', 'sendContributionAPI', 'initiateContribution', "initContributionAPI"],
			// Sender is the account ID to initialize transactions.
			sender: walletConnection.getAccountId(),
		});
		return { contract, currentUser, nearConfig, walletConnection, near };
	}


export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

export function signTX(TX) {
	window.walletConnection.requestSignTransactions(TX);
}
