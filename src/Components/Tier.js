import React, { Fragment } from 'react'
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn } from 'mdbreact'
import Link from 'next/router'
import Modal from '../Components/Contribution';
import { useRouter } from 'next/router';

function creatorTier (props) {
  console.log(props)
  return (
			<MDBCol md="4" size='8'>
				<MDBCard testimonial className="my-5 border z-depth-1">
					{/* <MDBCardUp gradient="aqua" />
                    <MDBAvatar className="mx-auto white">
                      <img src={currentCreator.image[0]} alt="" />
                    </MDBAvatar> */}
					<MDBCardBody>
						<h5 className="font-weight-bold card-title black-text">{props.info.name}</h5>
						<hr />
						<h2>{props.info.cost}</h2>
						<p>NEAR / Month</p>
						<p className="black-text">{props.info.description}</p>
						{/* <Link href={props.modalpath} as={props.path}> */}
							<MDBBtn onClick={() => props.joinPress([props.info, props.index]) }>Join</MDBBtn>
						{/* </Link> */}
					</MDBCardBody>
				</MDBCard>
			</MDBCol>
	);
}

export default creatorTier;