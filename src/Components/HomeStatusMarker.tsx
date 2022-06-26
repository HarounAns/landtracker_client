const HOME_STATUSES = {
    OTHER: {
        backgroundColor: '#bbb',
        message: 'Off Market'
    },
    UNDER_CONTRACT: {
        backgroundColor: 'rgb(255, 90, 80)',
        message: 'Under Contract'
    },
    PENDING: {
        backgroundColor: 'rgb(255, 90, 80)',
        message: 'Pending'
    },
    RECENTLY_SOLD: {
        backgroundColor: 'rgb(255, 210, 55)',
        message: 'Recently Sold'
    },
    SOLD: {
        backgroundColor: 'rgb(255, 210, 55)',
        message: 'Sold'
    },
    FOR_SALE: {
        backgroundColor: 'rgb(255, 90, 80)',
        message: 'For Sale'
    },
};

export interface IHomeStatusMarkerProps {
    homeStatus?: "OTHER"
    | "UNDER_CONTRACT"
    | "PENDING"
    | "RECENTLY_SOLD"
    | "SOLD"
    | "FOR_SALE";
    onMarketTimeDays?: number;
}

const HAS_OFFER_HOME_STATUSES = ["UNDER_CONTRACT", "PENDING", "RECENTLY_SOLD", "SOLD"];

export function HomeStatusMarker({ homeStatus, onMarketTimeDays }: IHomeStatusMarkerProps) {
    if (!homeStatus) return null;
    if (!(homeStatus in HOME_STATUSES)) return null;

    const { backgroundColor, message } = HOME_STATUSES[homeStatus];
    return (
        <div>
            <span style={{ ...styles.dot, backgroundColor }} />
            <span>{' ' + message}</span>
            {
                Boolean(HAS_OFFER_HOME_STATUSES.includes(homeStatus)) && 
                Number.isInteger(onMarketTimeDays) && onMarketTimeDays !== undefined && (
                    <span style={styles.onMarketLabel}>
                        {`  - ON MARKET ${onMarketTimeDays} DAYS${onMarketTimeDays <= 5 ? ' 🔥' : ''}`}
                    </span>
                )
            }
        </div>
    );
}

const styles = {
    dot: {
        height: '10px',
        width: '10px',
        backgroundColor: '#bbb',
        borderRadius: '50%',
        display: 'inline-block'
    },
    onMarketLabel: {
        fontSize: '11px',
    }
}