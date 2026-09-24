/**
 * Rough drive time between two points, worked out in the browser so it
 * follows whatever coordinates are in content.js without a script to re-run.
 *
 * Kodai's roads wind, so straight line distance undersells the drive. The
 * factor below came from routing Kodai Lake to each Explore spot over
 * OpenStreetMap roads: road distance ran 1.55 to 2.09 times the straight line,
 * 1.82 on average. The speed is deliberately cautious; the routing engine's own
 * times assume open roads and put Berijam at 33 minutes, which in practice is
 * nearer an hour.
 */
const EARTH_KM = 6371
const ROAD_FACTOR = 1.8
const KMH = 20

const rad = (deg) => (deg * Math.PI) / 180

/** Great circle distance in km between two { lat, lng } points. */
export function straightKm(a, b) {
  const h =
    Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2
  return 2 * EARTH_KM * Math.asin(Math.sqrt(h))
}

/** Estimated road km and minutes, minutes rounded up to the next five. */
export function drive(from, to) {
  const km = straightKm(from, to) * ROAD_FACTOR
  const minutes = Math.max(5, Math.ceil(((km / KMH) * 60) / 5) * 5)
  return { km, minutes }
}

/** "20 min drive", "1 hr drive", "1 hr 15 min drive" */
export function driveLabel(minutes) {
  if (minutes < 60) return `${minutes} min drive`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} hr ${m} min drive` : `${h} hr drive`
}
