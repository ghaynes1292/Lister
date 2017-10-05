export const apiFetchSuggestions = (text) => {
  return new Promise(resolve => {
    const xmlhttp = new XMLHttpRequest();
    const url = `https://cors-anywhere.herokuapp.com/sg.media-imdb.com/suggests/${text.charAt(0)}/${text}.json`;

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(this.responseText.slice(6 + text.length, -1));
        resolve(response)
      }

    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  });
}