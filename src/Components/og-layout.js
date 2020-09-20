import React, { Component, useEffect, useState } from 'react';
import Navigation from './Navigation';
// import Footer from './Footer';
import { MDBBtn } from 'mdbreact';
import { initContract, login, logout } from '../utils';
import NearContextProvider from '../context/NearContext';
import ContractContextProvider from '../hooks/contract';

const Layout = ({ children }, props) => {
	//  const [nearData, setNearData] = useState({
	//    currentUser: '',
	//    nearConfig: '',
	//    walletConnection: '',
	//    near: '',
	//    contract: ''
	//  })
	// useEffect(() => {

	//   async function fetchNearData() {
	//     let data = window.nearInitPromise = initContract();
	// 		console.log(data);
	// 		if (nearData != data) {
	//       console.log(data);
	// 			setNearData({ ...data });
	// 		}
	//   }
	//   fetchNearData()
	// 	}, []);

	return (
		<div className="">
			{/* <NearContextProvider
				currentUser={nearData.currentUser}
				nearConfig={nearData.nearConfig}
				wallet={nearData.walletConnection}
				near={nearData.near}
			>
      	<ContractContextProvider Contract={nearData.contract}> */}
			<Navigation toggleWalletConnect={login} logout={logout} />

			<main className="mt-md-5 pt-3 nav-clearnace">{children}</main>

			{/* <Footer /> */}
			{/* <Modal /> */}
			{/* </ContractContextProvider>
			</NearContextProvider> */}
		</div>
	);
};

Layout.getInitialProps = async (context) => {
	// const web3React = new Web3ReactProvider(provider);
	// return {web3React}
};

export default Layout;
