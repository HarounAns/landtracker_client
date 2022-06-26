export interface ZillowItem {
  address: Address;
  bathrooms: number;
  bedrooms: number;
  hdpUrl: string;
  livingArea: number;
  lotSize: string;
  photos?: string[] | null;
  price: number;
  username: string;
  zpid: string;
  scrapedTs: string;
  livabilityScore?: number;
  SK: string;
  PK: string;
  latitude: number;
  longitude: number;
  homeStatus?:
    | "OTHER"
    | "UNDER_CONTRACT"
    | "PENDING"
    | "RECENTLY_SOLD"
    | "SOLD"
    | "FOR_SALE";
  onMarketTimeDays?: number;
}
export interface Address {
  city: string;
  state: string;
  streetAddress: string;
  zipcode: string;
  subdivision?: string | null;
  community?: string | null;
  neighborhood?: string | null;
}
export interface NextKey {
  PK: string;
  SK: string;
}
export interface GetUserFeedApiResponse {
  data: {
    feed: ZillowItem[];
    hasNext: boolean;
    nextKey: NextKey;
  };
}
