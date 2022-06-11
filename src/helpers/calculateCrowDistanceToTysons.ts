const TYSONS_LAT_LONG = {
  latitude: 38.91743,
  longitude: -77.22331,
};

export const calculateCrowDistanceToTysons = (lat: number, long: number) => {
  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  const calcCrow = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d * 0.621371; // km to miles
  };

  // Converts numeric degrees to radians
  const toRad = (value: number) => {
    return (value * Math.PI) / 180;
  };

  return calcCrow(
    lat,
    long,
    TYSONS_LAT_LONG.latitude,
    TYSONS_LAT_LONG.longitude
  );
};
