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
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';


export default function MyApp({ Component, pageProps }) {
	const [nearData, setNearData] = useState({
		contract: '',
		currentUser: '',
		near: '',
		nearConfig: '',
		walletConnection: '',
		arrived: false,
	});

	useEffect(
		async (e) => {
      
      if (!nearData.arrived)
      {
      let data = await InitContract()

      setNearData({ ...data, arrived: true });
      }

      return () => {
        setNearData({ arrived: true, });
      }
      
		},[]
  );
  
  if (!!nearData.arrived){
    // console.log(nearData.contract);
		return (
			<NearContextProvider
				currentUser={nearData.currentUser}
				nearConfig={nearData.nearConfig}
				wallet={nearData.walletConnection}
				near={nearData.near}
				nearContract={nearData.contract}
			>
				<ContractContextProvider Contract={nearData.contract}>
					<Component {...pageProps} />
				</ContractContextProvider>
			</NearContextProvider>
		);}
    else {
      return (
				<MDBContainer>
					<MDBRow>
						<MDBCol className="mx-auto text-center" style={{ marginTop: '45vh' }}>
							<div className="spinner-grow spinner-grow-big mx-auto text-center k-green" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			);
    }
}