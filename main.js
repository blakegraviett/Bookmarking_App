const body = document.body;
const input = document.querySelector('input[type=text]');
const overlay = document.querySelector('.overlay');

function showFloater() {
    body.classList.add('show-floater');
}

function closeFloater() {
    body.classList.remove('show-floater');
}


input.addEventListener('focus', showFloater);
// input.addEventListener('focusout', closeFloater);
overlay.addEventListener('click', closeFloater);

// ==============================================



const bookmarksList = document.querySelector('.bookmarks-list');
const bookmarkForm = document.querySelector('.bookmark-form');
const bookmarkInput = document.querySelector('input[type=text]');
const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
const apiUrl = 'https://opengraph.io/api/1.0/site';
const appID = '58858c7bcf07b61e64257391';

const myUrl = encodeURIComponent('https://github.com/blakegraviett');

fillBookmarksList(bookmarks);

function createBookmark(e) {
    e.preventDefault();

    const url = encodeURIComponent(bookmarkInput.value);
    fetch(apiUrl + '/' + url + '?app_id=' + appID)
    .then(response => response.json())
    .then(data => {
        const bookmark = {
            title: data.hybridGraph.title,
            image: data.hybridGraph.image,
            link: data.hybridGraph.url
        };


        bookmarks.push(bookmark)
        fillBookmarksList(bookmarks);
        storeBookmarks(bookmarks);
        bookmarkForm.reset();


});






    // const title = bookmarkInput.value;
    // const bookmark = document.createElement('a');
    // bookmark.className = 'bookmark';
    // bookmark.innerText = title;
    // bookmark.href = '#';
    // bookmark.target = '_blank';
    // bookmarksList.appendChild(bookmark);
}

function fillBookmarksList(bookmarks = []) {
    const bookmarksHtml = bookmarks.map((bookmark, i) => {
        return `
        <a href="${bookmark.link}" class="bookmark" data-id"${i}"> 
        <div class="img" style="background-image:url('${bookmark.image}")></div>
        <div class="title">${bookmark.title}</div>
        <span class="span-class">X</span>
        </a> 
        `;
    }).join('');
    
    
    bookmarksList.innerHTML = bookmarksHtml;
}

function storeBookmarks(bookmarks = []) {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}


function removeBookmark(e) {
    if (!e.target.matches('.span-class')){
        return;
    } 
    
    const index = e.target.parentNode.dataset.id;
    bookmarks.splice(index, 1);
    fillBookmarksList(bookmarks);
    storeBookmarks(bookmarks);
}

bookmarksList.addEventListener('click', removeBookmark);
bookmarkForm.addEventListener('submit', createBookmark);

