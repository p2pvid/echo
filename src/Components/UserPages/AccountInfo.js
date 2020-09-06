import React from 'react';
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

const PV1 = () => {
	return (
		<div id="profile-v1" className="mb-5">
			<MDBContainer fluid className="mb-5">
				<section className="section team-section mb-5">
					<MDBRow center className="text-center">
						<MDBCol md="4" className="">
							<MDBCard testimonial className="my-5">
								<MDBCardUp className="indigo lighten-1" />
								<MDBAvatar className="mx-auto white">
									<img src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg" alt="" />
								</MDBAvatar>
								<MDBCardBody>
									<h4 className="card-title">Anna Doe</h4>
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

									<MDBCardText className="text-left">
										<h5 className="mb-3">Recovery Methods</h5>
										<p>
											<span className="font-weight-bold">Email:</span> test@test.com
										</p>
										<p>
											<span className="font-weight-bold">Seed:</span> Enabled
										</p>
									</MDBCardText>
									<hr />

									<MDBCardText className="text-left">
										<h5 className="mb-3">Connected Accounts</h5>
										<p>
											<span className="font-weight-bold">Address</span> JAS89UP345HUISYBFPASDFAOSDFK
										</p>
										<p>
											<span className="font-weight-bold">Seed:</span> Enabled
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

export default PV1;
