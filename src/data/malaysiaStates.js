// Malaysian states with coordinates for Aladhan API
// Coordinates point to major city/town in each state
export const MALAYSIA_STATES = [
  { code: 'JHR', name: 'Johor', city: 'Johor Bahru', lat: 1.4927, lng: 103.7414 },
  { code: 'KDH', name: 'Kedah', city: 'Alor Setar', lat: 6.1248, lng: 100.3685 },
  { code: 'KTN', name: 'Kelantan', city: 'Kota Bharu', lat: 6.1256, lng: 102.2385 },
  { code: 'MLK', name: 'Melaka', city: 'Melaka', lat: 2.1896, lng: 102.2501 },
  { code: 'NSN', name: 'Negeri Sembilan', city: 'Seremban', lat: 2.7258, lng: 101.9424 },
  { code: 'PHG', name: 'Pahang', city: 'Kuantan', lat: 3.8077, lng: 103.3260 },
  { code: 'PRK', name: 'Perak', city: 'Ipoh', lat: 4.5975, lng: 101.0901 },
  { code: 'PLS', name: 'Perlis', city: 'Kangar', lat: 6.4414, lng: 100.1986 },
  { code: 'PNG', name: 'Pulau Pinang', city: 'Georgetown', lat: 5.4164, lng: 100.3327 },
  { code: 'SBH', name: 'Sabah', city: 'Kota Kinabalu', lat: 5.9804, lng: 116.0735 },
  { code: 'SWK', name: 'Sarawak', city: 'Kuching', lat: 1.5535, lng: 110.3593 },
  { code: 'SGR', name: 'Selangor', city: 'Shah Alam', lat: 3.0733, lng: 101.5185 },
  { code: 'TRG', name: 'Terengganu', city: 'Kuala Terengganu', lat: 5.3117, lng: 103.1324 },
  { code: 'KUL', name: 'Kuala Lumpur', city: 'Kuala Lumpur', lat: 3.1390, lng: 101.6869 },
  { code: 'PJY', name: 'Putrajaya', city: 'Putrajaya', lat: 2.9264, lng: 101.6964 },
  { code: 'LBN', name: 'Labuan', city: 'Labuan', lat: 5.2831, lng: 115.2308 },
]

export const DEFAULT_STATE = MALAYSIA_STATES.find((s) => s.code === 'KUL')
