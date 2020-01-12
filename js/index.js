let images = document.querySelector('.images');
let selectedImage = document.querySelector('.image.selected');
let selectedImageInfo = document.querySelector('.image-info');
let spinner = document.querySelector('.spinner');

let pagesLoaded = 0;

selectedImage.onload = () => {
    spinner.classList.remove('show');
    selectedImage.classList.add('show');
}

const selectImage = (img) => {
    spinner.classList.add('show');
    selectedImage.classList.remove('show');
    const { download_url, author, width, height } = img;
    selectedImage.src = download_url;
    selectedImage.alt = `image by ${author}`;
    selectedImageInfo.innerHTML = `
    <div class='image-info'>
        ${author}, ${width}x${height}  
    <div>
    `;
}
const fetchImages = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(`Fetching ${pagesLoaded} page of images`);
            // Typical action to be performed when the document is ready:
            JSON.parse(xhttp.responseText).forEach(image => {
                let img = new Image();
                img.src = `https://picsum.photos/id/${image.id}/200/`;
                img.classList.add('w-100', 'image')
                img.alt = `image by ${image.author}`;
                img.onclick = () => selectImage(image);

                images.appendChild(img);
            });

        }
    };
    xhttp.open("GET", `https://picsum.photos/v2/list?page=${++pagesLoaded}`, true);
    xhttp.send();
}
document.onload = fetchImages();
images.parentElement.addEventListener('scroll', (event) => {
    if (images.parentElement.scrollTop >= (images.parentElement.scrollHeight - images.parentElement.offsetHeight)) {
        fetchImages();
    }
})

