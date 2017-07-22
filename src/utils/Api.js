const BASE_PATH = 'http://localhost:8181/api/messages';

export default class Api {

  static fetchMessages() {
    return fetch(BASE_PATH).then(response => response.json());
  }

  static sendMessage(message) {
      let options = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(message),
      }

      return fetch(BASE_PATH, options).then((response) => response.json());
  }

  static patchRequest(body) {
    let options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
