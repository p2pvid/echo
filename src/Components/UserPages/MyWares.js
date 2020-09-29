import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBCard, MDBCardHeader, MDBCardBody, MDBTableEditable } from 'mdbreact';


const TableEditablePage = (props) => {
	// console.log(props.data)
	useEffect(  () => {
	
		(async function tiersTime() {
			if (props.data.length > 1) {
			console.log(props.data)
			let tableData = await makeTiers(props);
			console.log(tableData)
			setRows({data: tableData.tierArray, header: tableData.head})
			}
		} )();
		
		
		return () => {
		}
	}, [props])

	const [table, setTable] = useState({
		header: ['Ware Name','Price (USD)', '#Sold', 'Created', 'Type'],
		data: [
				// ['Buster Sword', '$30', 'Cloud', 'Aug 30, 2020', 'TX'],
				// ['Scouter', '$9001','Vegeta', 'Aug 30, 2020', 'TX'],
				['Tier 1', '$26', 'YOU', 'Aug 30, 2020', 'Sub - 30'],
				["jharris3.testnet", "vL1fAqaEHhribPAgjqFJqQ==", "jharris3", "Get email updates!", "10", "Email Address", "https://jackson-harris-iii.github.io/materialportfolio/assets/images/me.jpg"],
		]
	})

	const [rows, setRows] = useState({
		data: [['Tier 1', '$26', 'YOU', 'Aug 30, 2020', 'Sub - 30']]
	});

	const makeTiers = async (tiers) => {

		if (tiers.data) {
			const objKeys = tiers.data[0];
			console.log(objKeys);

			if (objKeys) {
				
				const head = [
					'owner',
					'id',
					'name',
					'description',
					'cost',
					"req'd info",
					'tier image',
				];
				Object.keys(objKeys);

				let tierArray = [];
				
				tiers.data.forEach((tier) => {
					let tierData = [tier.owner, tier.id, tier.name, tier.description, tier.cost, tier.contributor_info.toString(), tier.tier_image]
					console.log(tierData)
					tierArray.push(tierData);
				});
				
				console.log(tierArray);
				// setTable({data: tierArray, header: head})
				// setRows({data: tierArray})
				return { head, tierArray };
			}
			
			
		}
		
	}

	return (
		<MDBCard>
			<MDBCardHeader tag="h3" className="text-center font-weight-bold text-uppercase py-4">
				My Tiers
			</MDBCardHeader>
			<MDBCardBody>
				{/* <MDBTableEditable data={rows.data} columns={rows.header} striped bordered responsive/> */}
				<MDBTable responsive>
					<MDBTableHead>
						<tr>
							{rows.header
								? rows.header.map((item, index) => {
										return <th key={index}>{item.toUpperCase()}</th>;
								  })
								: null}
						</tr>
					</MDBTableHead>
					<MDBTableBody>
							{rows.data
								? rows.data.map((element) => {
									return (
										<tr>
									{element.map((item, index) => {
										console.log(item);
										return <td key={index}>{item}</td>;
									})}
									</tr>
									)
									
									; 
										
								})
								: null}
					</MDBTableBody>
				</MDBTable>
			</MDBCardBody>
		</MDBCard>
	);
};

export default TableEditablePage;
