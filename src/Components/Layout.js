import React, { Component, useEffect, useState } from 'react';
import Navigation from './Navigation';
// import Footer from './Footer';
import { MDBBtn } from 'mdbreact';
import { initContract, login, logout } from '../utils';
import * as nearlib from 'near-api-js';
import NearContextProvider from '../context/NearContext';
import ContractContextProvider from '../hooks/contract';
  

const Layout = ({ children }) => {
// {console.log(props)}
{
	// console.log(props.thing);
}
	return (
		<div className="">
			{/* <NearContextProvider
				currentUser={props.currentUser}
				nearConfig={props.nearConfig}
				wallet={props.walletConnection}
				near={props.near}
			> */}
				{/* <ContractContextProvider Contract={nearData.contract}>  */}
				<Navigation  />

				<main className="mt-md-5 pt-3 nav-clearnace">{children}</main>

				{/* <Footer /> */}
				{/* <Modal /> */}
				{/* </ContractContextProvider> */}
			{/* </NearContextProvider> */}
		</div>
	);
};

Layout.getInitialProps = async () => {
  {
		console.log('hello');
	}
  const nearData = await initContract();
  const thing = ['cosas']
  
  
  return { nearData, thing }
};

export default Layout;
