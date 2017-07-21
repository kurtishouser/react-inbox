const BASE_PATH = 'http://localhost:8181/api/messages';

export default class Api {


  static fetchMessages() {
    return fetch(BASE_PATH).then(response => response.json());
  }

  static patchRequest(body) {
    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(body),
    };

    return fetch(BASE_PATH, options)
      .then((response) => {
        return response.status;
      })

  }
}

// static addItem(url, quantity) {
//   return fetch(url, {
//     method: 'POST',
//     body: JSON.stringify({ quantity }),
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     }
//   })
//   .then(response => response.json());
// }
