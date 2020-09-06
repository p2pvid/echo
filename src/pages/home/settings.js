import React, { Component } from 'react';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBNav, MDBNavItem, MDBIcon, MDBNavLink } from 'mdbreact';
import Link from 'next/link';
import Layout from '../../Components/UserPages/UserLayout';
import Content from '../../Components/UserPages/Content';
import UserInfo from '../../Components/UserPages/AccountInfo';
import Transactions from '../../Components/UserPages/Transactions'
import MyWares from '../../Components/UserPages/MyWares'

class Settings extends Component {
	render() {
		return (
			<Layout activePanel={'settings'}>
				<MDBContainer className="justify-content-center">
					<MDBRow>
						<MDBCol md="12" className="mx-auto">
							<UserInfo />
						</MDBCol>
						<MDBCol md="10" className="mx-auto">
							<MyWares />
							<Transactions />
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</Layout>
		);
	}
}

export default Settings;
