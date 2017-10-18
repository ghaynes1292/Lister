export const apiFetchSuggestions = (text) => {
  const lowerCase = text.toLowerCase()
  return new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    const url = `http://cors-proxy.htmldriven.com/?url=https://sg.media-imdb.com/suggests/${lowerCase.charAt(0)}/${lowerCase}.json`;

    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        response.success
          ? resolve(JSON.parse(response.body.slice(6 + text.length, -1)))
          : reject('error fetching the suggestions')
      }

    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  });
}
