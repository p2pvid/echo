import React, { Component, useState, useContext, Fragment } from 'react';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavLink,
	MDBCollapse,
	MDBContainer,
	MDBHamburgerToggler,
	MDBNavbarToggler,
	MDBIcon,
	MDBBtn,
	MDBRow,
	MDBCol,
} from 'mdbreact';
import Link from 'next/link';
import { withRouter } from 'next/router';

import { NearContext } from '../context/NearContext';

const NavbarPage = (props) => {
	
	const [collapseID, setCollapseID] = useState('');
  const [isCollapsed1, setIsCollapsed1] = useState(false);

	const nearContext = useContext(NearContext);
	// console.log(nearContext.user)

	const signIn = () => {
		nearContext.signIn();
	};

	const signOut = () => {
		nearContext.signOut();
	};


	return (
		<MDBNavbar
			style={{
				marginTop: '0px',
				zIndex: `100`,
				position: 'absolute',
				width: '100vw',
				backdropFilter: 'blur(8px)',
			}}
			light
			className="sr-orange2 z-depth-0 border-bottom border-dark"
			expand="md"
		>
			<MDBContainer className="" fluid>
				<MDBNavbarBrand className="white-text py-0">
					<Link href="/">
						<a>
							<h2 className="">E</h2>
						</a>
					</Link>
				</MDBNavbarBrand>
				<MDBNavbarToggler className="mt-3">
					<MDBHamburgerToggler
						color="#016367"
						id="hamburger1"
						onClick={() => setIsCollapsed1((isCollapsed1) => !isCollapsed1)}
					/>
				</MDBNavbarToggler>
				<MDBCollapse className="nav-blur justify-content-end" isOpen={isCollapsed1} navbar>
					<MDBNavbarNav className="dropdown-menu-right" right>
						<MDBNavItem className="my-auto" right>
							<MDBContainer>
								<MDBRow className="">
									{nearContext.user === undefined ? (
										<MDBCol size="5">
											{/* <MDBIcon size="2x" icon="home" /> */}
											<MDBBtn outline onClick={signIn}>
												Login
											</MDBBtn>
										</MDBCol>
									) : null}

									{nearContext.user ? (
										<Fragment>
											<MDBCol size="5">
												<a href="/home" target="blank">
													{/* <MDBIcon size="2x" icon="wallet" /> */}
													<MDBBtn outline>Home</MDBBtn>
												</a>
											</MDBCol>

											<MDBCol size="5">
												<a href="/" target="blank">
													{/* <MDBIcon size="2x" icon="wallet" /> */}
													<MDBBtn onClick={signOut} outline>
														Logout
													</MDBBtn>
												</a>
											</MDBCol>
										</Fragment>
									) : null}
									{/* <MDBCol>
										<a href="/" target="blank">
											<MDBIcon size="2x" icon="plus" />
										</a>
									</MDBCol> */}
								</MDBRow>
							</MDBContainer>
						</MDBNavItem>
					</MDBNavbarNav>
				</MDBCollapse>
			</MDBContainer>
		</MDBNavbar>
	);	
}

export default withRouter(NavbarPage);
