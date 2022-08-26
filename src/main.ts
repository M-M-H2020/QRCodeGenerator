import './style.css'

const form: HTMLFormElement = document.querySelector('#generate-form')!
const qr: HTMLDivElement = document.querySelector('#qrcode')!

const onGenerateSubmit = (e: Event) => {
	e.preventDefault()

	clearUI()
	const { value: url }: HTMLInputElement = document.querySelector('#url')!
	const { value: size }: HTMLSelectElement = document.querySelector('#size')!

	if (url.trim() === '') {
		alert('Please enter a URL')
	} else {
		showSpinner()

		setTimeout(() => {
			hideSpinner()
			generateQRCode(url, size)

			setTimeout(() => {
				const saveUrl = qr.querySelector('img')!
				createSaveBtn(saveUrl.src)
			}, 50)
		}, 1000)
	}
}

const generateQRCode = async (url: string, size: string) => {
	new QRCode('qrcode', {
		text: url,
		width: +size,
		height: +size,
	})
}

const showSpinner = () => {
	const spinner: HTMLDivElement = document.querySelector('#spinner')!
	spinner.setAttribute('class', 'block')
}
const hideSpinner = () => {
	const spinner: HTMLDivElement = document.querySelector('#spinner')!
	spinner.setAttribute('class', 'hidden')
}

const createSaveBtn = (saveUrl: string) => {
	const link = document.createElement('a')
	link.id = 'save-link'
	link.classList.add(
		'bg-red-500',
		'hover:bg-rose-700',
		'text-white',
		'font-bold',
		'py-2',
		'rounded',
		'w-1/3',
		'm-auto',
		'my-5'
	)

	link.href = saveUrl

	link.download = 'qrcode'
	link.innerHTML = 'Save Image'
	document.getElementById('generated')?.appendChild(link)
}
const clearUI = () => {
	qr.innerHTML = ''
	const saveLink = document.getElementById('save-link')
	if (saveLink) {
		saveLink.remove()
	}
}
form.addEventListener('submit', onGenerateSubmit)
