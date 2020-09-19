import { context, PersistentMap, u256, u128 } from 'near-sdk-as';

@nearBindgen
export class TierList {
  constructor(public id: Array<string>) {}
}

@nearBindgen
export class ContributionList {
	constructor(public id: Array<string>) {}
}

@nearBindgen
export class Tier {
  owner: string;
  // public_key: string;

	constructor(
		public rnj: Uint8Array,
		public id: string,
		public name: string,
		public description: string,
		public cost: string, // probably needs to be a u64 check createTier & generateTier in main.ts
		public contributor_info: Array<string> // public contributions: Array<string>,
	) {
    this.owner = context.sender;
    // this.public_key = context.senderPublicKey
    
	}
}

@nearBindgen
export class Contribution {
  contributor: string;

	constructor(
		public rnj: Uint8Array,
		public id: string,
		public fee_rate: u128,
		public receiver: string,
		public required_info: string,
		public tier_purchased: string,
		public tier_purchased_index: u128,
		public payment: u128,
		public message: string // public fufillment: string, // public purchase_history: Array<string>, // public total_paid: u64,
	) // public active: bool
	{
		this.contributor = context.sender;
	}
}
//Tier Storage
// store all tiers with a unique id
export const tiers = new PersistentMap<Uint8Array, Tier>("tiers")

// store all tiers ids of an owner
export const tiersByOwner = new PersistentMap<string, TierList>(
  "tiersByOwner"
)

export const displayTiers = new PersistentMap<string, TierList>('show');

//Contribution Storage
export const contributions = new PersistentMap<Uint8Array, Contribution>('contributions');

// store all contributions of a tier by tier
export const contributionsByTier = new PersistentMap<Uint8Array, ContributionList>(
  "contributions"
)

// store all contributions by id
export const contributionsByContributor = new PersistentMap<string, ContributionList>(
  "contributionsByContributor"
)

