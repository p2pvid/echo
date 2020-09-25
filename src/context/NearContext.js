import React, { useState, useCallback } from 'react';
// import PropTypes from 'prop-types';

export const NearContext = React.createContext({
	user: null,
	nearContract: null,
	signIn: () => {},
	signOut: () => {},
	isLoading: false,
	setLoading: () => {},
	userWallet: null,
	signTX: () => {},
});

const NearContextProvider = ({ currentUser, nearConfig, wallet, near, nearContract, children }) => {
	const user = useState(currentUser)[0];
  const nearContent = useState(near)[0];
  const contract = useState(nearContract)
	const [isLoading, setLoading] = useState(false);
	const userWallet = useState(wallet)

	const signIn = useCallback(() => {
		wallet.requestSignIn(nearConfig.contractName, 'NEAR Echo');
	}, [wallet, nearConfig]);

	const signOut = useCallback(() => {
		wallet.signOut();
		setTimeout(setLoading(true), 2000);
		window.location = '/';
		setLoading(false);
	}, [wallet]);
	console.log(wallet)

	const signTX = useCallback((TX) => {
		wallet.requestSignTransactions([TX()]);
		// wallet.requestSignIn(nearConfig.contractName, 'NEAR Echo');
	}, [wallet]);
	

	return (
		<NearContext.Provider
			value={{
				user,
				signIn,
				signOut,
				isLoading,
				setLoading,
        nearContent,
				contract,
				wallet,
				signTX,
			}}
		>
			{children}
		</NearContext.Provider>
	);
};

// NearContextProvider.propTypes = {
// 	currentUser: PropTypes.shape({
// 		accountId: PropTypes.string.isRequired,
// 		balance: PropTypes.string.isRequired,
// 	}),
// 	nearConfig: PropTypes.shape({
// 		contractName: PropTypes.string.isRequired,
// 	}).isRequired,
// 	wallet: PropTypes.shape({
// 		requestSignIn: PropTypes.func.isRequired,
// 		signOut: PropTypes.func.isRequired,
// 	}).isRequired,
// 	near: PropTypes.shape({
// 		connection: PropTypes.object.isRequired,
// 	}).isRequired,
// 	children: PropTypes.element.isRequired,
// };

export default NearContextProvider;
