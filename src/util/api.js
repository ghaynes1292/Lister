import pick from 'lodash/pick';

import { imdbFields } from './constants';

export const apiFetchSuggestions = (text) => {
  const lowerCase = text.toLowerCase()
  return new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    const url = `https://cors-anywhere.herokuapp.com/https://sg.media-imdb.com/suggests/${lowerCase.charAt(0)}/${lowerCase}.json`;
    // var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'json');
    // const config = { method: 'GET',
    //           headers: myHeaders,
    //            cache: 'default' };
    // const myRequest = new Request(url, config);
    // fetch(myRequest).then(function(response) {
    //   console.log('response here', response.body)
    //     return response.blob();
    // })
    // .then(function(response) {
    //   console.log('response', response)
    // })

    //fe67fb4d
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        resolve(JSON.parse(this.responseText.slice(6 + text.length, -1)))
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  });
}

export const fetchCompleteListItemApi = (id, attributes, listId) => {
  console.log(id, attributes, listId)
  return new Promise(resolve => {
    fetch(`http://www.omdbapi.com/?i=${attributes.id}&apikey=fe67fb4d`).then((resp) => {
      return resp.json()
    }).then((something) => {
      console.log('hi', something)
      const newItem = {
        id,
        listId,
        attributes: {
          ...attributes,
          ...pick(something, imdbFields)
        }
      }
      resolve(newItem)
    })
  })
}
