import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../public/main.css';
import App from 'next/app';
import getConfig from '../config';
import * as nearlib from 'near-api-js';

import dynamic from 'next/dynamic'

import { login, logout, InitContract, initContract } from '../utils'
import NearContextProvider from '../context/NearContext';
import ContractContextProvider from '../hooks/contract';

const nearConfig = getConfig(process.env.NODE_ENV || 'development');
// const Utils = dynamic( () => import("../utils"), {ssr: false})

export default function MyApp({ Component, pageProps }) {
	const [nearData, setNearData] = useState({
		contract: '',
		currentUser: '',
		near: '',
		nearConfig: '',
		walletConnection: '',
		utils: false,
	});

	useEffect(
		async (e) => {
			let  data = await InitContract()
      console.log(data);
      setNearData({...data});
      

      return (data) => {
        console.log(data)
      }
      
		},[]
	);
		return (
			<NearContextProvider
				currentUser={nearData.currentUser}
				nearConfig={nearData.nearConfig}
				wallet={nearData.walletConnection}
				near={nearData.near}
			>
				<Component {...pageProps} />
			</NearContextProvider>
		);
}

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   const nearData = await InitContract();

//   return { ...appProps, nearData }
// }
