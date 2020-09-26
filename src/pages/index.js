import React, { Component, useEffect, useContext, useState } from 'react';
import { initContract, login, logout } from '../utils';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Link from 'next/link';
import Layout from '../Components/Layout.js';

import { NearContext } from '../context/NearContext';
import Big from 'big.js';

const HomePage = () => {
	
	//get current near data and access to my echo contract
	const nearContext = useContext(NearContext);
	const contract = nearContext.contract[0];
	console.log(contract);

	const [creators, setCreators] = useState()
	
	useEffect(async () => {
		const data = await contract.displayGlobalTiers();
		console.log(data)
		// contract.displayGlobalTiers().then ( (tiers) => {
		// 	console.log(tiers)
		// });

		// contract
		// 	.getTiersList({
		// 		owner: nearContext.user.accountId,
		// 	})
		// 	.then((tiers) => {
		// 		console.log(tiers);
		// 	});
  })
  
  return (
		<div>
			<Layout>
				<MDBContainer className="mt-5 text-center">
					<MDBRow className="mx-lg-5">
						<MDBCol>
							<MDBJumbotron className="z-depth-0">
								<h2 className="h1 display-3 font-weight-bold">Welcome to Echo</h2>
								<p className="lead">The easiest way to Offer Wares, Contribute, Subscribe, and More on the Open Web.</p>

								<p>Using web3 technologies!</p>
								<MDBCol md="6" className="mt-5 mx-auto">
									<div className="d-inline">
										<input
											className="form-control"
											type="text"
											placeholder="Find What You're Looking For..."
											aria-label="Search"
										/>
									</div>
									<div className="d-inline">
										<Link href="/hello">
											<a>
												<MDBBtn rounded outline className="mt-3">
													Search
												</MDBBtn>
											</a>
										</Link>
									</div>
								</MDBCol>
								<p className="lead">
									{/* <MDBRow className="">
													<MDBCol>
														<a href="/" target="blank">
															<MDBIcon size="2x" icon="home" />
															<MDBBtn outline rounded>
																Login
															</MDBBtn>
														</a>
													</MDBCol>
													<MDBCol>
														<a href="/" target="blank">
															<MDBIcon size="2x" icon="wallet" />
															<MDBBtn outline rounded>
																SignUp
															</MDBBtn>
														</a>
													</MDBCol>
												</MDBRow> */}
								</p>
							</MDBJumbotron>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</Layout>
		</div>
	);
}

export default HomePage;