import React, { useContext, useEffect, useState } from 'react';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBNav, MDBNavItem, MDBIcon, MDBNavLink } from 'mdbreact';
import Link from 'next/link';
import Layout from '../../Components/UserPages/UserLayout';
import Content from '../../Components/UserPages/Content';
import UserInfo from '../../Components/UserPages/UserInfo';
import Transactions from '../../Components/UserPages/Transactions'
import MyWares from '../../Components/UserPages/MyWares'

import { NearContext } from '../../context/NearContext';
import Big from 'big.js';
const BOATLOAD_OF_GAS = Big(9)
	.times(10 ** 14)
	.toFixed();

const Settings = () => {

	const nearContext = useContext(NearContext);
	const contract = nearContext.contract[0];
	const user = nearContext.user.accountId
	
	const [tiers,setTiers] = useState({
		tiers: null,
		images: null
	})

	const [tributes,setTributes] = useState({
		tributes: null
	})

	const [currentCreator, setCurrentCreator] = useState({
		isCreator: null,
		name: 'Username',
		images: ['https://i.pinimg.com/originals/20/86/cc/2086ccca6697b771ae602b727ca36f1f.png'],
		tiers: [],
	});


	useEffect( async () => {
		
		console.log(user)
		
		const userTiers = await contract.getTiersList({ owner: user });
		const creatorInfo = await fillUserData(userTiers, user);
		setCurrentCreator({ ...creatorInfo });
	
		// const recTributes = await contract.getReceiverContributionsList({ receiver: user, BOATLOAD_OF_GAS });
		// console.log(tributes)
		return () => {
		}
	}, [nearContext])

	const fillUserData = (data, name) => {
		console.log(data);
		let images = ['https://siasky.net/dADA0SKapmrmPynEk5iQumgyVmSNc9mXjPCzqTcj8dHorw'];
		let tiers = [];

		data.forEach((tier) => {
			tiers.push(tier);

			if (tier.tier_image) {
				images.unshift(tier.tier_image);
			}
		});

		return { name, images, tiers };
	};

	if(user) {
		return (
			<Layout activePanel={'settings'}>
				<MDBContainer className="justify-content-center">
					<MDBRow>
						<MDBCol md="12" className="mx-auto">
							<UserInfo username={currentCreator.name} image={currentCreator.images} tierCount={tiers} />
						</MDBCol>
						<MDBCol md="10" className="mx-auto">
							<MyWares />
							<Transactions />
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</Layout>
		);
	} else {
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


export default Settings;
