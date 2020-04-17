function validateURL(url) {
    let urlRGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    if (urlRGEX.test(url)) {
        return
    } else {
        alert("Please enter a valid url");
    }
}

export { validateURL }