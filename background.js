
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./styles.css"]
        }).then(() => {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: DownloadMedia,
            })
        }).catch(err => console.log(err));
    }
});
function DownloadMedia() {
    var newelement = document.getElementById("lnkbtn");
    var loc = document.location.href;
    if (loc.includes("com/song") || loc.includes("com/video")) {
        if (newelement == null) {
            const lnkbtn = document.createElement('a');
            lnkbtn.id = 'lnkbtn';
            lnkbtn.classList.add('loader');
            var elem = document.querySelector('body');
            elem.appendChild(lnkbtn);

        } else {
            newelement.classList.remove("button9");
            newelement.classList.add('loader');
            newelement.innerHTML = '';
        }
        var element = document.getElementById("lnkbtn");
        var id = document.location.pathname.split("/").pop();
        var baseUrl = 'https://rj-deskcloud.com/api2/'
        var ext = '.mp3';
        if (loc.includes("com/song")) {
            baseUrl += 'mp3?id=';
        } else {
            baseUrl += 'video?id=';
            ext = '.mp4';
        }
        fetch(baseUrl + id, {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {

                var itemName = response.artist + ' - ' + response.song + ext;
                element.classList.remove("loader");
                element.classList.add('button9');
                element.innerHTML = 'Download';
                element.setAttribute("download", itemName);
                element.setAttribute("href", response.link);

            });
    } else {
        if (newelement != null) {
            newelement.remove();
        }
    }
}
