const previousBtn = document.getElementById('previous_btn')
const nextBtn = document.getElementById('next_btn')
const muteBtn = document.getElementById('mute_btn')
const volumeSlider = document.getElementById('volume_slider')
const controlsCloseBtn = document.getElementById('controls_close_btn')
const displayTime = document.getElementById('disply_time')
const textArea = document.getElementById('text_area')
const askBtn = document.getElementById('ask_btn')
const prompt = document.getElementById('prompt')
const controls = document.querySelector('.controls')
const chat = document.querySelector('.chat')
const quoteTitle = document.getElementById('quote_title')
const quoteAuthor = document.getElementById('quote_author')
const quote = document.querySelector('.quote')

const options = { hour: '2-digit', minute: '2-digit', hour12: true }

var player
var formattedTime

const API_END_POINT = 'https://api.api-ninjas.com/v1/quotes?category=computers'
const API_NINJA_KEY = 'nFpk4KMStXivv7tNYRJw7Q==eiUt89EXrSw51eNf'

document.addEventListener('DOMContentLoaded', (e) => {
	axios
		.get(API_END_POINT, {
			headers: {
				'Content-Type': 'application/json',
				'X-Api-Key': API_NINJA_KEY
			}
		})
		.then((res) => {
			data = res.data[0]
			quote.textContent = '🔮 Daily Motivation'
			quoteTitle.textContent = `"${data.quote}"`
			quoteAuthor.textContent = `-${data.author}`
		})
})

function onYouTubeIframeAPIReady() {
	player = new YT.Player('yt_player', {
		playerVars: {
			controls: 0,
			disablekb: 1,
			loop: 1,
			rel: 1,
			showinfo: 0,
			modestbranding: 0,
			iv_load_policy: 3,
			playsinline: 1,
			enablejsapi: 1,
			widgetid: 1,
			autoplay: 1,
			mute: 1,
			listType: 'playlist',
			list: 'PLMsiU1RcUWyASbN2E5dNJtNOlnw6hzcsW'
		},

		events: {
			onReady: onPlayerReady
		}
	})
}

function onPlayerReady(event) {
	event.target.playVideo()
}

previousBtn.addEventListener('click', (e) => {
	player.previousVideo()
})

nextBtn.addEventListener('click', (e) => {
	player.nextVideo()
})

muteBtn.addEventListener('click', (e) => {
	if (player.isMuted()) {
		muteBtn.firstElementChild.classList.replace(
			'bi-volume-mute-fill',
			'bi-volume-up-fill'
		)

		volumeSlider.value = 50
		player.setVolume(50)
		player.unMute()
	} else {
		muteBtn.firstElementChild.classList.replace(
			'bi-volume-up-fill',
			'bi-volume-mute-fill'
		)

		volumeSlider.value = 0
		player.setVolume(0)
		player.mute()
	}
})

volumeSlider.addEventListener('change', (e) => {
	muteBtn.firstElementChild.classList.replace(
		'bi-volume-mute-fill',
		'bi-volume-up-fill'
	)

	volumeSlider.value = volumeSlider.value
	player.setVolume(volumeSlider.value)
	player.unMute()

	console.log(volumeSlider.value)
	if (volumeSlider.value == 1) {
		muteBtn.firstElementChild.classList.replace(
			'bi-volume-up-fill',
			'bi-volume-mute-fill'
		)

		volumeSlider.value = 0
		player.setVolume(0)
		player.mute()
	}
})

controlsCloseBtn.addEventListener('click', (e) => {
	state = controls.classList.toggle('controls-closed')

	if (state) {
		controlsCloseBtn.firstElementChild.classList.replace(
			'bi-caret-right-fill',
			'bi-caret-left-fill'
		)
	} else {
		controlsCloseBtn.firstElementChild.classList.replace(
			'bi-caret-left-fill',
			'bi-caret-right-fill'
		)
	}
})

askBtn.addEventListener('click', async (e) => {
	textArea.textContent = prompt.value ? prompt.value : 'Hello, How are you'
})
