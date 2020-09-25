import React, { Component, useState, useContext, useEffect, Fragment } from 'react';
import {
	MDBContainer,
	MDBTabPane,
	MDBTabContent,
	MDBNav,
	MDBNavItem,
	MDBNavLink,
	MDBIcon,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalBody
} from 'mdbreact';
import { useRouter } from 'next/router';
import * as nearAPI from 'near-api-js'

import { NearContext } from '../context/NearContext';
import Big from 'big.js';

const BOATLOAD_OF_GAS = Big(9)
	.times(10 ** 14)
	.toFixed();

const Contribution = (props) => {
	//get current near data and access to my echo contract
	const nearContext = useContext(NearContext);
	const contract = nearContext.contract[0];
	const wallet = nearContext.wallet
	const router = useRouter();
	const fee = props.tier.tierData.cost * 0.05;

	const signTX = (TX) => {
		nearContext.signTX(TX)
	}
	

	// console.log(props.tier.tierData[0].cost);

	console.log(nearContext.user);

	useEffect(() => {
		contract;
		return () => {};
	}, []);

	const [status, setStatus] = useState({
		submitted: false,
		submitting: false,
		info: { error: false, msg: null },
	});
	const [inputs, setInputs] = useState({
		required_info: '',
		payment: '',
		message: '',
		fee_rate: "1",
	});
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
				required_info: '',
				payment: '',
				message: '',
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

	const transfer = async () => {

	}

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		console.log('submitting things');
		console.log(fee);
		console.log(inputs.payment);

		let true_payment = Big(inputs.payment)
			.times(10 ** 24)
			.toFixed();

		let final_payment = Big(parseInt(inputs.payment) + 1)
			.times(10 ** 24)
			.toFixed();
	

		console.log(true_payment);
		console.log(final_payment);

		let params = {
			fee_rate: "1",
			receiver: props.tier.tierData[0].owner,
			required_info: inputs.required_info,
			tier_purchased: props.tier.tierData[0].name,
			tier_purchased_index: props.tier.tierData[1].toString(),
			payment: final_payment,
			message: inputs.message,
		};
		console.log(params);

		let cWalletAcct = wallet._connectedAccount;

		let sender = nearContext.user.accountId
		// let deposit = await nearAPI.transactions.functionCall('initiateContribution', params, BOATLOAD_OF_GAS, final_payment);
		let paid = await contract.initiateContribution({ sender, ...params, BOATLOAD_OF_GAS, final_payment });
		// let keys = await cWalletAcct.getAccessKeys()
		console.log(paid);


		// console.log(sender);
		// console.log(keys);
	

		// let paid = await sender.signAndSendTransaction('anechoic.testnet', transfer);

		// let truth = await nearContext.signTX(contract.initiateContribution({...params, BOATLOAD_OF_GAS }));
		// let result = await contract.initiateContribution({ ...params, BOATLOAD_OF_GAS });


		// if (result[0] === )

		// let update = await contract.getContributionsList({
		// 			contributor: nearContext.user.accountId,
		// 			})

		// console.log(update);

		// contract.initiateContribution( {params, BOATLOAD_OF_GAS}).then( () => {
		// 	contract.getContributionsList({
		// 			contributor: nearContext.user.accountId,
		// 			}).then( (tributes) => {
		// 				console.log(tributes)
		// 			})
		// 		})
	};

	const modalToggle = async () => {
		if (router.query.join) {
			router.push(`${router.pathname}`);
		}
	};

	if (props.tier.tierData) {
		return (
			<MDBContainer>
				<MDBModal isOpen={!!router.query.join} toggle={modalToggle}>
					<MDBModalBody className="sr-blue-bg px-0 py-0">
						<MDBRow>
							<MDBCol className="mx-auto">
								<MDBCard>
									<div className="header pt-3 k-green-bg">
										<MDBRow className="d-flex justify-content-start">
											<h3 className="text-white mt-3 mb-4 pb-1 mx-5 mfx-auto">{props.tier.tierData[0].name}</h3>
										</MDBRow>
									</div>
									<MDBCardBody className="mx-4 mt-2">
										<form onSubmit={handleOnSubmit}>
											<label className="mt-3">Join Tier</label>

											{props ? (
												<div>
													<p className="elegant font-italic">{'minimum: ' + props.tier.tierData[0].cost + ' NEAR'}</p>
													<input
														id="payment"
														style={{ width: '100px' }}
														className="form-control d-inline mr-1"
														group
														placeholder={props.tier.tierData[0].cost}
														type="text"
														value={inputs.payment}
														onChange={handleOnChange}
														required
													/>
													<span className="d-inline ml-1 mr-3">NEAR TOKENS</span>
												</div>
											) : null}

											<label className="mt-3">Required Information</label>
											{props.tier.tierData[0].contributor_info ? (
												props.tier.tierData[0].contributor_info.map((item) => {
													return (
														<Fragment>
															<input
																id="required_info"
																className="form-control"
																group
																placeholder={item}
																type="text"
																rows="4"
																value={inputs.required_info}
																onChange={handleOnChange}
															/>
														</Fragment>
													);
												})
											) : (
												<p>None</p>
											)}

											<label className="mt-3">Message</label>
											<textarea
												id="message"
												className="form-control"
												group
												type="textarea"
												rows="4"
												value={inputs.message}
												onChange={handleOnChange}
												placeholder={'optional'}
											/>
											<div className="text-center mb-4 mt-5">
												<MDBBtn color="danger" type="submit" className="btn-block z-depth-2">
													Submit
												</MDBBtn>
											</div>
										</form>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
						</MDBRow>
					</MDBModalBody>
				</MDBModal>
			</MDBContainer>
		);
	} else {
		return (
			<MDBContainer>
				<MDBRow>
					<MDBCol className="mx-auto text-center" style={{ marginTop: '45vh' }}>
						<div className="spinner-grow spinner-grow-big mx-auto text-center k-green" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		);
	}
};

export default Contribution;
