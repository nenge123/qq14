import * as locationZone from './location.js';
export const regions = [{
	icon: "images/region/La Noscea.png",
	name: "La Noscea",
	page: "LaNoscea",
	zones: [27, 30, 31, 32, 33, 34, 350, 358, 425]
},
{
	icon: "images/region/Black Shroud.png",
	name: "The Black Shroud",
	page: "TheBlackShroud",
	zones: [39, 54, 55, 56, 57, 426]
},
{
	icon: "images/region/Thanalan.png",
	name: "Thanalan",
	page: "Thanalan",
	zones: [51, 42, 43, 44, 45, 46, 427]
},
{
	icon: "images/region/Ishgard.png",
	name: "Ishgard and Surrounds",
	page: "Ishgard",
	zones: [62, 63, 2200, 2100, 2101, 2082, 2000, 2001, 2002, 1647]
},
{
	icon: "images/region/Gyr Abania.png",
	name: "Gyr Abania",
	page: "GyrAbania",
	zones: [2403, 2406, 2407, 2408]
},
{
	icon: "images/region/Kugane.png",
	name: "Far East",
	page: "FarEast",
	zones: [513, 2412, 2409, 2410, 2411, 2414, 2462, 2530, 2545]
},
{
	icon: "images/region/Ilsabard.png",
	name: "Ilsabard",
	page: "Ilsabard",
	zones: [3707, 3709, 3710, 3534, 3662]
},
{
	icon: "images/region/Tural.png",
	name: "Tural",
	page: "Tural",
	zones: [4504, 4505, 4506, 4507, 4503, 4508, 4509, 4510]
},
{
	icon: "images/region/Norvrandt.png",
	name: "Norvrandt",
	page: "Norvrandt",
	zones: [516, 517, 2953, 2954, 2955, 2956, 2957, 2958],
},
{
	icon: "images/region/Aetheryte.png",
	name: "Others",
	page: "Others",
	zones: [67, 3706, 4043, 3708, 3711, 3712, 3713]
}
];
export const weatherIndex = [
	"",
	"Clear Skies",
	"Fair Skies",
	"Clouds",
	"Fog",
	"Wind",
	"Gales",
	"Rain",
	"Showers",
	"Thunder",
	"Thunderstorms",
	"Dust Storms",
	"Sandstorms",
	"Hot Spells",
	"Heat Waves",
	"Snow",
	"Blizzards",
	"Gloom",
	"Auroras",
	"Darkness",
	"Tension",
	"Clouds",
	"Storm Clouds",
	"Rough Seas",
	"Rough Seas",
	"Louring",
	"Heat Waves",
	"Gloom",
	"Gales",
	"Eruptions",
	"Fair Skies",
	"Fair Skies",
	"Fair Skies",
	"Fair Skies",
	"Fair Skies",
	"Irradiance",
	"Core Radiation",
	"Core Radiation",
	"Core Radiation",
	"Core Radiation",
	"Shelf Clouds",
	"Shelf Clouds",
	"Shelf Clouds",
	"Shelf Clouds",
	"Oppression",
	"Oppression",
	"Oppression",
	"Oppression",
	"Oppression",
	"Umbral Wind",
	"Umbral Static",
	"Smoke",
	"Fair Skies",
	"Royal Levin",
	"Hyperelectricity",
	"Royal Levin",
	"Oppression",
	"Thunder",
	"Thunder",
	"Multiplicity",
	"Multiplicity",
	"Rain",
	"Fair Skies",
	"Rain",
	"Fair Skies",
	"Dragonstorms",
	"Dragonstorms",
	"Subterrain",
	"Concordance",
	"Concordance",
	"Beyond Time",
	"Beyond Time",
	"Beyond Time",
	"Demonic Infinity",
	"Demonic Infinity",
	"Demonic Infinity",
	"Dimensional Disruption",
	"Dimensional Disruption",
	"Dimensional Disruption",
	"Revelstorms",
	"Revelstorms",
	"Eternal Bliss",
	"Eternal Bliss",
	"Wyrmstorms",
	"Wyrmstorms",
	"Revelstorms",
	"Quicklevin",
	"Thunder",
	"Dimensional Disruption",
	"Fair Skies",
	"Clear Skies",
	"White Cyclones",
	"White Cyclones",
	"White Cyclones",
	"Ultimania",
	"White Cyclones",
	"Moonlight",
	"Moonlight",
	"Moonlight",
	"Moonlight",
	"Red Moon",
	"Scarlet",
	"Scarlet",
	"Scarlet",
	"Fair Skies",
	"Fair Skies",
	"Fair Skies",
	"Fair Skies",
	"Flames",
	"Tsunamis",
	"Cyclones",
	"Geostorms",
	"True Blue",
	"True Blue",
	"True Blue",
	"Umbral Turbulence",
	"True Blue",
	"Everlasting Light",
	"Gales",
	"Termination",
	"Termination",
	"Dreams",
	"Dreams",
	"Dreams",
	"Brilliance",
	"Brilliance",
	"Termination",
	"Termination",
	"Everlasting Light",
	"Eruptions",
	"Termination",
	"Fair Skies",
	"Umbral Flare",
	"Umbral Duststorms",
	"Umbral Levin",
	"Umbral Tempest",
	"Starshower",
	"Delirium",
	"Clouds",
	"Clouds",
	"Irradiance",
	"Irradiance",
	"Storm Clouds",
	"Firestorms",
	"Spectral Current",
	"",
	"Climactic",
	"Moon Dust",
	"Astromagnetic Storms",
	"Apocalypse",
	"Polarization",
	"Polarization",
	"Polarization",
	"Polarization",
	"Polarization",
	"Projection",
	"Pandæmonium",
	"Pandæmonium",
	"Pandæmonium",
	"Ultimatum",
	"Inevitability",
	"Transcendence",
	"Transcendence",
	"Transcendence",
	"Transcendence",
	"Transcendence",
	"Transcendence",
	"Transcendence",
	"Transcendence",
	"Dragonstorms",
	"Vacuity",
	"Vacuity",
	"Vacuity",
	"Dimensional Disruption",
	"Dimensional Disruption",
	"Dimensional Disruption",
	"Pandæmonium",
	"Pandæmonium",
	"Lyrical Catharsis",
	"Vacuity",
	"Liminality",
	"Liminality",
	"Projection",
	"Projection",
	"Projection",
	"Projection",
	"Reminiscence",
	"Ominous Clouds",
	"Projection",
	"Atmospheric Phantasms",
	"Illusory Disturbances",
	"Auroral Mirages",
	"Electrostatic Dust",
	"Meteor Showers",
	"Meteor Showers",
	"Astromagnetic Storms",
	"Sporing Mist"
];
export const weatherRate = {
	0: {
		"id": 0,
		"rates": [
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	1: {
		"id": 1,
		"rates": [
			{
				"weather": 7,
				"rate": 5
			},
			{
				"weather": 7,
				"rate": 20
			},
			{
				"weather": 4,
				"rate": 30
			},
			{
				"weather": 3,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 55
			},
			{
				"weather": 1,
				"rate": 85
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	2: {
		"id": 2,
		"rates": [
			{
				"weather": 7,
				"rate": 5
			},
			{
				"weather": 7,
				"rate": 20
			},
			{
				"weather": 4,
				"rate": 30
			},
			{
				"weather": 3,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 55
			},
			{
				"weather": 1,
				"rate": 85
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	3: {
		"id": 3,
		"rates": [
			{
				"weather": 9,
				"rate": 5
			},
			{
				"weather": 7,
				"rate": 20
			},
			{
				"weather": 4,
				"rate": 30
			},
			{
				"weather": 3,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 55
			},
			{
				"weather": 1,
				"rate": 85
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	4: {
		"id": 4,
		"rates": [
			{
				"weather": 9,
				"rate": 5
			},
			{
				"weather": 7,
				"rate": 20
			},
			{
				"weather": 4,
				"rate": 30
			},
			{
				"weather": 3,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 55
			},
			{
				"weather": 1,
				"rate": 85
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	5: {
		"id": 5,
		"rates": [
			{
				"weather": 4,
				"rate": 5
			},
			{
				"weather": 10,
				"rate": 10
			},
			{
				"weather": 9,
				"rate": 25
			},
			{
				"weather": 4,
				"rate": 30
			},
			{
				"weather": 3,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 70
			},
			{
				"weather": 1,
				"rate": 100
			}
		]
	},
	6: {
		"id": 6,
		"rates": [
			{
				"weather": 4,
				"rate": 5
			},
			{
				"weather": 8,
				"rate": 10
			},
			{
				"weather": 7,
				"rate": 25
			},
			{
				"weather": 4,
				"rate": 30
			},
			{
				"weather": 3,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 70
			},
			{
				"weather": 1,
				"rate": 100
			}
		]
	},
	7: {
		"id": 7,
		"rates": [
			{
				"weather": 1,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 85
			},
			{
				"weather": 4,
				"rate": 95
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	8: {
		"id": 8,
		"rates": [
			{
				"weather": 1,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 85
			},
			{
				"weather": 4,
				"rate": 95
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	9: {
		"id": 9,
		"rates": [
			{
				"weather": 1,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 85
			},
			{
				"weather": 4,
				"rate": 95
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	10: {
		"id": 10,
		"rates": [
			{
				"weather": 11,
				"rate": 15
			},
			{
				"weather": 1,
				"rate": 55
			},
			{
				"weather": 2,
				"rate": 75
			},
			{
				"weather": 3,
				"rate": 85
			},
			{
				"weather": 4,
				"rate": 95
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	11: {
		"id": 11,
		"rates": [
			{
				"weather": 1,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 70
			},
			{
				"weather": 4,
				"rate": 80
			},
			{
				"weather": 7,
				"rate": 85
			},
			{
				"weather": 8,
				"rate": 100
			}
		]
	},
	12: {
		"id": 12,
		"rates": [
			{
				"weather": 14,
				"rate": 20
			},
			{
				"weather": 1,
				"rate": 60
			},
			{
				"weather": 2,
				"rate": 80
			},
			{
				"weather": 3,
				"rate": 90
			},
			{
				"weather": 4,
				"rate": 100
			}
		]
	},
	13: {
		"id": 13,
		"rates": [
			{
				"weather": 1,
				"rate": 5
			},
			{
				"weather": 2,
				"rate": 20
			},
			{
				"weather": 3,
				"rate": 50
			},
			{
				"weather": 4,
				"rate": 100
			}
		]
	},
	14: {
		"id": 14,
		"rates": [
			{
				"weather": 3,
				"rate": 20
			},
			{
				"weather": 1,
				"rate": 50
			},
			{
				"weather": 2,
				"rate": 80
			},
			{
				"weather": 4,
				"rate": 90
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	15: {
		"id": 15,
		"rates": [
			{
				"weather": 3,
				"rate": 20
			},
			{
				"weather": 1,
				"rate": 50
			},
			{
				"weather": 2,
				"rate": 80
			},
			{
				"weather": 4,
				"rate": 90
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	16: {
		"id": 16,
		"rates": [
			{
				"weather": 3,
				"rate": 20
			},
			{
				"weather": 1,
				"rate": 50
			},
			{
				"weather": 2,
				"rate": 70
			},
			{
				"weather": 5,
				"rate": 80
			},
			{
				"weather": 4,
				"rate": 90
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	17: {
		"id": 17,
		"rates": [
			{
				"weather": 3,
				"rate": 20
			},
			{
				"weather": 1,
				"rate": 50
			},
			{
				"weather": 2,
				"rate": 70
			},
			{
				"weather": 5,
				"rate": 80
			},
			{
				"weather": 4,
				"rate": 90
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	18: {
		"id": 18,
		"rates": [
			{
				"weather": 4,
				"rate": 5
			},
			{
				"weather": 1,
				"rate": 50
			},
			{
				"weather": 2,
				"rate": 80
			},
			{
				"weather": 3,
				"rate": 90
			},
			{
				"weather": 7,
				"rate": 95
			},
			{
				"weather": 8,
				"rate": 100
			}
		]
	},
	19: {
		"id": 19,
		"rates": [
			{
				"weather": 4,
				"rate": 10
			},
			{
				"weather": 1,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 80
			},
			{
				"weather": 5,
				"rate": 90
			},
			{
				"weather": 6,
				"rate": 100
			}
		]
	},
	20: {
		"id": 20,
		"rates": [
			{
				"weather": 1,
				"rate": 30
			},
			{
				"weather": 2,
				"rate": 50
			},
			{
				"weather": 3,
				"rate": 70
			},
			{
				"weather": 4,
				"rate": 80
			},
			{
				"weather": 9,
				"rate": 90
			},
			{
				"weather": 10,
				"rate": 100
			}
		]
	},
	21: {
		"id": 21,
		"rates": [
			{
				"weather": 16,
				"rate": 20
			},
			{
				"weather": 15,
				"rate": 60
			},
			{
				"weather": 2,
				"rate": 70
			},
			{
				"weather": 1,
				"rate": 75
			},
			{
				"weather": 3,
				"rate": 90
			},
			{
				"weather": 4,
				"rate": 100
			}
		]
	},
	22: {
		"id": 22,
		"rates": [
			{
				"weather": 3,
				"rate": 15
			},
			{
				"weather": 4,
				"rate": 30
			},
			{
				"weather": 17,
				"rate": 60
			},
			{
				"weather": 1,
				"rate": 75
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	23: {
		"id": 23,
		"rates": [
			{
				"weather": 29,
				"rate": 100
			}
		]
	},
	24: {
		"id": 24,
		"rates": [
			{
				"weather": 1,
				"rate": 30
			},
			{
				"weather": 2,
				"rate": 50
			},
			{
				"weather": 3,
				"rate": 70
			},
			{
				"weather": 4,
				"rate": 85
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	25: {
		"id": 25,
		"rates": [
			{
				"weather": 26,
				"rate": 100
			}
		]
	},
	26: {
		"id": 26,
		"rates": [
			{
				"weather": 28,
				"rate": 100
			}
		]
	},
	27: {
		"id": 27,
		"rates": [
			{
				"weather": 15,
				"rate": 100
			}
		]
	},
	28: {
		"id": 28,
		"rates": [
			{
				"weather": 3,
				"rate": 100
			}
		]
	},
	29: {
		"id": 29,
		"rates": [
			{
				"weather": 3,
				"rate": 20
			},
			{
				"weather": 1,
				"rate": 50
			},
			{
				"weather": 2,
				"rate": 80
			},
			{
				"weather": 4,
				"rate": 90
			},
			{
				"weather": 10,
				"rate": 100
			}
		]
	},
	30: {
		"id": 30,
		"rates": [
			{
				"weather": 27,
				"rate": 100
			}
		]
	},
	31: {
		"id": 31,
		"rates": [
			{
				"weather": 25,
				"rate": 100
			}
		]
	},
	32: {
		"id": 32,
		"rates": [
			{
				"weather": 3,
				"rate": 20
			},
			{
				"weather": 1,
				"rate": 50
			},
			{
				"weather": 2,
				"rate": 70
			},
			{
				"weather": 2,
				"rate": 80
			},
			{
				"weather": 4,
				"rate": 90
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	33: {
		"id": 33,
		"rates": [
			{
				"weather": 1,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 85
			},
			{
				"weather": 4,
				"rate": 95
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	34: {
		"id": 34,
		"rates": [
			{
				"weather": 3,
				"rate": 5
			},
			{
				"weather": 7,
				"rate": 20
			},
			{
				"weather": 4,
				"rate": 30
			},
			{
				"weather": 3,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 55
			},
			{
				"weather": 1,
				"rate": 85
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	35: {
		"id": 35,
		"rates": [
			{
				"weather": 15,
				"rate": 100
			}
		]
	},
	36: {
		"id": 36,
		"rates": [
			{
				"weather": 5,
				"rate": 100
			}
		]
	},
	37: {
		"id": 37,
		"rates": [
			{
				"weather": 9,
				"rate": 100
			}
		]
	},
	38: {
		"id": 38,
		"rates": [
			{
				"weather": 23,
				"rate": 100
			}
		]
	},
	39: {
		"id": 39,
		"rates": [
			{
				"weather": 24,
				"rate": 100
			}
		]
	},
	40: {
		"id": 40,
		"rates": [
			{
				"weather": 4,
				"rate": 100
			}
		]
	},
	41: {
		"id": 41,
		"rates": [
			{
				"weather": 11,
				"rate": 100
			}
		]
	},
	42: {
		"id": 42,
		"rates": [
			{
				"weather": 16,
				"rate": 100
			}
		]
	},
	43: {
		"id": 43,
		"rates": [
			{
				"weather": 22,
				"rate": 100
			}
		]
	},
	44: {
		"id": 44,
		"rates": [
			{
				"weather": 36,
				"rate": 100
			}
		]
	},
	45: {
		"id": 45,
		"rates": [
			{
				"weather": 20,
				"rate": 100
			}
		]
	},
	46: {
		"id": 46,
		"rates": [
			{
				"weather": 35,
				"rate": 100
			}
		]
	},
	47: {
		"id": 47,
		"rates": [
			{
				"weather": 15,
				"rate": 60
			},
			{
				"weather": 2,
				"rate": 70
			},
			{
				"weather": 1,
				"rate": 75
			},
			{
				"weather": 3,
				"rate": 90
			},
			{
				"weather": 4,
				"rate": 100
			}
		]
	},
	48: {
		"id": 48,
		"rates": [
			{
				"weather": 15,
				"rate": 60
			},
			{
				"weather": 2,
				"rate": 70
			},
			{
				"weather": 1,
				"rate": 75
			},
			{
				"weather": 3,
				"rate": 90
			},
			{
				"weather": 4,
				"rate": 100
			}
		]
	},
	49: {
		"id": 49,
		"rates": [
			{
				"weather": 16,
				"rate": 20
			},
			{
				"weather": 15,
				"rate": 60
			},
			{
				"weather": 2,
				"rate": 70
			},
			{
				"weather": 1,
				"rate": 75
			},
			{
				"weather": 3,
				"rate": 90
			},
			{
				"weather": 4,
				"rate": 100
			}
		]
	},
	50: {
		"id": 50,
		"rates": [
			{
				"weather": 3,
				"rate": 10
			},
			{
				"weather": 4,
				"rate": 20
			},
			{
				"weather": 9,
				"rate": 30
			},
			{
				"weather": 11,
				"rate": 40
			},
			{
				"weather": 1,
				"rate": 70
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	51: {
		"id": 51,
		"rates": [
			{
				"weather": 3,
				"rate": 10
			},
			{
				"weather": 4,
				"rate": 20
			},
			{
				"weather": 7,
				"rate": 30
			},
			{
				"weather": 8,
				"rate": 40
			},
			{
				"weather": 1,
				"rate": 70
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	52: {
		"id": 52,
		"rates": [
			{
				"weather": 3,
				"rate": 10
			},
			{
				"weather": 6,
				"rate": 20
			},
			{
				"weather": 50,
				"rate": 40
			},
			{
				"weather": 1,
				"rate": 70
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	53: {
		"id": 53,
		"rates": [
			{
				"weather": 1,
				"rate": 30
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 70
			},
			{
				"weather": 4,
				"rate": 80
			},
			{
				"weather": 5,
				"rate": 90
			},
			{
				"weather": 49,
				"rate": 100
			}
		]
	},
	54: {
		"id": 54,
		"rates": [
			{
				"weather": 2,
				"rate": 35
			},
			{
				"weather": 3,
				"rate": 70
			},
			{
				"weather": 9,
				"rate": 100
			}
		]
	},
	55: {
		"id": 55,
		"rates": [
			{
				"weather": 3,
				"rate": 10
			},
			{
				"weather": 4,
				"rate": 20
			},
			{
				"weather": 7,
				"rate": 30
			},
			{
				"weather": 8,
				"rate": 40
			},
			{
				"weather": 1,
				"rate": 70
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	56: {
		"id": 56,
		"rates": [
			{
				"weather": 44,
				"rate": 100
			}
		]
	},
	57: {
		"id": 57,
		"rates": [
			{
				"weather": 51,
				"rate": 100
			}
		]
	},
	58: {
		"id": 58,
		"rates": [
			{
				"weather": 1,
				"rate": 100
			}
		]
	},
	59: {
		"id": 59,
		"rates": [
			{
				"weather": 4,
				"rate": 15
			},
			{
				"weather": 7,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	60: {
		"id": 60,
		"rates": [
			{
				"weather": 2,
				"rate": 40
			},
			{
				"weather": 4,
				"rate": 75
			},
			{
				"weather": 5,
				"rate": 95
			},
			{
				"weather": 49,
				"rate": 99
			},
			{
				"weather": 54,
				"rate": 100
			}
		]
	},
	61: {
		"id": 61,
		"rates": [
			{
				"weather": 2,
				"rate": 40
			},
			{
				"weather": 4,
				"rate": 60
			},
			{
				"weather": 5,
				"rate": 95
			},
			{
				"weather": 49,
				"rate": 99
			},
			{
				"weather": 54,
				"rate": 100
			}
		]
	},
	62: {
		"id": 62,
		"rates": [
			{
				"weather": 2,
				"rate": 40
			},
			{
				"weather": 4,
				"rate": 65
			},
			{
				"weather": 5,
				"rate": 90
			},
			{
				"weather": 49,
				"rate": 98
			},
			{
				"weather": 54,
				"rate": 100
			}
		]
	},
	63: {
		"id": 63,
		"rates": [
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	64: {
		"id": 64,
		"rates": [
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	65: {
		"id": 65,
		"rates": [
			{
				"weather": 2,
				"rate": 50
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	66: {
		"id": 66,
		"rates": [
			{
				"weather": 60,
				"rate": 100
			}
		]
	},
	67: {
		"id": 67,
		"rates": [
			{
				"weather": 2,
				"rate": 35
			},
			{
				"weather": 15,
				"rate": 65
			},
			{
				"weather": 16,
				"rate": 85
			},
			{
				"weather": 4,
				"rate": 100
			}
		]
	},
	68: {
		"id": 68,
		"rates": [
			{
				"weather": 14,
				"rate": 100
			}
		]
	},
	69: {
		"id": 69,
		"rates": [
			{
				"weather": 69,
				"rate": 100
			}
		]
	},
	70: {
		"id": 70,
		"rates": [
			{
				"weather": 54,
				"rate": 100
			}
		]
	},
	71: {
		"id": 71,
		"rates": [
			{
				"weather": 2,
				"rate": 30
			},
			{
				"weather": 4,
				"rate": 60
			},
			{
				"weather": 5,
				"rate": 90
			},
			{
				"weather": 49,
				"rate": 100
			}
		]
	},
	72: {
		"id": 72,
		"rates": [
			{
				"weather": 2,
				"rate": 65
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	73: {
		"id": 73,
		"rates": [
			{
				"weather": 2,
				"rate": 65
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	74: {
		"id": 74,
		"rates": [
			{
				"weather": 17,
				"rate": 100
			}
		]
	},
	75: {
		"id": 75,
		"rates": [
			{
				"weather": 74,
				"rate": 100
			}
		]
	},
	76: {
		"id": 76,
		"rates": [
			{
				"weather": 84,
				"rate": 100
			}
		]
	},
	77: {
		"id": 77,
		"rates": [
			{
				"weather": 80,
				"rate": 100
			}
		]
	},
	78: {
		"id": 78,
		"rates": [
			{
				"weather": 1,
				"rate": 15
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 80
			},
			{
				"weather": 4,
				"rate": 90
			},
			{
				"weather": 9,
				"rate": 100
			}
		]
	},
	79: {
		"id": 79,
		"rates": [
			{
				"weather": 1,
				"rate": 15
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 80
			},
			{
				"weather": 4,
				"rate": 90
			},
			{
				"weather": 9,
				"rate": 100
			}
		]
	},
	80: {
		"id": 80,
		"rates": [
			{
				"weather": 1,
				"rate": 10
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 75
			},
			{
				"weather": 4,
				"rate": 85
			},
			{
				"weather": 5,
				"rate": 95
			},
			{
				"weather": 11,
				"rate": 100
			}
		]
	},
	81: {
		"id": 81,
		"rates": [
			{
				"weather": 1,
				"rate": 20
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 80
			},
			{
				"weather": 4,
				"rate": 90
			},
			{
				"weather": 10,
				"rate": 100
			}
		]
	},
	82: {
		"id": 82,
		"rates": [
			{
				"weather": 7,
				"rate": 10
			},
			{
				"weather": 4,
				"rate": 20
			},
			{
				"weather": 3,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 80
			},
			{
				"weather": 1,
				"rate": 100
			}
		]
	},
	83: {
		"id": 83,
		"rates": [
			{
				"weather": 9,
				"rate": 10
			},
			{
				"weather": 5,
				"rate": 20
			},
			{
				"weather": 3,
				"rate": 35
			},
			{
				"weather": 2,
				"rate": 75
			},
			{
				"weather": 1,
				"rate": 100
			}
		]
	},
	84: {
		"id": 84,
		"rates": [
			{
				"weather": 8,
				"rate": 5
			},
			{
				"weather": 7,
				"rate": 15
			},
			{
				"weather": 4,
				"rate": 25
			},
			{
				"weather": 3,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 80
			},
			{
				"weather": 1,
				"rate": 100
			}
		]
	},
	85: {
		"id": 85,
		"rates": [
			{
				"weather": 6,
				"rate": 5
			},
			{
				"weather": 5,
				"rate": 10
			},
			{
				"weather": 7,
				"rate": 17
			},
			{
				"weather": 4,
				"rate": 25
			},
			{
				"weather": 3,
				"rate": 35
			},
			{
				"weather": 2,
				"rate": 75
			},
			{
				"weather": 1,
				"rate": 100
			}
		]
	},
	86: {
		"id": 86,
		"rates": [
			{
				"weather": 50,
				"rate": 100
			}
		]
	},
	87: {
		"id": 87,
		"rates": [
			{
				"weather": 82,
				"rate": 100
			}
		]
	},
	88: {
		"id": 88,
		"rates": [
			{
				"weather": 79,
				"rate": 100
			}
		]
	},
	89: {
		"id": 89,
		"rates": [
			{
				"weather": 88,
				"rate": 100
			}
		]
	},
	90: {
		"id": 90,
		"rates": [
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	91: {
		"id": 91,
		"rates": [
			{
				"weather": 2,
				"rate": 30
			},
			{
				"weather": 6,
				"rate": 60
			},
			{
				"weather": 8,
				"rate": 90
			},
			{
				"weather": 15,
				"rate": 100
			}
		]
	},
	92: {
		"id": 92,
		"rates": [
			{
				"weather": 77,
				"rate": 100
			}
		]
	},
	93: {
		"id": 93,
		"rates": [
			{
				"weather": 92,
				"rate": 100
			}
		]
	},
	94: {
		"id": 94,
		"rates": [
			{
				"weather": 2,
				"rate": 10
			},
			{
				"weather": 4,
				"rate": 28
			},
			{
				"weather": 14,
				"rate": 46
			},
			{
				"weather": 15,
				"rate": 64
			},
			{
				"weather": 9,
				"rate": 82
			},
			{
				"weather": 16,
				"rate": 100
			}
		]
	},
	95: {
		"id": 95,
		"rates": [
			{
				"weather": 101,
				"rate": 100
			}
		]
	},
	96: {
		"id": 96,
		"rates": [
			{
				"weather": 2,
				"rate": 10
			},
			{
				"weather": 14,
				"rate": 28
			},
			{
				"weather": 9,
				"rate": 46
			},
			{
				"weather": 16,
				"rate": 64
			},
			{
				"weather": 49,
				"rate": 82
			},
			{
				"weather": 15,
				"rate": 100
			}
		]
	},
	97: {
		"id": 97,
		"rates": [
			{
				"weather": 12,
				"rate": 100
			}
		]
	},
	98: {
		"id": 98,
		"rates": [
			{
				"weather": 102,
				"rate": 100
			}
		]
	},
	99: {
		"id": 99,
		"rates": [
			{
				"weather": 113,
				"rate": 100
			}
		]
	},
	100: {
		"id": 100,
		"rates": [
			{
				"weather": 2,
				"rate": 12
			},
			{
				"weather": 8,
				"rate": 34
			},
			{
				"weather": 17,
				"rate": 56
			},
			{
				"weather": 10,
				"rate": 78
			},
			{
				"weather": 15,
				"rate": 100
			}
		]
	},
	101: {
		"id": 101,
		"rates": [
			{
				"weather": 119,
				"rate": 100
			}
		]
	},
	102: {
		"id": 102,
		"rates": [
			{
				"weather": 118,
				"rate": 100
			}
		]
	},
	103: {
		"id": 103,
		"rates": [
			{
				"weather": 122,
				"rate": 100
			}
		]
	},
	104: {
		"id": 104,
		"rates": [
			{
				"weather": 125,
				"rate": 100
			}
		]
	},
	105: {
		"id": 105,
		"rates": [
			{
				"weather": 120,
				"rate": 100
			}
		]
	},
	106: {
		"id": 106,
		"rates": [
			{
				"weather": 1,
				"rate": 20
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 75
			},
			{
				"weather": 4,
				"rate": 85
			},
			{
				"weather": 7,
				"rate": 95
			},
			{
				"weather": 10,
				"rate": 100
			}
		]
	},
	107: {
		"id": 107,
		"rates": [
			{
				"weather": 6,
				"rate": 10
			},
			{
				"weather": 7,
				"rate": 20
			},
			{
				"weather": 4,
				"rate": 30
			},
			{
				"weather": 3,
				"rate": 45
			},
			{
				"weather": 2,
				"rate": 85
			},
			{
				"weather": 1,
				"rate": 100
			}
		]
	},
	108: {
		"id": 108,
		"rates": [
			{
				"weather": 2,
				"rate": 45
			},
			{
				"weather": 3,
				"rate": 60
			},
			{
				"weather": 11,
				"rate": 70
			},
			{
				"weather": 14,
				"rate": 80
			},
			{
				"weather": 1,
				"rate": 100
			}
		]
	},
	109: {
		"id": 109,
		"rates": [
			{
				"weather": 7,
				"rate": 10
			},
			{
				"weather": 4,
				"rate": 20
			},
			{
				"weather": 3,
				"rate": 35
			},
			{
				"weather": 10,
				"rate": 45
			},
			{
				"weather": 1,
				"rate": 60
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	110: {
		"id": 110,
		"rates": [
			{
				"weather": 4,
				"rate": 10
			},
			{
				"weather": 7,
				"rate": 20
			},
			{
				"weather": 49,
				"rate": 30
			},
			{
				"weather": 1,
				"rate": 45
			},
			{
				"weather": 2,
				"rate": 85
			},
			{
				"weather": 3,
				"rate": 100
			}
		]
	},
	111: {
		"id": 111,
		"rates": [
			{
				"weather": 3,
				"rate": 20
			},
			{
				"weather": 2,
				"rate": 80
			},
			{
				"weather": 1,
				"rate": 100
			}
		]
	},
	112: {
		"id": 112,
		"rates": [
			{
				"weather": 1,
				"rate": 20
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 75
			},
			{
				"weather": 4,
				"rate": 85
			},
			{
				"weather": 7,
				"rate": 95
			},
			{
				"weather": 10,
				"rate": 100
			}
		]
	},
	113: {
		"id": 113,
		"rates": [
			{
				"weather": 6,
				"rate": 10
			},
			{
				"weather": 7,
				"rate": 20
			},
			{
				"weather": 4,
				"rate": 30
			},
			{
				"weather": 3,
				"rate": 45
			},
			{
				"weather": 2,
				"rate": 85
			},
			{
				"weather": 1,
				"rate": 100
			}
		]
	},
	114: {
		"id": 114,
		"rates": [
			{
				"weather": 105,
				"rate": 100
			}
		]
	},
	115: {
		"id": 115,
		"rates": [
			{
				"weather": 10,
				"rate": 100
			}
		]
	},
	116: {
		"id": 116,
		"rates": [
			{
				"weather": 127,
				"rate": 100
			}
		]
	},
	117: {
		"id": 117,
		"rates": [
			{
				"weather": 2,
				"rate": 50
			},
			{
				"weather": 5,
				"rate": 80
			},
			{
				"weather": 7,
				"rate": 90
			},
			{
				"weather": 6,
				"rate": 95
			},
			{
				"weather": 4,
				"rate": 100
			}
		]
	},
	118: {
		"id": 118,
		"rates": [
			{
				"weather": 1,
				"rate": 50
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	119: {
		"id": 119,
		"rates": [
			{
				"weather": 2,
				"rate": 45
			},
			{
				"weather": 3,
				"rate": 63
			},
			{
				"weather": 4,
				"rate": 80
			},
			{
				"weather": 7,
				"rate": 95
			},
			{
				"weather": 8,
				"rate": 100
			}
		]
	},
	120: {
		"id": 120,
		"rates": [
			{
				"weather": 2,
				"rate": 40
			},
			{
				"weather": 3,
				"rate": 55
			},
			{
				"weather": 4,
				"rate": 70
			},
			{
				"weather": 5,
				"rate": 95
			},
			{
				"weather": 6,
				"rate": 100
			}
		]
	},
	121: {
		"id": 121,
		"rates": [
			{
				"weather": 2,
				"rate": 35
			},
			{
				"weather": 3,
				"rate": 50
			},
			{
				"weather": 4,
				"rate": 65
			},
			{
				"weather": 15,
				"rate": 85
			},
			{
				"weather": 16,
				"rate": 100
			}
		]
	},
	122: {
		"id": 122,
		"rates": [
			{
				"weather": 2,
				"rate": 82
			},
			{
				"weather": 3,
				"rate": 87
			},
			{
				"weather": 4,
				"rate": 92
			},
			{
				"weather": 11,
				"rate": 97
			},
			{
				"weather": 14,
				"rate": 100
			}
		]
	},
	123: {
		"id": 123,
		"rates": [
			{
				"weather": 138,
				"rate": 100
			}
		]
	},
	124: {
		"id": 124,
		"rates": [
			{
				"weather": 2,
				"rate": 52
			},
			{
				"weather": 7,
				"rate": 64
			},
			{
				"weather": 5,
				"rate": 76
			},
			{
				"weather": 9,
				"rate": 88
			},
			{
				"weather": 11,
				"rate": 100
			}
		]
	},
	125: {
		"id": 125,
		"rates": [
			{
				"weather": 137,
				"rate": 100
			}
		]
	},
	126: {
		"id": 126,
		"rates": [
			{
				"weather": 147,
				"rate": 100
			}
		]
	},
	127: {
		"id": 127,
		"rates": [
			{
				"weather": 2,
				"rate": 50
			},
			{
				"weather": 3,
				"rate": 65
			},
			{
				"weather": 4,
				"rate": 80
			},
			{
				"weather": 9,
				"rate": 95
			},
			{
				"weather": 10,
				"rate": 100
			}
		]
	},
	128: {
		"id": 128,
		"rates": [
			{
				"weather": 2,
				"rate": 40
			},
			{
				"weather": 3,
				"rate": 58
			},
			{
				"weather": 4,
				"rate": 75
			},
			{
				"weather": 7,
				"rate": 93
			},
			{
				"weather": 8,
				"rate": 100
			}
		]
	},
	129: {
		"id": 129,
		"rates": [
			{
				"weather": 2,
				"rate": 44
			},
			{
				"weather": 3,
				"rate": 59
			},
			{
				"weather": 4,
				"rate": 73
			},
			{
				"weather": 9,
				"rate": 93
			},
			{
				"weather": 10,
				"rate": 100
			}
		]
	},
	130: {
		"id": 130,
		"rates": [
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 7,
				"rate": 70
			},
			{
				"weather": 5,
				"rate": 80
			},
			{
				"weather": 9,
				"rate": 90
			},
			{
				"weather": 15,
				"rate": 100
			}
		]
	},
	131: {
		"id": 131,
		"rates": [
			{
				"weather": 1,
				"rate": 15
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 85
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	132: {
		"id": 132,
		"rates": [
			{
				"weather": 4,
				"rate": 10
			},
			{
				"weather": 7,
				"rate": 20
			},
			{
				"weather": 8,
				"rate": 25
			},
			{
				"weather": 1,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 80
			},
			{
				"weather": 3,
				"rate": 100
			}
		]
	},
	133: {
		"id": 133,
		"rates": [
			{
				"weather": 15,
				"rate": 45
			},
			{
				"weather": 9,
				"rate": 50
			},
			{
				"weather": 7,
				"rate": 55
			},
			{
				"weather": 4,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 85
			},
			{
				"weather": 2,
				"rate": 95
			},
			{
				"weather": 1,
				"rate": 100
			}
		]
	},
	134: {
		"id": 134,
		"rates": [
			{
				"weather": 3,
				"rate": 25
			},
			{
				"weather": 49,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 85
			},
			{
				"weather": 1,
				"rate": 100
			}
		]
	},
	135: {
		"id": 135,
		"rates": [
			{
				"weather": 49,
				"rate": 15
			},
			{
				"weather": 148,
				"rate": 30
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	136: {
		"id": 136,
		"rates": [
			{
				"weather": 149,
				"rate": 15
			},
			{
				"weather": 2,
				"rate": 85
			},
			{
				"weather": 49,
				"rate": 100
			}
		]
	},
	137: {
		"id": 137,
		"rates": [
			{
				"weather": 1,
				"rate": 10
			},
			{
				"weather": 2,
				"rate": 50
			},
			{
				"weather": 3,
				"rate": 70
			},
			{
				"weather": 4,
				"rate": 85
			},
			{
				"weather": 15,
				"rate": 100
			}
		]
	},
	138: {
		"id": 138,
		"rates": [
			{
				"weather": 4,
				"rate": 10
			},
			{
				"weather": 7,
				"rate": 25
			},
			{
				"weather": 1,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 80
			},
			{
				"weather": 3,
				"rate": 100
			}
		]
	},
	139: {
		"id": 139,
		"rates": [
			{
				"weather": 151,
				"rate": 100
			}
		]
	},
	140: {
		"id": 140,
		"rates": [
			{
				"weather": 156,
				"rate": 100
			}
		]
	},
	141: {
		"id": 141,
		"rates": [
			{
				"weather": 150,
				"rate": 100
			}
		]
	},
	142: {
		"id": 142,
		"rates": [
			{
				"weather": 15,
				"rate": 5
			},
			{
				"weather": 2,
				"rate": 25
			},
			{
				"weather": 1,
				"rate": 65
			},
			{
				"weather": 3,
				"rate": 80
			},
			{
				"weather": 4,
				"rate": 90
			}
		]
	},
	143: {
		"id": 143,
		"rates": [
			{
				"weather": 160,
				"rate": 100
			}
		]
	},
	144: {
		"id": 144,
		"rates": [
			{
				"weather": 161,
				"rate": 100
			}
		]
	},
	145: {
		"id": 145,
		"rates": [
			{
				"weather": 157,
				"rate": 100
			}
		]
	},
	146: {
		"id": 146,
		"rates": [
			{
				"weather": 128,
				"rate": 100
			}
		]
	},
	147: {
		"id": 147,
		"rates": [
			{
				"weather": 162,
				"rate": 100
			}
		]
	},
	148: {
		"id": 148,
		"rates": [
			{
				"weather": 1,
				"rate": 25
			},
			{
				"weather": 2,
				"rate": 70
			},
			{
				"weather": 3,
				"rate": 80
			},
			{
				"weather": 7,
				"rate": 90
			},
			{
				"weather": 4,
				"rate": 95
			},
			{
				"weather": 8,
				"rate": 100
			}
		]
	},
	149: {
		"id": 149,
		"rates": [
			{
				"weather": 171,
				"rate": 100
			}
		]
	},
	150: {
		"id": 150,
		"rates": [
			{
				"weather": 77,
				"rate": 100
			}
		]
	},
	151: {
		"id": 151,
		"rates": [
			{
				"weather": 2,
				"rate": 50
			},
			{
				"weather": 3,
				"rate": 65
			},
			{
				"weather": 4,
				"rate": 80
			},
			{
				"weather": 7,
				"rate": 95
			},
			{
				"weather": 10,
				"rate": 100
			}
		]
	},
	152: {
		"id": 152,
		"rates": [
			{
				"weather": 2,
				"rate": 50
			},
			{
				"weather": 3,
				"rate": 65
			},
			{
				"weather": 4,
				"rate": 80
			},
			{
				"weather": 7,
				"rate": 95
			},
			{
				"weather": 8,
				"rate": 100
			}
		]
	},
	153: {
		"id": 153,
		"rates": [
			{
				"weather": 2,
				"rate": 40
			},
			{
				"weather": 3,
				"rate": 55
			},
			{
				"weather": 4,
				"rate": 70
			},
			{
				"weather": 5,
				"rate": 90
			},
			{
				"weather": 9,
				"rate": 100
			}
		]
	},
	154: {
		"id": 154,
		"rates": [
			{
				"weather": 2,
				"rate": 50
			},
			{
				"weather": 3,
				"rate": 65
			},
			{
				"weather": 4,
				"rate": 80
			},
			{
				"weather": 7,
				"rate": 95
			},
			{
				"weather": 8,
				"rate": 100
			}
		]
	},
	155: {
		"id": 155,
		"rates": [
			{
				"weather": 179,
				"rate": 100
			}
		]
	},
	156: {
		"id": 156,
		"rates": [
			{
				"weather": 10,
				"rate": 100
			}
		]
	},
	157: {
		"id": 157,
		"rates": [
			{
				"weather": 183,
				"rate": 100
			}
		]
	},
	158: {
		"id": 158,
		"rates": [
			{
				"weather": 181,
				"rate": 100
			}
		]
	},
	159: {
		"id": 159,
		"rates": [
			{
				"weather": 1,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 80
			},
			{
				"weather": 3,
				"rate": 85
			},
			{
				"weather": 4,
				"rate": 95
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	160: {
		"id": 160,
		"rates": [
			{
				"weather": 1,
				"rate": 20
			},
			{
				"weather": 2,
				"rate": 50
			},
			{
				"weather": 3,
				"rate": 70
			},
			{
				"weather": 4,
				"rate": 80
			},
			{
				"weather": 5,
				"rate": 90
			},
			{
				"weather": 15,
				"rate": 100
			}
		]
	},
	161: {
		"id": 161,
		"rates": [
			{
				"weather": 1,
				"rate": 25
			},
			{
				"weather": 2,
				"rate": 60
			},
			{
				"weather": 3,
				"rate": 75
			},
			{
				"weather": 4,
				"rate": 85
			},
			{
				"weather": 7,
				"rate": 95
			},
			{
				"weather": 8,
				"rate": 100
			}
		]
	},
	162: {
		"id": 162,
		"rates": [
			{
				"weather": 1,
				"rate": 15
			},
			{
				"weather": 2,
				"rate": 55
			},
			{
				"weather": 3,
				"rate": 70
			},
			{
				"weather": 4,
				"rate": 85
			},
			{
				"weather": 7,
				"rate": 100
			}
		]
	},
	163: {
		"id": 163,
		"rates": [
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	164: {
		"id": 164,
		"rates": [
			{
				"weather": 1,
				"rate": 5
			},
			{
				"weather": 2,
				"rate": 50
			},
			{
				"weather": 3,
				"rate": 70
			},
			{
				"weather": 11,
				"rate": 85
			},
			{
				"weather": 6,
				"rate": 100
			}
		]
	},
	165: {
		"id": 165,
		"rates": [
			{
				"weather": 2,
				"rate": 5
			},
			{
				"weather": 3,
				"rate": 25
			},
			{
				"weather": 4,
				"rate": 40
			},
			{
				"weather": 7,
				"rate": 45
			},
			{
				"weather": 10,
				"rate": 50
			},
			{
				"weather": 50,
				"rate": 100
			}
		]
	},
	166: {
		"id": 166,
		"rates": [
			{
				"weather": 7,
				"rate": 10
			},
			{
				"weather": 4,
				"rate": 20
			},
			{
				"weather": 3,
				"rate": 40
			},
			{
				"weather": 2,
				"rate": 100
			}
		]
	},
	167: {
		"id": 167,
		"rates": [
			{
				"weather": 193,
				"rate": 100
			}
		]
	},
	168: {
		"id": 168,
		"rates": [
			{
				"weather": 1,
				"rate": 10
			},
			{
				"weather": 2,
				"rate": 55
			},
			{
				"weather": 3,
				"rate": 70
			},
			{
				"weather": 7,
				"rate": 80
			},
			{
				"weather": 190,
				"rate": 95
			},
			{
				"weather": 191,
				"rate": 100
			}
		]
	},
	169: {
		"id": 169,
		"rates": [
			{
				"weather": 148,
				"rate": 15
			},
			{
				"weather": 2,
				"rate": 85
			},
			{
				"weather": 49,
				"rate": 100
			}
		]
	}
}
export const weatherCnIndex = ["", "碧空", "晴朗", "阴云", "薄雾", "微风", "强风", "小雨", "暴雨", "打雷", "雷雨", "扬沙", "沙尘暴", "高温", "热浪", "小雪", "暴雪", "妖雾", "极光", "黑暗", "绝命", "阴云", "雷云", "暴风雨", "暴风雨", "阴沉", "热浪", "妖雾", "暴风", "烟雾", "晴朗", "晴朗", "晴朗", "晴朗", "晴朗", "极光", "辉核", "辉核", "辉核", "辉核", "滩云", "滩云", "滩云", "滩云", "神意", "神意", "神意", "神意", "神意", "灵风", "灵电", "烟武", "晴朗", "兽雷", "雷波", "兽雷", "神意", "打雷", "打雷", "", "神秘", "神秘", "小雨", "晴朗", "小雨", "晴朗", "邪天", "邪天", "晴朗", "平衡", "平衡", "时光", "时光", "时光", "鬼气", "鬼气", "鬼气", "次元", "次元", "次元", "豪雨", "豪雨", "极乐", "极乐", "龙威", "龙威", "豪雨", "迅雷", "打雷", "次元", "晴朗", "碧空", "白旋风", "白旋风", "白旋风", "幻想", "白旋风", "月夜", "月夜", "月夜", "月夜", "红月下", "朱炎", "朱炎", "朱炎", "晴朗", "晴朗", "晴朗", "晴朗", "烈焰", "海啸", "龙卷风", "地震", "青空", "青空", "青空", "乱灵流", "青空", "无尽光", "暴风", "末日", "末日", "妖梦", "妖梦", "妖梦", "光天", "光天", "末日", "末日", "无尽光", "烟雾", "末日", "晴朗", "灵烈火", "灵飘尘", "灵飞电", "灵罡风", "流星雨", "记忆乱流", "阴云", "阴云", "极光", "极光", "雷云", "火风暴", "幻海流", "", "决战", "月尘", "磁暴", "末日", "星灵", "星灵", "星灵", "星灵", "星灵", "虚拟", "万魔殿", "万魔殿", "万魔殿", "终极", "绝望", "神域", "神域", "神域", "神域", "神域", "神域", "神域", "神域", "邪天", "虚无", "虚无", "虚无", "次元", "次元", "次元", "万魔殿", "万魔殿", "诗想", "虚无", "阈限", "阈限", "虚拟", "虚拟", "虚拟", "虚拟", "记忆", "战云", "虚拟", "", "", "", "魔尘", "流星雨", "流星雨", "磁暴", "孢子雾"];
export function findRate(zone){
	let rateIndex =  locationZone.findWeather(zone);
	if(rateIndex){
		return weatherRate[rateIndex];
	}
	return null;
}
export function getIcon(name){
	if(weatherIndex.includes(name)){
		return '/images/skywatcher/'+name+'.webp';
	}
	if(weatherCnIndex.includes(name)){
		return getIcon(weatherIndex[weatherCnIndex.indexOf(name)]);
	}
	return null;
}