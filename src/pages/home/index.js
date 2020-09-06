import React, { Component } from 'react';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBNav, MDBNavItem, MDBIcon, MDBNavLink } from 'mdbreact';
import Link from 'next/link';
import Layout from '../../Components/UserPages/UserLayout';
import Content from '../../Components/UserPages/Content'

class Home extends Component {
  

  render () { 
    return (
			<Layout>
				<MDBContainer className="justify-content-center">
					<MDBRow>
						<Content />
						<Content />
						<Content />
						<Content />
						<Content />
						<Content />
					</MDBRow>
				</MDBContainer>
			</Layout>
		);
  }
}

export default Home