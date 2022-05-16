import { Badge } from 'reactstrap';

export interface ILivabilityScoreBadgeProps {
	livabilityScore?: number;
	city?: string;
	state?: string;
	street?: string;
}

const _getColor = (value: number) => {
	// 75 and above is exceptional
	// 70 - 75 is excellent
	// 65 - 70 is average
	// 60 - 65 below average
	// below 60 is poor

	if (value >= 75)
		return { backgroundColor: 'green', color: 'white' };
	if (value >= 70)
		return { backgroundColor: '#4BB543', color: 'white' };
	if (value >= 65)
		return { backgroundColor: 'yellow', color: 'white' };
	if (value >= 60)
		return { backgroundColor: 'orange', color: 'white' };
	return { backgroundColor: 'red', color: 'white' };
}

export function LivabilityScoreBadge({
	livabilityScore,
	city,
	state,
	street
}: ILivabilityScoreBadgeProps) {
	if (!livabilityScore) return null;

	const areaVibesRedirectURL = (city && state && street)
		? `https://www.areavibes.com/${encodeURIComponent(city)}-${state.toLowerCase()}/?addr=${encodeURIComponent(street)}`
		: '#';

	const { backgroundColor, color } = _getColor(livabilityScore);
	return (
		<div
			// style={{ backgroundColor: _getColor(livabilityScore) }}
			style={{ ...styles.dot, backgroundColor, color }}
			onClick={() => window.open(areaVibesRedirectURL, "_blank")}>
			<strong>
				{livabilityScore}
			</strong>
		</div>
	);
}

const styles = {
	dot: {
		height: '25px',
		width: '25px',
		backgroundColor: '#bbb',
		borderRadius: '50%',
		border: '1px solid #777',
		fontSize: '14px',
		display: 'flex',
		textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
		alignItems: 'center' as const,
		justifyContent: 'center' as const,
	}
}