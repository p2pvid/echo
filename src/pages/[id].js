import React, { Component } from 'react';
import {
	MDBCard,
	MDBCardBody,
	MDBCardUp,
	MDBAvatar,
	MDBRow,
	MDBCol,
	MDBIcon,
	MDBContainer,
	MDBCollapseHeader,
	MDBCollapse,
} from 'mdbreact';
import Layout from '../Components/Layout';
import { render } from 'react-dom';

class CardExample extends Component {
	state = {
		collapseID: 'collapse1',
	};

	toggleCollapse = (collapseID) => () =>
		this.setState((prevState) => ({
			collapseID: prevState.collapseID !== collapseID ? collapseID : '',
		}));
	render() {
		return (
			<Layout>
				<MDBRow className="mt-md-5">
					<MDBCol  md="4" className="mx-auto">
						<MDBCard testimonial className="my-5">
							<MDBCardUp className="indigo lighten-1" />
							<MDBAvatar className="mx-auto white">
								<img src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg" alt="" />
							</MDBAvatar>
							<MDBCardBody>
								<h4 className="card-title">Anna Doe</h4>
								<hr />
								<p>
									<MDBIcon icon="quote-left" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci{' '}
									<MDBIcon icon="quote-right" />
								</p>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					{/* <MDBCol md="4">
        <MDBCard testimonial>
          <MDBCardUp gradient="aqua" />
          <MDBAvatar className="mx-auto white">
            <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2831%29.jpg" alt="" />
          </MDBAvatar>
          <MDBCardBody>
            <h4 className="card-title">Martha Smith</h4>
            <hr />
            <p>
              <MDBIcon icon="quote-left" /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci{' '}
              <MDBIcon icon="quote-right" />
            </p>
          </MDBCardBody>
        </MDBCard>
      </MDBCol> */}
				</MDBRow>

				<MDBContainer className="accordion md-accordion accordion-5">
					<MDBCard className="mb-4">
						<MDBCollapseHeader
							onClick={this.toggleCollapse('collapse1')}
							className="p-0 z-depth-1"
							tag="h4"
							tagClassName="text-uppercase white-text mb-0 d-flex justify-content-start align-items-center"
						>
							<div
								className="d-flex justify-content-center align-items-center mr-4"
								style={{ backgroundColor: '#fff', minWidth: '100px' }}
							>
								<MDBIcon icon="cloud" size="2x" className="m-3 black-text" />
							</div>
							Tier #1
						</MDBCollapseHeader>

						<MDBCollapse id="collapse1" isOpen={this.state.collapseID}>
							<MDBCardBody className="rgba-black-light white-text z-depth-1">
								<p className="p-md-4 mb-0">
									Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
									moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
									Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
									shoreditch et.
								</p>
							</MDBCardBody>
						</MDBCollapse>
					</MDBCard>

					<MDBCard className="mb-4">
						<MDBCollapseHeader
							onClick={this.toggleCollapse('collapse2')}
							className="p-0 z-depth-1"
							tag="h4"
							tagClassName="text-uppercase white-text mb-0 d-flex justify-content-start align-items-center"
						>
							<div
								className="d-flex justify-content-center align-items-center mr-4"
								style={{ backgroundColor: '#fff', minWidth: '100px' }}
							>
								<MDBIcon icon="comment-alt" size="2x" className="m-3 black-text" />
							</div>
							Tier #2
						</MDBCollapseHeader>

						<MDBCollapse id="collapse2" isOpen={this.state.collapseID}>
							<MDBCardBody className="rgba-black-light white-text z-depth-1">
								<p className="p-md-4 mb-0">
									Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
									moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
									Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
									shoreditch et.
								</p>
							</MDBCardBody>
						</MDBCollapse>
					</MDBCard>

					<MDBCard className="mb-4">
						<MDBCollapseHeader
							onClick={this.toggleCollapse('collapse3')}
							className="p-0 z-depth-1"
							tag="h4"
							tagClassName="text-uppercase white-text mb-0 d-flex justify-content-start align-items-center"
						>
							<div
								className="d-flex justify-content-center align-items-center mr-4"
								style={{ backgroundColor: '#fff', minWidth: '100px' }}
							>
								<MDBIcon icon="cogs" size="2x" className="m-3 black-text" />
							</div>
							Tier #3
						</MDBCollapseHeader>

						<MDBCollapse id="collapse3" isOpen={this.state.collapseID}>
							<MDBCardBody className="rgba-black-light white-text z-depth-1">
								<p className="p-md-4 mb-0">
									Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
									moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
									Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
									shoreditch et.
								</p>
							</MDBCardBody>
						</MDBCollapse>
					</MDBCard>
				</MDBContainer>
			</Layout>
		);
	}
}

export default CardExample;
