import React from 'react';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../public/main.css';

import NearContextProvider from '../context/NearContext';
import ContractContextProvider from '../hooks/contract';

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;