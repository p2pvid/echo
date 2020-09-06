import React, { Component, useEffect } from 'react';
import Navigation from './Navigation';
// import Footer from './Footer';
import { MDBBtn } from 'mdbreact';
import { initContract, login, logout } from '../utils';

const Layout = ({ children }, props) => {
   
  useEffect(() => {
			window.nearInitPromise = initContract();
		});

	return (
		<div className="">
			<Navigation toggleWalletConnect={login} logout={logout} />
			

			<main className="mt-md-5 pt-3 nav-clearnace">{children}</main>

			{/* <Footer /> */}
			{/* <Modal /> */}
		</div>
	);
};

Layout.getInitialProps = async (context) => {
	// const web3React = new Web3ReactProvider(provider);
	// return {web3React}
};

export default Layout;
