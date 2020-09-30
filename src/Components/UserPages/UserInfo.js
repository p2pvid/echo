import React, { useContext, useEffect, useState } from 'react';
import {
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBInput,
	MDBContainer,
	MDBAvatar,
	MDBIcon,
	MDBBtn,
	MDBCardUp,
	MDBCardImage,
	MDBCardTitle,
	MDBCardText,
} from 'mdbreact';
import { NearContext } from '../../context/NearContext';
import Link from 'next/link';

const UserInfo = (props) => {

	const nearContext = useContext(NearContext);
	console.log(props);
	console.log(nearContext);

	return (
		<div id="profile-v1" className="mb-5">
			<MDBContainer fluid className="mb-5">
				<section className="section team-section mb-5">
					<MDBRow center className="text-center">
						<MDBCol md="4" className="">
							<MDBCard testimonial className="my-5">
								<MDBCardUp className="indigo lighten-1" />
								<MDBAvatar className="mx-auto white">
									<img src={props.image[0]} alt="" />
								</MDBAvatar>
								<MDBCardBody>
									<h4 className="card-title">
										{props.username} <br />
									</h4>
									<Link href={'/' + props.username.split('.')[0]} target="_blank">
										<a target="_blank">My Creator Page</a>
									</Link>
									{/* <hr /> */}
									{/* <p>
										<MDBIcon icon="quote-left" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos,
										adipisci <MDBIcon icon="quote-right" />
									</p> */}
								</MDBCardBody>
							</MDBCard>
						</MDBCol>

						<MDBCol md="4" className="">
							<MDBCard className="my-5">
								<MDBCardBody>
									{/* <a href="#!" className="activator waves-effect waves-light mr-4">
											<MDBIcon icon="share-alt" className="black-text" />
										</a> */}
									<MDBCardTitle className="text-left">Account</MDBCardTitle>
									<hr />

									{/* <MDBCardText className="text-left">
										<h5 className="mb-3">Recovery Methods</h5>
										<p>
											<span className="font-weight-bold">Email:</span> test@test.com
										</p>
										<p>
											<span className="font-weight-bold">Seed:</span> Enabled
										</p>
									</MDBCardText>
									<hr /> */}

									<MDBCardText className="text-left">
										<h5 className="mb-3">Connected Wallet</h5>
										<p>
											<span className="font-weight-bold">Near Address</span> {props.username}
										</p>

										<p>
											<span className="font-weight-bold">Contributions Made</span> coming soon
										</p>

										<p>
											{/* <span className="font-weight-bold">Seed:</span> Enabled */}
											<span className="font-weight-bold">Available Tiers:</span> {Object.keys(props.tierCount).length}
										</p>

										<p>
											<span className="font-weight-bold">Contributions Recieved</span> coming soon
										</p>
									</MDBCardText>
								</MDBCardBody>
							</MDBCard>
						</MDBCol>
					</MDBRow>
				</section>
			</MDBContainer>
		</div>
	);
};

export default UserInfo;
