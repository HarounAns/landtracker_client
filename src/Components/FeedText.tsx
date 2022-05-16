import { ZillowItem } from '../types';
import { LivabilityScoreBadge } from './LivabilityScoreBadge';

export interface IFeedTextProps {
    item: ZillowItem;
}

export function FeedText({ item }: IFeedTextProps) {
    const {
        lotSize,
        price,
        address: {
            streetAddress,
            city,
            state,
            zipcode,
        },
        hdpUrl,
        bedrooms,
        bathrooms,
        livingArea,
        livabilityScore
    } = item;
    return (
        <div style={styles.container}>
            <span>
                <strong>{lotSize}</strong> ${price.toLocaleString()}
                <span style={{ float: 'right', margin: '5px' }}>
                    <LivabilityScoreBadge 
                        livabilityScore={livabilityScore} 
                        state={state}
                        city={city}
                        street={streetAddress}
                    />
                </span>
            </span>
            <div>{`${bedrooms || '--'}  bd | ${bathrooms || '--'} ba  | ${livingArea || '--'} sqft`}</div>
            <div> {`${streetAddress}, ${city}, ${state}, ${zipcode}`}</div>
            <a style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer" href={`https://www.zillow.com/${hdpUrl}`}>
                View on Zillow
            </a>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#111',
        minHeight: '100px',
        border: '1px solid #000'
    }
}