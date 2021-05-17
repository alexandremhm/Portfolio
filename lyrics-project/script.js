
const btn = document.querySelector('.btn-lyrics');

btn.addEventListener('click', () => {
const artist = document.querySelector('.artist-input').value;
const musicTitle = document.querySelector('.music-input').value;
const lyrics = document.querySelector('.lyrics');

fetch(`https://api.lyrics.ovh/v1/${artist}/${musicTitle}`)
.then(response => response.json())
.then(response => lyrics.innerText = response.lyrics)

.catch(err => {
	console.error(err);

});
})


