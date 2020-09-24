import React, { Fragment, useState, useContext, useEffect } from 'react';
import {
	MDBCard,
	MDBCardBody,
	MDBCardUp,
	MDBAvatar,
	MDBRow,
	MDBCol,
	MDBIcon,
	MDBContainer,
	MDBCollapseHeader,
	MDBCollapse,
} from 'mdbreact';
import Layout from '../Components/Layout';
import Tier from '../Components/Tier'
import { useRouter } from 'next/router';
import { NearContext } from '../context/NearContext';
import Big from 'big.js';
import Modal from '../Components/Contribution'
import Link from 'next/router';
import Contribution from '../Components/Contribution';


const CreatorPage = (props) => {

	const router = useRouter();
	const nearContext = useContext(NearContext);
	const contract = nearContext.contract[0];
	const modalPath = `${router.pathname}?join=join`;
	const pathName = router.pathname;
	
	// const [collapseID, setCollapseID] = useState('')
	// const [isCollapsed1, setIsCollapsed1] = useState(false)
	// const [isCollapsed2, setIsCollapsed2] = useState(false)
	// const [isCollapsed3, setIsCollapsed3] = useState(false)
	const [currentCreator, setCurrentCreator] = useState({
		isCreator: null,
		name: '',
		images: [
			'https://i.pinimg.com/originals/20/86/cc/2086ccca6697b771ae602b727ca36f1f.png',
		],
		tiers: [],
	});
	const [currentTier, setCurrentTier] = useState({
		tierData: ''
	})
	const [isLoading, setIsLoading] = useState(true)


	useEffect(async () => {

		const pid = router.query;
		const creator = pid.id + '.testnet';
		const data = await contract.getTiersList({owner: creator});
		const creatorInfo = await fillUserData(data, pid.id)
		setCurrentCreator({...creatorInfo});
	}, []);

	const fillUserData = (data, name) => {
		console.log(data)
		let images = ['https://siasky.net/dADA0SKapmrmPynEk5iQumgyVmSNc9mXjPCzqTcj8dHorw'];
		let tiers = []
		
		data.forEach(tier => {
			
			tiers.push(tier);

			if (tier.tier_image) {
				images.unshift(tier.tier_image);
			}	
			
		});
		
		return {name, images, tiers}
		
	}

	const handleJoinPress = (tier) => {
		console.log(tier);
		router.push(`${router.query.id}?join=join`);
		setCurrentTier({tierData: tier})

		if (router.query.join) {
			router.push(`${router.pathname}`);
			console.log(tier)
		}
	}

	// toggleCollapse = (collapseID) => () =>
	// 	this.setState((prevState) => ({
	// 		collapseID: prevState.collapseID !== collapseID ? collapseID : '',
	// 	}));

	if (!isLoading){
    // console.log(nearData.contract);
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
		);}

	else {
		return (
			<Layout>
				<MDBRow className="mt-5">
					<MDBCol size="8" sm="6" md="4" lg="4" className="mx-auto">
						<MDBCard testimonial className="my-5 z-depth-3">
							<MDBCardUp gradient="aqua" />
							<MDBAvatar className="mx-auto white">
								<img src={currentCreator.images[0]} alt="" />
							</MDBAvatar>
							<MDBCardBody>
								<h4 className="card-title">{currentCreator.name}</h4>
								<hr />
								<p>
									{/* <MDBIcon icon="quote-left" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos,
									adipisci
									<MDBIcon icon="quote-right" /> */}
								</p>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>

				
				<MDBContainer className="accordion md-accordion accordion-5">
					<MDBRow className="justify-content-center">
						{/***** Map creator tiers to page *****/}

						{currentCreator.tiers.map((data, index) => {
							
							return (
								<Tier info={data} joinPress={handleJoinPress} index={index}/>
							);
						})}
					</MDBRow>
				</MDBContainer>
				<Modal tier={currentTier}/>
			</Layout>
		);
	}
}	

// static async CreatorPage.GetInitialProps({req}) {

// }

export default CreatorPage;
