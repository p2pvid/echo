import { context, logging, storage, base64, math } from 'near-sdk-as';
import {
  Tier,
  TierList,
  tiers,
  tiersByOwner,
  displayTiers,
} from './model';

const RNJ_DIGITS: u32 = 16;
const ORDER_LIMIT = 8;

// *********************************************************


// Methods for Owner


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

// // Methods for Tier
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


// display global tiers
export function displayGolbalTiers(): Tier[] {
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




export function createTier(
  name: string,
	cost: string, // probably needs to be a u64
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
	cost: string, // probably needs to be a u64
	reqInfo: Array<string>,
	// contributions: Array<string>
): string[] {
  let tier = new Tier(rnj, id, name, cost, reqInfo);
  setTier(rnj, tier);
  setTiersByOwner(context.sender, id);
  logging.log("create a new tier")
  logging.log("id")
  return [name, id]
}

function generateRandomRnj(): Uint8Array {
	return math.randomBuffer(RNJ_DIGITS);
}

// function randomNum(): u32 {
// 	let buf = math.randomBuffer(4);
// 	return (((0xff & buf[0]) << 24) | ((0xff & buf[1]) << 16) | ((0xff & buf[2]) << 8) | ((0xff & buf[3]) << 0)) % 100;
// }

