import React, { Component, useState, useContext, useEffect } from 'react';
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBRow, MDBCol,MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdbreact';
import Layout from '../../Components/UserPages/UserLayout';
import { useRouter } from 'next/router'
import axios from 'axios';
import { toSkynet } from '../../utils'
import { SkynetClient } from 'skynet-js';
import { NearContext } from '../../context/NearContext';
import Big from 'big.js';

const BOATLOAD_OF_GAS = Big(3)
	.times(10 ** 13)
	.toFixed();

const Create = (props) => {
	//get current near data and access to my echo contract
	const nearContext = useContext(NearContext);
	const contract = nearContext.contract[0];
	const client = new SkynetClient();

	console.log(contract);

	const [activeTab, setActiveTab] = useState({
		activeTab: '1',
	});

	const router = useRouter();


	const [status, setStatus] = useState({
		submitted: false,
		submitting: false,
		info: { error: false, msg: null },
	});

	const [inputs, setInputs] = useState({
		name: '',
		cost: '',
		description: '',
		contributor_info: '',
		image_url: '',
		url: '',
		file: '',
	});

	const [selectedFiles, setSelectedFiles] = useState(undefined);

	const [visible, setVisible] = useState({
		isVisible: false,
	});

	const checkModal = () => {
		if (router.query.contact) {
			setVisible({
				isVisible: true,
			});
		}
	};

	const handleServerResponse = (ok, msg) => {
		if (ok) {
			setStatus({
				submitted: true,
				submitting: false,
				info: { error: false, msg: msg },
			});
			setInputs({
				name: '',
				cost: '',
				description: '',
				contributor_info: '',
				image_url: '',
				url: '',
				file: '',
			});
		} else {
			setStatus({
				info: { error: true, msg: msg },
			});
		}
	};

	const handleOnChange = (e) => {
		e.persist();
		setInputs((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
		setStatus({
			submitted: false,
			submitting: false,
			info: { error: false, msg: null },
		});
	};

	const handleOnSubmit = async (e) => {
		
		console.log(inputs.file)
		console.log(selectedFiles.file)

		const skylink = await toSkynet(inputs.file)


		console.log('New Skylink: ' + skylink);
		console.log('submitting things');
		contract
			.createTier(
				{
					name: inputs.name,
					cost: inputs.cost,
					description: inputs.description,
					contributor_info: [inputs.contributor_info],
					tier_image: skylink,
				},
				BOATLOAD_OF_GAS
				// Big(donation.value || '0')
				// 	.times(10 ** 24)
				// 	.toFixed()
			)
			.then(() => {
				contract
					.getTiersList({
						owner: nearContext.user.accountId,
					})
					.then((tiers) => {
						console.log(tiers);
					});
			});
			
	};

	const selectFile = (event) => {
		setInputs({file: event.target.files});
		setSelectedFiles(event.target.files);
	};

	const handleUpload = (ev) => {
		//
		//
		//
		//THIS IS WHERE YOU SEND TO SKYNET
		//
		//
		//

		let file = uploadInput.files[0];
		// Split the filename to get the name and type
		let fileParts = uploadInput.files[0].name.split('.');
		let fileName = fileParts[0];
		let fileType = fileParts[1];
		console.log('Preparing the upload');
		axios
			.post('http://localhost:3000/api/sign-s3', {
				fileName: fileName,
				fileType: fileType,
			})
			.then((response) => {
				var returnData = response.data.data.returnData;
				var signedRequest = returnData.signedRequest;
				var url = returnData.url;
				this.setState({ url: url });
				console.log('Recieved a signed request ' + signedRequest);

				// Put the fileType in the headers for the upload
				var options = {
					headers: {
						'Content-Type': fileType,
					},
				};
				axios
					.put(signedRequest, file, options)
					.then((result) => {
						console.log('Response from s3');
						this.setState({ success: true });
					})
					.catch((error) => {
						alert('ERROR ' + JSON.stringify(error));
					});
			})
			.catch((error) => {
				alert(JSON.stringify(error));
			});
	};

	return (
		<Layout>
			<MDBContainer>
				<MDBRow>
					<MDBCol md="8" className="mx-auto">
						<MDBCard>
							<div className="header pt-3 k-green-bg">
								<MDBRow className="d-flex justify-content-start">
									<h3 className="text-white mt-3 mb-4 pb-1 mx-5 mx-auto">Create Tier</h3>
								</MDBRow>
							</div>
							<MDBCardBody className="mx-4 mt-2">
								<form onSubmit={handleOnSubmit}>
									<label className="mt-3">Tier Title</label>
									<input
										label="Tier Title"
										id="name"
										group
										className="form-control"
										type="text"
										value={inputs.name}
										onChange={handleOnChange}
										required
									/>
									{/* <label className="mt-3">Tier Image Url</label>
									<input
										label="Tier Title"
										id="image_url"
										group
										className="form-control"
										type="text"
										value={inputs.image_url}
										onChange={handleOnChange}
										required
									/> */}
									<input
										onChange={selectFile}
										// ref={(ref) => {
										// 	setInputs.file = ref;
										// }}
										id='file'
										type="file"
									/>
									<label className="mt-3">Set Price</label>
									<input
										id="cost"
										label="Price"
										className="form-control"
										group
										type="text"
										value={inputs.cost}
										onChange={handleOnChange}
										required
									/>
									<label className="mt-3">Tier description</label>
									<textarea
										id="description"
										className="form-control"
										label="Tier description"
										group
										type="textarea"
										rows="4"
										value={inputs.description}
										onChange={handleOnChange}
										required
									/>
									<label className="mt-3">Required Info</label>
									<textarea
										id="contributor_info"
										className="form-control"
										label="Required Info"
										group
										type="textarea"
										rows="4"
										value={inputs.contributor_info}
										onChange={handleOnChange}
										required
									/>

									<div className="text-center mb-4 mt-5">
										<MDBBtn color="danger" onClick={handleOnSubmit} className="btn-block z-depth-2">
											Submit
										</MDBBtn>
									</div>
								</form>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>

			{/* <MDBContainer className="classic-tabs">
				<MDBNav classicTabs color="orange" className="mt-5 mx-auto">
					<MDBNavItem
						onClick={() => setActiveTab('1')}
						className={ activeTab == '1' ? 'active' : ''}
					>
						<MDBIcon icon="user" size="2x" />
						<br />
						Profile
					</MDBNavItem>
					<MDBNavItem
						onClick={() => setActiveTab('2')}
						className={activeTab == '2' ? 'active' : ''}
					>
							<MDBIcon icon="heart" size="2x" />
							<br />
							Follow
					</MDBNavItem>
					<MDBNavItem
						onClick={() => setActiveTab('3')}
						className={activeTab == '3' ? 'active' : ''}
					>
							<MDBIcon icon="envelope" size="2x" />
							<br />
							Contact
					</MDBNavItem>
					<MDBNavItem 
					onClick={() => setActiveTab('4')}
							className={activeTab == '4' ? 'active' : ''}>
							<MDBIcon icon="star" size="2x" />
							<br />
							Be Awesome
					</MDBNavItem>
				</MDBNav>
				<MDBTabContent className="card mb-5" activeItem={activeTab}>
					<MDBTabPane tabId="1">
						<p>
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
							rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
							explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
							consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
							dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
							incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
						</p>
					</MDBTabPane>
					<MDBTabPane tabId="2">
						<p>
							Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
							ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
							molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
						</p>
					</MDBTabPane>
					<MDBTabPane tabId="3">
						<p>
							At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
							atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
							sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
							facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
							impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
							repellendus.
						</p>
					</MDBTabPane>
					<MDBTabPane tabId="4">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</p>
					</MDBTabPane>
				</MDBTabContent>
			</MDBContainer>
		 */}
		</Layout>
	);
}

export default Create
