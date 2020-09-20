import React, { Component, useEffect } from 'react';
import { initContract, login, logout } from '../utils';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Link from 'next/link';
import Layout from '../Components/Layout.js';

const HomePage = () => {
  
  useEffect(() => {
    // window.nearInitPromise = initContract();
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