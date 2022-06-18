import { ZillowItem } from '../types';
import DistanceFromTysonsBadge from './DistanceFromTysonsBadge';
import { HomeStatusMarker } from './HomeStatusMarker';
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
        livabilityScore,
        latitude,
        longitude,
        homeStatus
    } = item;
    return (
        <div style={styles.container}>
            <div>
                <strong>{lotSize}</strong> ${price.toLocaleString()}
                <div>{`${bedrooms || '--'}  bd | ${bathrooms || '--'} ba  | ${livingArea || '--'} sqft`}</div>
                <div> {`${streetAddress}, ${city}, ${state}, ${zipcode}`}</div>
                <HomeStatusMarker homeStatus={homeStatus} />
                <a style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer" href={`https://www.zillow.com/${hdpUrl}`}>
                    View on Zillow
                </a>
            </div>
            <div style={{ margin: '5px' }}>
                <div style={{ display: 'flex', flexDirection: 'row-reverse', }}>
                    <LivabilityScoreBadge
                        livabilityScore={livabilityScore}
                        state={state}
                        city={city}
                        street={streetAddress}
                    />
                </div>
                <div style={{ marginTop: '5px' }}>
                    <DistanceFromTysonsBadge
                        lat={latitude}
                        long={longitude}
                        streetAddress={streetAddress}
                        city={city}
                        state={state}
                        zipcode={zipcode}
                    />
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#111',
        minHeight: '100px',
        border: '1px solid #000',
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'space-between'
    }
}