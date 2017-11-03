import pick from 'lodash/pick';
import without from 'lodash/without';
import find from 'lodash/find';

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
    //   console.log('response here', response.body)ya
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

export const fetchCompleteListItemApi = (id, attributes, listId, createdAt) => {
  const omdbRequest = new Promise(resolve => {
    fetch(`https://www.omdbapi.com/?i=${attributes.id}&apikey=fe67fb4d`).then((resp) => {
      return resp.json()
    }).then((something) => {
      const newItem = {
        id,
        listId,
        createdAt,
        attributes: {
          ...attributes,
          ...pick(something, imdbFields)
        }
      }
      resolve(newItem)
    })
  })

  const otherApiRequest = new Promise(resolve => {
    fetch(`https://www.theimdbapi.org/api/movie?movie_id=${attributes.id}`).then((resp) => {
      console.log('response to update', resp)
      return resp.json()
    }).then((response2) => {
      resolve(response2)
    })
  })
  return Promise.all([omdbRequest, otherApiRequest]).then((values) => {
    console.log('new values', values)
    const valueString = values[1].rating !== '' ? `${values[1].rating}/10 with ${values[1].rating_count} votes` : 'No Ratings Yet'
    const newItem = {
      ...values[0],
      attributes: {
        ...values[0].attributes,
        Ratings: [
          ...without(values[0].attributes.Ratings, find(values[0].attributes.Ratings, ['Source', 'Internet Movie Database'])),
          { Source: 'Internet Movie Database', Value: valueString }
        ],
        Runtime: values[1].length !== '' ? `${values[1].length} min` : values[0].Runtime
      }
    }
    return newItem
  })
}
