import { calculateCrowDistanceToTysons } from '../helpers/calculateCrowDistanceToTysons';

export interface IDistanceFromTysonsBadgeProps {
    lat: number;
    long: number;
    streetAddress: string;
    zipcode: string;
    state: string;
    city: string;

}

const _getColor = (value: number) => {
    // less than 5 miles is exceptional
    // 5 - 10 is excellent
    // 10 - 17 is average
    // 17 - 25 below average
    // above 25 is poor

    if (value <= 5)
        return { backgroundColor: 'green', color: 'white' };
    if (value <= 10)
        return { backgroundColor: '#4BB543', color: 'white' };
    if (value <= 17)
        return { backgroundColor: 'yellow', color: 'white' };
    if (value <= 25)
        return { backgroundColor: 'orange', color: 'white' };
    return { backgroundColor: 'red', color: 'white' };
}

export default function DistanceFromTysonsBadge({
    lat,
    long,
    streetAddress,
    city,
    state,
    zipcode
}: IDistanceFromTysonsBadgeProps) {
    if (!lat || !long) return null;

    const distance = calculateCrowDistanceToTysons(lat, long).toFixed(1);
    const { backgroundColor, color } = _getColor(parseFloat(distance));
    const googleMapsURL = `https://www.google.com/maps/dir/${streetAddress.replace(/\s/g, '+')},+${city.replace(/\s/g, '+')},+${state}+${zipcode}/Tysons+Corner+Center,+1961+Chain+Bridge+Rd,+Tysons,+VA+22102/`;

    return (
        <div
            style={{ ...styles.square, backgroundColor, color }}
            onClick={() => window.open(googleMapsURL, "_blank")}>
            <strong>
                {distance} mi
            </strong>
        </div>
    );
}

const styles = {
    square: {
        height: '25px',
        width: '60px',
        backgroundColor: '#bbb',
        border: '1px solid #777',
        fontSize: '14px',
        display: 'flex',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
    }
}