const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

const verifyAuthentication = (req, res, next) => {
  try {
    const user = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    )
    req.user = user
    next()
  } catch (error) {
    res.json({
      status: "ERROR",
      message: "Authentication failed. Please log in to continue.",
    })
  }
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// const products = [
//   {
//     name: "SONY WF-C700N",
//     title:
//       "SONY WF-C700N Lightest TWS ANC 20Hr battery, In-Ear, 10 Min Quick Charge,Multi-Point Bluetooth Headset  (Sage Green, True Wireless)",
//     price: 12990,
//     type: "EARBUDS",
//     company: "SONY",
//     color: "GREEN",
//     rating: 4.3,
//     ratingCount: 8,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/b/q/k/-original-imagrufzqwuctzv9.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/h/7/w/-original-imagrufzekxszu4n.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/b/a/h/-original-imagrufzhamaq2je.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/v/t/e/-original-imagrufzrquz5kz7.jpeg?q=70",
//     ],
//     description: `Lightest Earbuds: These small, lightweight headphones have an ergonomic surface design for all-day comfort, even for smaller ears.
//     Noise Cancellation: Cancel-out background noise with Noise Sensor Technology or use the Ambient Sound Mode to stay connected to your natural surroundings. Wind Noise Reduction Structure the WF-C700N delivers your voice clearly, even on a windy day.
//     Multipoint connection: WF-C700N can be paired with two Bluetooth devices at the same time. So when call comes in your headphones know which device is ringing & connects to the right one automatically.
//     Fast Charging: Enjoy up to 15hours of listening thanks to the handy charging case.10-minute quick charging gives you up to an hour of extra play time.
//     Stable, reliable Bluetooth connectivity: A Bluetooth chip, which transmits sound to the left & right ears simultaneously, with optimized antenna design, stable connection
//     High quality: The Digital Sound Enhancement Engine (DSEE) gives your music with authentic vocals & powerful bass.`,
//   },
//   {
//     name: "APPLE AirPods Pro",
//     title: `APPLE AirPods Pro (2nd generation) Bluetooth Headset  (White, True Wireless)`,
//     price: 19990,
//     type: "EARBUDS",
//     company: "APPLE",
//     color: "WHITE",
//     rating: 4.5,
//     ratingCount: 58327,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://rukminim2.flixcart.com/image/416/416/kpinwy80/headphone/r/1/q/mwp22hn-a-apple-original-imag3qe9eqkfhmg8.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/kpinwy80/headphone/x/3/h/mwp22hn-a-apple-original-imag3qe9s9gsh7ng.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/kpinwy80/headphone/q/7/g/mwp22hn-a-apple-original-imag3qe9gs3bvvc7.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/kpinwy80/headphone/7/p/1/mwp22hn-a-apple-original-imag3qe9zhzbykzy.jpeg?q=70",
//     ],
//     description: `With Mic:Yes
//     Connector type: No
//     Bluetooth version: v5.0
//     Active Noise Cancellation for immersive sound
//     More than 24 hours of total listening time with the MagSafe Charging Case
//     Transparency mode for hearing and interacting with the world around you
//     Spatial audio with dynamic head tracking for theater-like sound that surrounds you
//     Adaptive EQ automatically tunes music to the shape of your ear
//     Three sizes of soft, tapered silicone tips for a customizable fit | Sweat and water resistant`,
//   },
//   {
//     name: "realme Buds Air 5",
//     title: `realme Buds Air 5 Pro with 50dB ANC, 360 Spatial Audio and upto 40 hours Playback Bluetooth Headset  (Astral Black, True Wireless)`,
//     price: 4999,
//     type: "EARBUDS",
//     company: "REALME",
//     color: "BLACK",
//     rating: 4.4,
//     ratingCount: 1224,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/z/n/n/-original-imagsjzc93u5eskr.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/i/4/m/-original-imagsjzcrxtugzbf.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/j/e/o/-original-imagsjzcxmgfd7hr.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/k/e/o/-original-imagsjzcfjqvncwr.jpeg?q=70",
//     ],
//     description: `realBoost Coaxial Dual Drivers (11mm bass driver + 6mm micro-planar tweeter)
// 50dB ANC with 360 Spatial Audio Effect | LDAC HD Audio | Hi-Res Certified
// Upto 40 Hours Battery Life | Fast-charging support of 10 min charging for 7 hours playback
// 6 mic Noise Cancellation | Dual device Connection with Google Fast Pairing
// 40ms ultra-low latency | Bluetooth 5.3 | IPX5 Water Resistant | realme Link App Connectivity`,
//   },
//   {
//     name: "SONY WF-C700N",
//     title: `SONY WF-C700N Lightest TWS ANC 20Hr battery, In-Ear, 10 Min Quick Charge,Multi-Point Bluetooth Headset  (Black, True Wireless)`,
//     price: 4999,
//     type: "EARBUDS",
//     company: "SONY",
//     color: "BLACK",
//     rating: 4.3,
//     ratingCount: 8,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/z/0/v/-original-imagrufzy5mev7kt.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/y/n/q/-original-imagrufzwpphggpp.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/m/8/s/-original-imagrufztuk5fher.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/i/c/g/-original-imagrufzwxt8gzeg.jpeg?q=70",
//     ],
//     description: `Lightest Earbuds: These small, lightweight headphones have an ergonomic surface design for all-day comfort, even for smaller ears.
//     Noise Cancellation: Cancel-out background noise with Noise Sensor Technology or use the Ambient Sound Mode to stay connected to your natural surroundings. Wind Noise Reduction Structure the WF-C700N delivers your voice clearly, even on a windy day.
//     Multipoint connection: WF-C700N can be paired with two Bluetooth devices at the same time. So when call comes in your headphones know which device is ringing & connects to the right one automatically.
//     Fast Charging: Enjoy up to 15hours of listening thanks to the handy charging case.10-minute quick charging gives you up to an hour of extra play time.
//     Stable, reliable Bluetooth connectivity: A Bluetooth chip, which transmits sound to the left & right ears simultaneously, with optimized antenna design, stable connection
//     High quality: The Digital Sound Enhancement Engine (DSEE) gives your music with authentic vocals & powerful bass.`,
//   },
//   {
//     name: "SONY WF-C500",
//     title: `SONY WF-C500 IPX4/20Hrs Battery Life Bluetooth Headset  (Black, True Wireless)`,
//     price: 4499,
//     type: "EARBUDS",
//     company: "SONY",
//     color: "BLACK",
//     rating: 4.1,
//     ratingCount: 6685,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://rukminim2.flixcart.com/image/416/416/ky7lci80/headphone/c/j/q/wf-c500-bz-in-sony-original-imagahvreyx7heq7.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/ky7lci80/headphone/h/5/q/wf-c500-bz-in-sony-original-imagahvrr9kgaxat.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/ky7lci80/headphone/y/0/b/wf-c500-bz-in-sony-original-imagahvrh4tzugwh.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/ky7lci80/headphone/3/x/c/wf-c500-bz-in-sony-original-imagahvrnxuxndya.jpeg?q=70",
//     ],
//     description: `You can enjoy listening to your favourite tracks with the Sony WF-C500 Truly Wireless In-ear Earbuds. Thanks to their convenient charging case, these earbuds provide up to 20 hours of playback time. Additionally, if you're in a rush and need to charge your earbuds quickly, you can get up to an hour of extra playback time with 10 minutes of charging. They feature a compact design that fits snugly and securely in your ears. Moreover, these round-shaped earbuds have no sharp edges, making them comfortable to wear.
//     Courtesy of their practical charging case, these earbuds offer you up to 20 hours of playback time. In addition, if you're in a hurry and need to juice up your earbuds quickly, you can do so in as little as 10 minutes to get up to an hour of additional playback time.    `,
//   },
//   {
//     name: "JBL Tune 230NC TWS",
//     title: `JBL Tune 230NC TWS, Active Noise Cancellation, 40Hr Playtime, JBL App & Speed Charge Bluetooth Headset  (Black, True Wireless)`,
//     price: 5499,
//     type: "EARBUDS",
//     company: "JBL",
//     color: "BLUE",
//     rating: 4.5,
//     ratingCount: 4339,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://rukminim2.flixcart.com/image/416/416/l2jcccw0/headphone/o/q/b/-original-imagduyfhj8ggwsq.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/l2jcccw0/headphone/2/r/p/-original-imagduyf7dumayzk.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/l2tcfbk0/headphone/0/f/j/-original-image2vgsvewwg8b.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/l2jcccw0/headphone/e/3/k/-original-imagduyfmzzmhred.jpeg?q=70",
//     ],
//     description: `
//     Grove into your favourite music without any inhibitions and vibe at your own space with the impressive JBL Tune 230NC TWS that is designed to set your mood ablaze with its futuristic design. These Bluetooth headphones come with 2 microphones technology that seamlessly eliminates potential noise allowing you to enjoy your favourite music. Moreover, the JBL Headphones App empowers you to customise your audio experience, locate your headphones, and find peace within. Furthermore, the JBL Tune 230NC TWS boasts a mighty battery life that lasts up to 40 hours and lets you enjoy uninterrupted music. Additionally, these headphones sport an innovative TalkThru feature that enables you to talk to your friends without having to remove the earpieces.`,
//   },
//   {
//     name: "boAt Airdopes 161",
//     title: `boAt Airdopes 161 with 40 Hours Playback, ASAP Charge & 10mm Drivers Bluetooth Headset  (Pebble Black, True Wireless)`,
//     price: 1099,
//     type: "EARBUDS",
//     company: "BOAT",
//     color: "GREEN",
//     rating: 4,
//     ratingCount: 5446,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/i/o/h/-original-imags36kchxetkkk.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/s/u/w/-original-imags36kpmgu9upu.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/6/a/g/-original-imags36k8uwkw3nq.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/7/u/y/-original-imags36kqgys6fg7.jpeg?q=70",
//     ],
//     description: `It's time to Do Your Groove, with Airdopes 161 TWS earbuds. The 10mm drivers in the earbuds are there to deliver an immersive listening time. It comes equipped with Bluetooth v5.1 wireless technology so that you can enjoy all of your sessions lag-free. The IWP tech enabled TWS earbuds power on as soon as the case lid gets opened. Moreover, the ASAP Charge tech helps the earbuds to gather up to 180Min of playtime in only 10 minutes of charging. Airdopes 161 provides a total playback time of up to 40HRS including up to 5.5HRS of playtime per earbud. With an IPX5 marked water resistant build, the earbuds offer flexibility whether you are at the gym or traversing those far terrains. You can command playback, hands-free and activate voice assistant with ease via the instant response touch controls. Now, stay indulged in your playlists and enjoy a truly immersive auditory experience on Airdopes 161.`,
//   },
//   {
//     name: "SONY XB55AP",
//     title: `SONY XB55AP Wired Headset  (Blue, In the Ear)`,
//     price: 2099,
//     type: "EARPHONE",
//     company: "SONY",
//     color: "BLUE",
//     rating: 4.4,
//     ratingCount: 22276,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://rukminim2.flixcart.com/image/416/416/jdj4k280/headphone/h/3/p/sony-mdr-xb55ap-original-imaf2exaczs9hxr4.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/j4d1ua80/headset/h/3/p/sony-mdr-xb55ap-original-imaevah7myygex8y.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/j4d1ua80/headset/h/3/p/sony-mdr-xb55ap-original-imaevah7wfbmxgvf.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/j4d1ua80/headset/h/3/p/sony-mdr-xb55ap-original-imaevah7b2gby32e.jpeg?q=70",
//     ],
//     description: `Are you a music aficionado? Take your love for music to a whole new level with the Sony MDR-XB55AP in-ear headphones. Wherever you are, never miss important calls, thanks to the Inline Remote and Mic. Its cable features a serrated design to keep your headphones tangle-free. The 12mm drivers minimize sound distortion to deliver crisp and powerful audio.The specially designed 12 mm drivers feature a compact, lightweight design with a high sensitivity of 112 dB/mW. They deliver powerful sound by minimizing distortion even at high volumes.The Inline remote and mic let you enjoy hands-free calls. You can also switch tracks without having to touch your smartphone.
//     `,
//   },
//   {
//     name: "JBL Endurance Run 2",
//     title: `JBL Endurance Run 2 with Fliphook & TwistLock Technology, Pure Bass, IPX5 Sweatproof Wired Headset  (Blue, In the Ear)`,
//     price: 1199,
//     type: "EARPHONE",
//     company: "JBL",
//     color: "BLUE",
//     rating: 4.1,
//     ratingCount: 1090,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/a/w/3/-original-imaghc99ae5ajfkm.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/k/c/2/-original-imaghc99kw9j5dpp.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/u/v/m/-original-imaghc99rhfmyhjg.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/p/2/d/-original-imaghc997g2xkxyd.jpeg?q=70",
//     ],
//     description: `String`,
//   },
//   {
//     name: "boAt BassHeads 220",
//     title: `boAt BassHeads 220 Wired Headset  (Black, In the Ear)`,
//     price: 699,
//     type: "EARPHONE",
//     company: "BOAT",
//     color: "BLACK",
//     rating: 4.2,
//     ratingCount: 8943,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://rukminim2.flixcart.com/image/416/416/kbgu1e80/headphone/t/8/5/bassheads-228-boat-original-imafstfzcequfxnt.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/kingqkw0-0/headphone/h/y/w/bassheads-220-bassheads-200-boat-original-imafyefkjy7pczpx.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/kingqkw0-0/headphone/n/b/x/bassheads-220-bassheads-200-boat-original-imafyefk8qzqkxfz.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/kingqkw0-0/headphone/x/m/r/bassheads-220-bassheads-200-boat-original-imafyefkd9edgftm.jpeg?q=70",
//     ],
//     description: `Sport these attractive earphones from boAt and let great-sounding music keep you company. Groove to your playlist, thanks to these earphones that deliver powerful bass. With tangle-free cables, you can save yourself from the hassle of detangling. Moreover, the built-in mic provides a handsfree experience. Groove to your favourite songs with this pair of in-ear wired earphones that delivers powerful bass and an immersive aural experience. For a hassle-free experience, bring home these earphones with tangle-free cables.`,
//   },
//   {
//     name: "realme Buds 2",
//     title: `realme Buds 2 Wired Headset  (Green, In the Ear)`,
//     price: 599,
//     type: "EARPHONE",
//     company: "REALME",
//     color: "GREEN",
//     rating: 2.5,
//     ratingCount: 4584,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://rukminim2.flixcart.com/image/416/416/k3g73bk0/headphone/3/b/z/realme-buds-2-original-imafmkr2z5huapjr.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/k3g73bk0/headphone/3/b/z/realme-buds-2-original-imafmkr2e2hrzvub.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/k3g73bk0/headphone/3/b/z/realme-buds-2-original-imafmkr2fajhmqhh.jpeg?q=70",
//       "https://rukminim2.flixcart.com/image/416/416/k3g73bk0/headphone/3/b/z/realme-buds-2-original-imafmkr2u5jpzuqb.jpeg?q=70",
//     ],
//     description: `Enhance your aural experience with this pair of REALME in-the-ear headphones. Thanks to its 9 mm Neodymium Drivers and 8 Hz–22 kHz Frequency Range, these headphones ensure powerful and balanced sound.

//     In-line Mic for Hands-free Calling
//     Featuring an In-line Mic, this pair of Sony wired headphones allows you to easily switch from listening to music to answering your calls. It also works vice-versa as it allows you to end your call and then switch back to your music.

//     9 mm Neodymium Drivers for Powerful, Balanced Sound
//     Thanks to this pair of headphones’ 9 mm Neodymium Drivers, you can enjoy crystal clear sound with a defined midrange clarity and a thumping bass.

//     Smart-key App
//     REALME Smart-key App is here to simplify your aural experience. The app allows you to configure and customize the functioning of your mic button to your convenience, such as setting your mic button to control volume levels or change tracks. All you have to do is download and install the app on to your smartphone. The app is compatible with Android 4.0 and above.`,
//   },
//   {
//     name: "boAt Rockerz 330 Pro",
//     title: `boAt Rockerz 330 Pro in-Ear Bluetooth Neckband with 60HRS Playtime, ASAP Charge, ENx Tech, Signature Sound, BT v5.2, Dual Pairing, IPX5, with Mic (Active Black)
//     `,
//     price: 1599,
//     type: "EARPHONE",
//     company: "BOAT",
//     color: "BLACK",
//     rating: 3.9,
//     ratingCount: 32657,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://m.media-amazon.com/images/I/512ek05dr+L._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/61xnCuXQzbL._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/81nOPh3YPEL._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/71AJVn0qapL._SX522_.jpg",
//     ],
//     description: `Rockerz 330 Pro offers a massive playback time of up 60HRS on a single full charge
//     This neckband has our ENx technology that helps to capture your voice without background glitches and lets you be heard crystal clear over voice calls
//     With our ASAP Charge tech, the neckband can gather up to 20HRS of playtime in just 10Min of charge, Charging Time About 1 hour
//     Our boAt Signature sound shines through whenever you want to get indulged in your cherished playlists courtesy the 10mm drivers
//     The ergonomically designed neckband has magnetic earbuds that support easy storage and carry when not in use
//     You can listen to your favourite tracks in a carefree manner, courtesy the protection offered by its IPX5 marked water resistance
//     You can enjoy the advantage of dual pairing by having the neckband stay connected to two devices simultaneously, for eg: phone and laptop.
//     1 year warranty from the date of purchase.`,
//   },
//   {
//     name: "JBL C100SI",
//     title: `JBL C100SI Wired In Ear Headphones with Mic, JBL Pure Bass Sound, One Button Multi-function Remote, Angled Buds for Comfort fit (Black)
//     `,
//     price: 599,
//     type: "EARPHONE",
//     company: "JBL",
//     color: "BLACK",
//     rating: 4.1,
//     ratingCount: 200965,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://m.media-amazon.com/images/I/51Q8DUDT2eL._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/91kcPKEG-NL._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/91D78FlIBIL._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/81n1wy0yAwL._SX522_.jpg",
//     ],
//     description: `JBL Signature Sound
//     Lightweight and Comfortable : The 3 sizes of ear tips (S,M,L) that are included allow you to choose a size that gives you the most comfortable listening experience even for longer listening periods
//     1 year manufacturer’s warranty. Cable Length: 1.2M
//     JBL Signature Sound. Frequency range:20-20kHz,Driver sensitivity:100±3dBSPL, 1mW,Maximum SPL:5mW
//     Extra Deep Bass. Troubleshooting steps : Kindly ensure 3.5mm port on Host device is clean and dust free and 3.5mm jack of the earphone is adequately inserted inside the input device port
//     Noise Cancelling Microphone
//     One-Button Universal Remote with Mic`,
//   },
//   {
//     name: "boAt Rockerz 450",
//     title: `boAt Rockerz 450 Bluetooth On Ear Headphones with Mic, Upto 15 Hours Playback, 40MM Drivers, Padded Ear Cushions, Integrated Controls and Dual Modes(Soldier Blue)
//     `,
//     price: 1599,
//     type: "HEADPHONES",
//     company: "BOAT",
//     color: "BLUE",
//     rating: 4.1,
//     ratingCount: 104206,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://m.media-amazon.com/images/I/71rBTaUbo1L._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/713RVwAa4ML._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/619UkSZyEFL._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/61J1QZaAceL._SX522_.jpg",
//     ],
//     description: `Its 40mm dynamic drivers help pump out immersive HD audio all day long
//     It provides a massive battery backup of upto 15 hours for a superior playback time.
//     It has been ergonomically designed and structured as an on-ear headphone to provide the best user experience with its comfortable padded earcushions and lightweight design
//     You can control your music without hiccups using the easy access controls, communicate seamlessly using the built-in mic, access voice assistant and always stay in the zone
//     Tap into instant wireless connectivity with optimum Bluetooth V4.2 connectivity
//     One can connect to boAt Rockerz 450 via not one but two modes, Bluetooth as well as AUX
//     1 year warranty from the date of purchase.`,
//   },
//   {
//     name: "STRING",
//     title: `boAt Rockerz 551ANC Hybrid Active Noise Cancellation Headphones with Up to 100H Playtime, ASAP™ Charge, Ambient Sound Mode &Dual EQ Modes, ENx™ Technology(Stellar Black)
//     `,
//     price: 2999,
//     type: "HEADPHONES",
//     company: "BOAT",
//     color: "BLACK",
//     rating: 4.1,
//     ratingCount: 60478,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://m.media-amazon.com/images/I/61+VJT8U-LL._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/71Gwx8zlgBL._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/61Tm5PRIH8L._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/610Otdvfc2L._SX522_.jpg",
//     ],
//     description: `Hybrid ANC- Say adios to the chaos with Active Noise Cancellation feature and elevate the vibe to a whole new level of pleasure with Rockerz 551ANC, delivering up to 35dB Hybrid ANC.
//     Playback-Stay connected to your playlist for mammoth durations, every day with up to 70 hours of playtime in ANC mode and up to 100 hours in normal playback mode.
//     ASAP Charge-This headphone comes equipped with our ASAP Charge technology that helps it garner 10 hours of playtime in just 10 min of charge.
//     Drivers-Exhilarate your senses with crystal clear sound reproduction via 40mm drivers, delivering you the boAt immersive experience.
//     Ambient Mode-It comes equipped with Ambient Sound Mode that lets the listener stay aware of the sounds in the ambience even while the playback is on.
//     Ergonomic Design-Max out each session with raw bliss that is offered by its ergonomically crafted over-ear design and adaptive, luxurious earcups.
//     Controls-It’s easy to access controls helps you in controlling playback, wake up default voice assistant and attend calls with ease.`,
//   },
//   {
//     name: "Sony WH-1000XM4",
//     title: `Sony WH-1000XM4 Industry Leading Wireless Noise Cancellation Bluetooth Over Ear Headphones with Mic for Phone Calls, 30 Hours Battery Life, Quick Charge, AUX,Touch Control and Alexa Voice Control-Blue
//     `,
//     price: 22990,
//     type: "HEADPHONES",
//     company: "SONY",
//     color: "BLUE",
//     rating: 4.6,
//     ratingCount: 47661,
//     isFeatured: true,
//     isAvailable: true,
//     images: [
//       "https://m.media-amazon.com/images/I/61YHhQzV+KL._SY741_.jpg",
//       "https://m.media-amazon.com/images/I/71j4AMBqdjS._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/81LRaIY24kS._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/71sc7-yQnkS._SX522_.jpg",
//     ],
//     description: `Digital noise cancelling: Industry leading Active Noise Cancellation (ANC) lends a personalized, virtually soundproof experience at any situation
//     Voice assistant: Alexa, Google Assistant & Siri enabled (In-built) for voice access to music, information and more. Activate with a simple touch
//     Speak-to-chat: Headphones use an array of smart technologies to create a seamless, hands-free listening experience. For eg, simply start speaking to automatically pause your music in Speak-to-Chat
//     Wearing Detection: Proximity sensor and two acceleration sensors in your headphones can detect whether you're wearing them or not, then adapt playback accordingly to help save battery power
//     Quick attention mode: Cover the right ear cup with your palm to turn down music for instant, easy conversation
//     Smart listening: WH-1000XM4 adjusts the ambient sound to your activity to give you the best noise cancellation
//     Long battery life/Quick Charge: A single charge provides up to 30 hrs of playtime for reliable all day listening and Quick charge for 10min charge for 5 hours play back`,
//   },
//   {
//     name: "JBL Tune 720BT",
//     title: `JBL Tune 720BT Wireless Over Ear Headphones with Mic, Pure Bass Sound, Upto 76 Hrs Playtime, Speedcharge, Dual Pairing, Customizable Bass with Headphones App, Lightweight, Bluetooth 5.3 (White)`,
//     price: 5290,
//     type: "HEADPHONES",
//     company: "JBL",
//     color: "WHITE",
//     rating: 4.4,
//     ratingCount: 918,
//     isFeatured: false,
//     isAvailable: true,
//     images: [
//       "https://m.media-amazon.com/images/I/51yZ8IGYlPL._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/71yDzd4ICuL._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/71bNVlJp6qL._SX522_.jpg",
//       "https://m.media-amazon.com/images/I/81jgapDRpTL._SX522_.jpg",
//     ],
//     description: `Adaptive Noise Cancelling with Smart Ambient :Adaptive Noise Cancelling means zero distractions when it’s time to focus on your studies—or get your groove on. And if you want to hear the world around you without removing your headphones, Ambient Aware and Talk Thru sharpen the sounds of your surroundings or voices. Easily activate these Ambient Sound Control modes through the JBL Headphones app
//     Bluetooth 5.3 with LE Audio (*) Wirelessly stream high-quality JBL Pure Bass Sound from your smartphone with the help of the latest Bluetooth technology. Optimize the Bluetooth performance with the Smart Audio & Video feature in the JBL Headphones app by selecting the Audio (for the best sound quality) or the Video (for an optimal gaming and video output) modes.
//     JBL Pure Bass Sound:JBL Tune 770NC headphones feature the renowned JBL Pure Bass sound—the same that powers the most famous music venues all around the world.
//     Customize your listening experience. Download the free JBL Headphones App to tailor the sound to your taste by choosing one of the pre-set EQ modes or adjusting the EQ curve according to your content, your style, your taste. Voice Prompts in your language guide you through the Tune 770NC’s other features
//     Hands-free calls with Voice aware :Easily control your sound and manage your calls from your headphones with the convenient buttons on the ear-cup. Hear your voice while you’re talking, with the help of Voice aware`,
//   },
// ]

// const descriptionArray = [
//   `It's lightest Wireless Noise-cancelling headband ever thats suitable for everyone.`,
//   `Up to 50-hour battery life with quick charging (3 min charge for up to 1 hour of playback).`,
//   `Multi-Point Connection helps to pair with two Bluetooth devices at the same time.`,
//   `Take noise cancelling to the next level with Integrated Processor V1,so you can fully immerse yourself in the music.`,
//   `Super comfortable and lightweight design ( 192 Grams ).`,
//   `High sound quality and well-balanced sound tuning.`,
// ]

const User = mongoose.model("User", {
  name: String,
  email: String,
  mobile: String,
  password: String,
})

const Product = mongoose.model("Product", {
  name: String,
  title: String,
  tagline: String,
  price: Number,
  type: String,
  company: String,
  color: String,
  description: Array,
  rating: Number,
  ratingCount: Number,
  isFeatured: Boolean,
  isAvailable: Boolean,
  images: Array,
})

const UserCartItem = mongoose.model("UserCartItem", {
  userId: String,
  cartItems: Array,
})

// Product.create(products)
// const getCategories = async () => {
//   try {
//     const uniqueColors = await Product.find().distinct("color")
//     console.log(uniqueColors)
//   } catch (error) {
//     console.log("error")
//   }
// }

// const resp = await Product.updateMany(
//   { rating: { $gt: 0 } },
//   {
//     description: [
//       `It's lightest Wireless Noise-cancelling headband ever thats suitable for everyone.`,
//       `Up to 50-hour battery life with quick charging (3 min charge for up to 1 hour of playback).`,
//       `Multi-Point Connection helps to pair with two Bluetooth devices at the same time.`,
//       `Take noise cancelling to the next level with Integrated Processor V1,so you can fully immerse yourself in the music.`,
//       `Super comfortable and lightweight design ( 192 Grams ).`,
//       `High sound quality and well-balanced sound tuning.`,
//     ],
//   }
// )

app.get("/api/products", async (req, res) => {
  // console.log(req.query)
  const {
    isAvailable,
    rating,
    company,
    color,
    type,
    price,
    title,
    search,
    sortBy,
  } = req.query

  // console.log(searchParams.get("company"))
  // console.log("the type")

  const displayConditions = {
    isAvailable,
    rating: { $gt: rating },
    price: { $gt: price.min, $lt: price.max },
  }

  if (company) displayConditions["company"] = company
  if (type) displayConditions["type"] = type
  if (color) displayConditions["color"] = color
  if (title) displayConditions["title"] = { $regex: new RegExp(title, "i") }

  // console.log(displayConditions)
  const collation = { locale: "en", strength: 2 }
  try {
    const products = await Product.find(displayConditions)
      .collation(collation)
      .sort(sortBy)
    const { name, price, color, type, title, images } = products
    const productsList = products.map((eachProduct) => ({
      id: eachProduct._id,
      name: eachProduct.name,
      price: eachProduct.price,
      color: eachProduct.color,
      type: eachProduct.type,
      title: eachProduct.title,
      featuredImage: eachProduct.images[0],
    }))
    // console.log(productsList)
    res.send(productsList)
  } catch (error) {
    console.log("The error is:", error)
    res.send({ status: "FAIL", error })
  }
})

app.get("/api/product/:id", async (req, res) => {
  const { id } = req.params
  try {
    const productDetails = await Product.findOne({ _id: id })
    res.send(productDetails)
  } catch (error) {
    res.send({ status: "FAIL", message: error })
  }
})

// {
//   id: "COMPANY",
//   displayText: "Company",
//   items: [
//     { id: "FEATURED", displayText: "Featured" },
//     { id: "PRICE_LOWEST", displayText: "Price : Lowest" },
//     { id: "PRICE_HIGHEST", displayText: "Price : Highest" },
//     { id: "NAME_AZ", displayText: "NAME : (A-Z)" },
//     { id: "NAME_ZA", displayText: "NAME : (Z-A)" },
//   ],
// },

app.get("/api/get-filter-options", async (req, res) => {
  try {
    const colors = await Product.collection.distinct("color")
    const types = await Product.collection.distinct("type")
    const companies = await Product.collection.distinct("company")
    const price = [
      "₹0 - ₹1,000",
      "₹1,000 - ₹5,000",
      "₹5,000 - ₹10,000",
      "₹10,000+",
    ]
    console.log({ types, companies, colors })

    res.send([
      {
        id: "type",
        displayText: "Category",
        items: types,
      },
      {
        id: "company",
        displayText: "Company",
        items: companies,
      },
      {
        id: "color",
        displayText: "Colour",
        items: colors,
      },
      {
        id: "price",
        displayText: "Price",
        items: price,
      },
    ])
    // res.send("Hello")
  } catch (error) {
    res.send({ status: "FAIL", error })
  }
})

// app.post("/api/add-cart-items", async (req, res) => {
//   try {
//     const { userId, productId } = req.body
//     // console.log("the req.body")
//     // console.log(req.body)
//     // console.log("The add to cart product id is")
//     const isUserExists = await UserCartItem.findOne({ userId: userId })
//     console.log({ isUserExists })
//     if (isUserExists) {
//       console.log("The user already exists", isUserExists._id)
//       const response = await UserCartItem.update(
//         { userId },
//         { $push: { cartItems: productId } }
//       )
//       console.log("the response is")
//       console.log({ response })
//     } else {
//       console.log("The user does not exists")
//       const response = await UserCartItem.create({
//         userId,
//         cartItems: productId,
//       })
//     }
//     res.send("The product added successfully")
//     // console.log({ isUserExists })
//   } catch (error) {
//     res.send(error)
//     // console.log(error)
//   }
// })

app.get("/api/get-cart-items", verifyAuthentication, async (req, res) => {
  const { userId } = req.query
  console.log(req.query)
  try {
    const { cartItems } = await UserCartItem.findOne({ userId })
    console.log(cartItems)
    const query = { _id: { $in: cartItems } }
    const products = await Product.find(query)
    const productsList = products.map((eachProduct) => ({
      id: eachProduct._id,
      name: eachProduct.name,
      price: eachProduct.price,
      color: eachProduct.color,
      type: eachProduct.type,
      isAvailable: eachProduct.isAvailable,
      featuredImage: eachProduct.images[0],
      quantity: 1,
    }))
    console.log({ productsList })
    res.send(productsList)
  } catch (error) {
    res.send(error)
  }
})

app.post("/api/add-cart-items", async (req, res) => {
  try {
    const { userId, productId } = req.body
    const isUserExists = await UserCartItem.findOne({ userId: userId })

    if (isUserExists) {
      await UserCartItem.updateOne(
        { userId },
        { $push: { cartItems: productId } }
      )
    } else {
      console.log("The user does not exist")
      await UserCartItem.create({
        userId,
        cartItems: [productId],
      })
    }

    res.send({ message: "Product added successfully" })
  } catch (error) {
    console.error(error)
    res.send({ error: "Internal server error" })
  }
})

app.post("/api/login", async (req, res) => {
  console.log(req.body)
  try {
    const { emailOrMobile, password } = req.body
    // console.log(emailOrMobile)
    const existingUser = await User.findOne({
      $or: [{ email: emailOrMobile?.toLowerCase() }, { mobile: emailOrMobile }],
    })
    console.log(existingUser)
    if (existingUser) {
      const existingHashedPassword = existingUser.password
      const isPasswordMatch = await bcrypt.compare(
        password,
        existingHashedPassword
      )
      if (isPasswordMatch) {
        const jwtToken = jwt.sign(
          { existingUser },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "15d",
          }
        )
        // res.header({ jwtToken })
        res.send({
          status: "SUCCESS",
          message: "Login Successful",
          data: { jwtToken, user: { id: existingUser._id } },
        })
      } else {
        throw "Incorrect password"
      }
      // console.log("The password match status is", isPasswordMatch)
    } else {
      console.log("Error thrown")
      throw "User not found"
    }
    console.log({ existingUser })
  } catch (error) {
    console.log({ error })
    res.status(400)
    res.send({
      status: "FAIL",
      message: error,
    })
  }
})

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body
    const doEmailAlreadyExists = await User.findOne({
      email: email.toLowerCase(),
    })
    if (doEmailAlreadyExists) {
      throw "Email already exists"
      return
    }
    const doMobileAlreadyExists = await User.findOne({ mobile })
    if (doMobileAlreadyExists) {
      throw "Mobile number already exists"
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
    const newUser = {
      name,
      email: email.toLowerCase(),
      mobile,
      password: hashedPassword,
    }
    const newUserDetails = await User.create(newUser)
    console.log(newUserDetails)
    const jwtToken = jwt.sign({ newUser }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    })
    // res.header({ jwtToken })
    res.status(201)
    res.send({
      status: "SUCCESS",
      message: "The Account has been created successfully",
      data: { jwtToken, user: { id: newUserDetails._id } },
    })
  } catch (error) {
    console.log(error)
    res.status(400)
    res.send({ status: "FAIL", message: error })
  }
})

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log(`The server is running at http://localhost:${process.env.PORT}`)
  } catch (error) {
    console.log(error)
  }
})
