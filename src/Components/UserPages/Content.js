import React from 'react';
import { MDBRow, MDBCard, MDBCardBody, MDBIcon, MDBCol, MDBInput } from 'mdbreact';

const SocialPage = () => {
	return (
			<MDBCol md="6" lg="4">
				<MDBCard news className="my-5">
					<MDBCardBody>
						<div className="content">
							<div className="right-side-meta">2 h</div>
							<img
								src="https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg"
								alt=""
								className="rounded-circle avatar-img z-depth-1-half"
							/>
							Tony
						</div>
					</MDBCardBody>
					<div className="embed-responsive embed-responsive-1by1">
						<iframe
							className="embed-responsive-item"
							title="This is a unique title"
							src="https://www.youtube.com/embed/37pwbUp8t1I"
							alt=""
							allowFullScreen
						/>
					</div>
					<MDBCardBody>
						<div className="social-meta">
							<p className="blue-text">#awesome #bboy #battle #breaking #cool</p>
							<span>
								<MDBIcon far icon="heart" />
								265 likes
							</span>
							<p>
								<MDBIcon icon="comment" />
								89 comments
							</p>
						</div>
						<hr />
						<MDBInput far icon="heart" hint="Add Comment..." />
					</MDBCardBody>
				</MDBCard>
			</MDBCol>
	);
};

export default SocialPage;
