import React from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBTableEditable } from 'mdbreact';

const columns = ['Ware Name','Price (USD)', '#Sold', 'Created', 'Type'];

const data = [
	// ['Buster Sword', '$30', 'Cloud', 'Aug 30, 2020', 'TX'],
	// ['Scouter', '$9001','Vegeta', 'Aug 30, 2020', 'TX'],
	['Tier 1', '$26', 'YOU', 'Aug 30, 2020', 'Sub - 30'],
	['Tier 1.5', '$31', 'YOU', 'Aug 30, 2020', 'Sub - 7'],
];

const TableEditablePage = (props) => {
	return (
		<MDBCard>
			<MDBCardHeader tag="h3" className="text-center font-weight-bold text-uppercase py-4">
				Tier
			</MDBCardHeader>
			<MDBCardBody>
				<MDBTableEditable data={data} columns={columns} striped bordered responsive/>
			</MDBCardBody>
		</MDBCard>
	);
};

export default TableEditablePage;
