import { context, PersistentMap } from 'near-sdk-as';

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

	constructor(
		public rnj: Uint8Array,
		public id: string,
		public name: string,
		public cost: string, // probably needs to be a u64 check createTier & generateTier in main.ts
		public reqInfo: Array<string>
	) // public contributions: Array<string>,
	{
		this.owner = context.sender;
	}
}

@nearBindgen
export class Contribution {
	owner: string;

	constructor(
		public id: string,
		// public fufillment: string,
		public reqInfo: string,
		public tier_purchased: string,
		public tier_purchased_index: u16,
		public tier_price: u64,
		// public purchase_history: Array<string>,
		// public total_paid: u64,
		public active: bool
	) {
		this.owner = context.sender;
	}
}

// store all tiers with a unique id
export const tiers = new PersistentMap<Uint8Array, Tier>("tiers")

// store all tiers ids of an owner
export const tiersByOwner = new PersistentMap<string, TierList>(
  "tiersByOwner"
)

// store all contributions of a tier by tier
export const contributionsByTier = new PersistentMap<Uint8Array, ContributionList>(
  "contributions"
)

export const displayTiers = new PersistentMap<string, TierList>("show");