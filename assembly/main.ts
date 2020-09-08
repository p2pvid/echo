import { Context, logging, storage, base64, math } from 'near-sdk-as';
import {
  Tier,
  TiersList,
  tiers,
  tiersByCreator,
  displayTiers,
} from './model';

const RNJ_DIGITS: u32 = 16;

// *********************************************************

// //Methods for creator
export function getTiersList(creator: string): Tier[] {
  let tierIdList = getTiersList(creator);
  let tiersList = new Array<Tier>();

	return tiersList;
}

// Methods for Tier

export function getTier(id: string): Tier {
  const rnj = base64.decode(id)
  return tiers.getSome(rnj)
}




// display global tiers
export function displayGlobalTiers(): Tier[] {

}

function getGlobalTiers(): Array<string> {

}

export deleteGlobalTier(id: string): void {

}
  

export function createTier(
  name: string,
	cost: u64,
	reqInfo: Array<string>,
	// contributions: Array<string> 
): string[] {
  let rnj = generateRandomRnj();
  let id = base64.encode(rnj);
  return generateTier(
    rnj,
    id,
    name,
    cost,
    reqInfo
  );
} 

function generateTier(
  rnj: Uint8Array,
	id: string,
	name: string,
	cost: u64,
	reqInfo: Array<string>,
	// contributions: Array<string>
): string[] {
  let tier = new Tier(rnj, id, name, cost, reqInfo);
  setTier(rnj, tier);
  setTiersByCreator(context.sender, id);
  logging.log("create a new tier")
  logging.log("id")
  return [name, id]
}

function generateRandomRnj(): Uint8Array {
	return math.randomBuffer(RNJ_DIGITS);
}

function randomNum(): u32 {
	let buf = math.randomBuffer(4);
	return (((0xff & buf[0]) << 24) | ((0xff & buf[1]) << 16) | ((0xff & buf[2]) << 8) | ((0xff & buf[3]) << 0)) % 100;
}

