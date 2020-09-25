import { context, logging, storage, base64, math, ContractPromiseBatch, u128, ContractPromise } from 'near-sdk-as';
import {
	Tier,
	TierList,
	tiers,
	tiersByOwner,
	displayTiers,
	Contribution,
	contributions,
	ContributionList,
	contributionsByTier,
	contributionsByContributor,
  contributionsByReceiver,
  Tribute
} from './model';

const RNJ_DIGITS: u32 = 16;
const ORDER_LIMIT = 8;
let destination = 'anechoic.testnet';



// function bouncer(sender: string, authorized: string): string {
//   switch (sender == authorized) {
//     case true:
//       return 'authorized'
  
//     case false:
//       return 'you shall not pass'  
//     default:
//       break;
//   }
// }


// *********************************************************

// Methods for Owner

// *********************************************************

export function getTiersList(owner: string): Tier[] {
  let tierIdList = getTiersByOwner(owner);
  let tiersList = new Array<Tier>();

  // tierIdList.forEach((tierId, i) => {
    
  //   let tierRNJ = base64.decode(tierId)
    
  //   if (tiers.contains(tierRNJ)) {
  //     let tier = tiers.getSome(tierRNJ);
  //     tiersList.push(tier);
  //   }
  // });

  for (let i = 0; i < tierIdList.length; i++) {
    let tierRNJ = base64.decode(tierIdList[i]);
    if (tiers.contains(tierRNJ)) {
      let tier = tiers.getSome(tierRNJ);
      tiersList.push(tier);
    }
  }
  return tiersList;
}

function getTiersByOwner(owner: string): Array<string> {
  let tierIdList = tiersByOwner.get(owner);
  if (!tierIdList) {
    return new Array<string>();
  }
  return tierIdList.id;
}


function setTiersByOwner(owner: string, id: string): void {
  let tierIdList = getTiersByOwner(owner);
  tierIdList.push(id);
  let newList = new TierList(tierIdList);
  tiersByOwner.set(owner, newList);
}

function deleteTierByOwner(owner: string, id: string): void {
  const tierIdList = getTiersByOwner(owner);
  // tierIdList.forEach((tierId, i) => {
  //   if (id == tierId) {
  //     tierIdList.splice(i, 1);
  //   }
  // })

  for (let i = 0; i < tierIdList.length; i++) {
    if (id == tierIdList[i]) {
      tierIdList.splice(i, 1);
    }
  }

  let newList = new TierList(tierIdList);
  tiersByOwner.set(owner, newList);
}

export function getReceiverContributionsList(receiver: string): Contribution[] {
  
  //  IMPLEMENT BOUNCER HERE
  // assert(context.sender != receiver, 'ERR_NOT_RIGHT_SENDER');
  
  let contributionIdList = getContributionsByReceiver(receiver);
	let contributionsList = new Array<Contribution>();

	for (let i = 0; i < contributionIdList.length; i++) {
		let itemRNJ = base64.decode(contributionIdList[i]);
		if (contributions.contains(itemRNJ)) {
			let contribution = contributions.getSome(itemRNJ);
			contributionsList.push(contribution);
		}
	}
	return contributionsList;
}

function getContributionsByReceiver(receiver: string): Array<string> {
	let contributionIdList = contributionsByReceiver.get(receiver);
	if (!contributionIdList) {
		return new Array<string>();
	}
	return contributionIdList.id;
}

function setContributionsByReceiver(receiver: string, id: string): void {
	let receiverIdList = getContributionsByReceiver(receiver);
	receiverIdList.push(id);
	let newList = new ContributionList(receiverIdList);
	contributionsByReceiver.set(receiver, newList);
}

// *********************************************************

// // Methods for Tier

// *********************************************************
export function getTier(id: string): Tier {
  const rnj = base64.decode(id)
  return tiers.getSome(rnj)
}

function setTier(rnj: Uint8Array, tier: Tier): void {
  tiers.set(rnj, tier);
  setGlobalTiers(tier.id);
}

export function deleteTier(id: string): void {
  let tier = getTier(id);
  deleteTierByOwner(tier.owner, id);
  deleteGlobalTier(id);
  const rnj = base64.decode(id);
  tiers.delete(rnj);
  logging.log("after delete");
}

// *********************************************************

// // Methods for Contributors

// *********************************************************
export function getContributionsList(contributor: string): Contribution[] {
  let contributionIdList = getContributionsByContributor(contributor);
  let contributionsList = new Array<Contribution>();

  for (let i = 0; i < contributionIdList.length; i++) {
		let itemRNJ = base64.decode(contributionIdList[i]);
		if (contributions.contains(itemRNJ)) {
			let contribution = contributions.getSome(itemRNJ);
			contributionsList.push(contribution);
		}
  }
  return contributionsList
}

function getContributionsByContributor(contributor: string): Array<string> {
	let contributionIdList = contributionsByContributor.get(contributor);
	if (!contributionIdList) {
		return new Array<string>();
	}
	return contributionIdList.id;
}

function setContributionsByContributor(contributor: string, id: string): void {
  let contributionIdList = getContributionsByContributor(contributor);
  contributionIdList.push(id);
  let newList = new ContributionList(contributionIdList);
  contributionsByContributor.set(contributor, newList)
}

// *********************************************************

// // Methods for Contribution

// *********************************************************
export function getContribution(id: string): Contribution{
  const rnj = base64.decode(id)
  return contributions.getSome(rnj)
}

function sendContribution(rnj: Uint8Array, contribution: Contribution): void {
  contributions.set(rnj, contribution);
}

// *********************************************************

// make contribution

// *********************************************************

export function initiateContribution(
	fee_rate: u128,
	receiver: string,
	required_info: string,
	tier_purchased: string,
	tier_purchased_index: u128,
	payment: u128,
	message: string
): string[] {
	let rnj = generateRandomRnj();
  let id = base64.encode(rnj);
  logging.log(context.sender + ' started a contribution');
	return makeContribution(
		rnj,
		id,
		fee_rate,
		receiver,
		required_info,
		tier_purchased,
		tier_purchased_index,
		payment,
		message
	);
}

 function makeContribution(
  rnj: Uint8Array,
  id: string,
  fee_rate: u128,
  receiver: string,
  required_info: string,
  tier_purchased: string,
  tier_purchased_index: u128,
  payment: u128,
  message: string
  ): string[] {

  let contribution = new Contribution(rnj, id, fee_rate, receiver, required_info, tier_purchased, tier_purchased_index, payment, message);
  
  // let tx_fee = calculateFees(payment, fee_rate)

  // sends payment to owner and fees to anechoic
  ContractPromiseBatch.create(receiver).transfer(context.attachedDeposit);
  ContractPromiseBatch.create('echo-fees.anechoic.testnet').transfer(fee_rate);

  
  sendContribution(rnj, contribution);
  setContributionsByContributor(context.sender, id)
  setContributionsByReceiver(receiver, id);
  logging.log(context.sender + ' is making a new contribution');
	logging.log(context.attachedDeposit);
	return [context.sender, id];
}

// function calculateFees(payment: u128, feeRate: u128): u128 {
//    let fee =  Number(payment / feeRate);
//    return fee;
// } 

// *********************************************************

// display global tiers (all tiers on a given contract)

// *********************************************************
export function displayGlobalTiers(): Tier[] {
  let tierIdList = getGlobalTiers();
  const tierNum = min(ORDER_LIMIT, tierIdList.length);
  const result = new Array<Tier>(tierNum);
  for (
    let i = tierIdList.length - 1;
    i >= tierIdList.length - tierNum;
    i--
  ) {
    result[i] = getTier(tierIdList[i]);
  }
  return result;
}

function getGlobalTiers(): Array<string> {
  let tierIdList = displayTiers.get("global");
  if (!tierIdList) {
    return new Array<string>();
  }
  return tierIdList.id;
}

function setGlobalTiers(id: string): void {
  let tierIdList = getGlobalTiers();
  tierIdList.push(id);
  let newList = new TierList(tierIdList);
  displayTiers.set("global", newList);
}

function deleteGlobalTier(id: string): void {
  const tierIdList = getGlobalTiers();
  for (let i = 0; i < tierIdList.length; i++) {
    if (id == tierIdList[i]) {
      tierIdList.splice(i, 1);
    }
  }
  let newList = new TierList(tierIdList);
  displayTiers.set("global", newList);
}


// *********************************************************

// Create a new Tier

// *********************************************************
export function createTier(
	name: string,
	cost: string, // probably needs to be a u64
	description: string,
  contributor_info: Array<string>,
  tier_image: string
	// contributions: Array<string>
): string[] {
	let rnj = generateRandomRnj();
	let id = base64.encode(rnj);
	return generateTier(rnj, id, name, description, cost, contributor_info, tier_image);
} 

function generateTier(
	rnj: Uint8Array,
	id: string,
	name: string,
	description: string,
	cost: string, // probably needs to be a u64
  contributor_info: Array<string>,
  tier_image: string
	// contributions: Array<string>
): string[] {
	let tier = new Tier(rnj, id, name, description, cost, contributor_info, tier_image);
	setTier(rnj, tier);
	setTiersByOwner(context.sender, id);
	logging.log('create a new tier');
	logging.log(id);
	return [name, id];
}

function generateRandomRnj(): Uint8Array {
	return math.randomBuffer(RNJ_DIGITS);
}





// *********************************************************

// Cross Contract Call

// *********************************************************
// export function contributionCall(
// 	fee_rate: u128,
// 	receiver: string,
// 	required_info: string,
// 	tier_purchased: string,
// 	tier_purchased_index: u128,
// 	payment: u128,
// 	message: string
// ): ContractPromise {
//   let destination = 'anechoic.testnet';
  
//   let details = fee_rate,
// 	receiver,
// 	required_info,
// 	tier_purchased,
// 	tier_purchased_index,
// 	payment,
// 	message}

// 	let promise = ContractPromise.create(
// 		destination,
// 		"initiateContribution",
// 		details.encode(),
// 		100000000000000,
// 		payment
//   );
  
//   return promise
  
// }

export function initContributionAPI(
		fee_rate: u128,
		receiver: string,
		required_info: string,
		tier_purchased: string,
		tier_purchased_index: u128,
		payment: u128,
		message: string
	): string[] {

    let rnj = generateRandomRnj();
    let id = base64.encode(rnj);
    
		let contribution = new Contribution(
			rnj,
			id,
			fee_rate,
			receiver,
			required_info,
			tier_purchased,
			tier_purchased_index,
			payment,
			message
    );
    

    // sends payment to owner and fees to anechoic
    ContractPromiseBatch.create('echo-fees.anechoic.testnet').transfer(fee_rate);
    ContractPromiseBatch.create(receiver).transfer(context.attachedDeposit);

		sendContribution(rnj, contribution);
		setContributionsByContributor(context.sender, id);
		setContributionsByReceiver(receiver, id);
		logging.log(context.sender + ' is making a new contribution');
		logging.log(context.attachedDeposit);
		return [context.sender, id];
	}

// export function sendContributionAPI(
// 	fee_rate: u128,
// 	receiver: string,
// 	required_info: string,
// 	tier_purchased: string,
// 	tier_purchased_index: u128,
// 	payment: u128,
// 	message: string
// ): void {

// 	let stuff = new initContributionAPI();

// 	let promise = stuff.Tribute(
// 		fee_rate,
// 		receiver,
// 		required_info,
// 		tier_purchased,
// 		tier_purchased_index,
// 		payment,
// 		message
// 	);

// 	promise.returnAsResult();
// }



// export function initTribute(
// 	fee_rate: u128,
// 	receiver: string,
// 	required_info: string,
// 	tier_purchased: string,
// 	tier_purchased_index: u128,
// 	payment: u128,
// 	message: string
// ): void {

//   let destination = "anechoic.testnet";

//   let params = [fee_rate, receiver, required_info, tier_purchased, tier_purchased_index, payment, message]

// 	let promise = ContractPromise.create(
// 		destination, 
// 		"initContributionAPI", 
// 		params.encode(),
// 		100000000000000, 
// 		payment
// 	);
  
//   promise.returnAsResult(); 
// }