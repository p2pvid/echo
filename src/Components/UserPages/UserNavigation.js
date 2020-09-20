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
	MDBNav
} from 'mdbreact';
import Link from 'next/link';
import { withRouter } from 'next/router';

import { NearContext } from '../../context/NearContext';

const NavbarPage = (props) => {
	const [collapseID, setCollapseID] = useState('');
	const [isCollapsed1, setIsCollapsed1] = useState(false);

	const nearContext = useContext(NearContext);
	console.log(nearContext.contract);

	const signIn = () => {
		nearContext.signIn();
	};

	return (
		<Fragment>
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
									<MDBRow className="mx-auto">
												{nearContext.user === undefined ? (
													<MDBCol size="5">
														{/* <MDBIcon size="2x" icon="home" /> */}
														<MDBBtn outline onClick={signIn}>
															Login
														</MDBBtn>
													</MDBCol>
												) : null}
												{nearContext.user ? (
													<Fragment style={{ marginRight: 'auto!important', marginLeft: 'auto!important' }}>
														<MDBCol size="5">
															<a href="/home" target="blank">
																{/* <MDBIcon size="2x" icon="wallet" /> */}
																<MDBBtn outline>Home</MDBBtn>
															</a>
														</MDBCol>

														<MDBCol size="5">
															<a href="/" target="blank">
																{/* <MDBIcon size="2x" icon="wallet" /> */}
																<MDBBtn outline>Logout</MDBBtn>
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

			<MDBContainer className="" style={{ marginTop: '15vh' }}>
				<MDBNav className="nav-pills nav-fill">
					<MDBContainer>
						<MDBRow>
							<MDBCol className="border mx-0 px-0">
								<MDBNavItem>
									{/* <Link href="/">
											<a> */}
									<MDBIcon size="2x" icon="search" className="my-3" style={{ opacity: '.3' }} />
									{/* </a>
										</Link> */}
								</MDBNavItem>
							</MDBCol>

							<MDBCol className="border mx-0 px-0">
								<MDBNavItem active>
									<Link href="/home">
										<a>
											<MDBIcon size="2x" icon="home" className="my-3" />
										</a>
									</Link>
								</MDBNavItem>
							</MDBCol>

							<MDBCol className="border mx-0 px-0">
								<MDBNavItem active>
									<Link href="/home/settings">
										<a>
											<MDBIcon size="2x" far icon="user-circle" className="my-3" />
										</a>
									</Link>
								</MDBNavItem>
							</MDBCol>

							<MDBCol className="border mx-0 px-0">
								<MDBNavItem active>
									<Link href="/home/create">
										<a>
											<MDBIcon size="2x" icon="plus" className="my-3" />
										</a>
									</Link>
								</MDBNavItem>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</MDBNav>
			</MDBContainer>
		</Fragment>
	);
};

export default withRouter(NavbarPage);
