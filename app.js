// Работа с REST API: GET-запрос, отправка PUT-запроса и проверка результата его выполнения
let _html = {}
let _request = {}
let userId = 4013 // Пользователь с ID=8 - не существует, поэтому был выбран существующий в базе сайта
let _postObj = {
    id: userId, 
    name: 'Andreas Papandreu3',
    email: 'fake.mailbox7@fake-site.com',
    status: 'active'
  }

_html.buttons =
  '<h1>Work with REST API</h1><hr/>' +
  "<button id='getUserData'>GET User Data</button><br/><br/>" +
  "<button id='putUserData'>PUT User Data</button><br/><br/>" +
  "<div id='transaction-results'></div>"

function _appendDOM (_obj) {
  document.getElementsByTagName('body')[0].innerHTML = _obj
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('App js and DOM is ready!')
  _appendDOM(_html.buttons)

  document.getElementById('getUserData').addEventListener('click', function () {
    _request.getUserData()
  })
  document.getElementById('putUserData').addEventListener('click', function () {
    _request.putUserData()
  })
})

// Запрос информации о пользователе через REST
_request.getUserData = function () {
  // Пользователь с ID=8 - не существует, поэтому был выбран существующий в базе сайта, то есть: 4021
  fetch('https://gorest.co.in/public/v2/users/' + userId, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      authorization:
        'Bearer c811c9f73d5563a56be4227d60309b197ef7339bb94ac3eb5ddf3f8b3c206aab'
    }
  })
    .then(function (response) {
      return response.json()
    })
    .then(data => {
      // Вывод информации в консоль
      console.log('User (from gorest.co.in): ', data)
      // Вывод информации о пользователе в контейнер HTML-страницы
      document.getElementById('transaction-results').innerHTML =
        'Id=' +
        data.id +
        '<br>Name=' +
        data.name +
        '<br>Email=' +
        data.email +
        '<br>Status=' +
        data.status
      return data
    })
}

// Изменение информации о пользователе на сервере
_request.putUserData = function () {
  fetch('https://gorest.co.in/public/v2/users/' + userId, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      authorization:
        'Bearer c811c9f73d5563a56be4227d60309b197ef7339bb94ac3eb5ddf3f8b3c206aab'
    },
    body: JSON.stringify(_postObj)
  })
    .then(function (response) {
      return response.json()
    })
    .then(data => {
      console.log('Updated user details (from gorest.co.in): ', data)
      document.getElementById('transaction-results').innerHTML =
        'Id=' +
        data.id +
        '<br>Name=' +
        data.name +
        '<br>Email=' +
        data.email +
        '<br>Status=' +
        data.status

      // Проверяем результат изменения данных на удаленном сервере  
      if (
        _postObj.name == data.name &&
        _postObj.email == data.email &&
        _postObj.status == data.status
      ) {
        alert('SUCCESS!')
      }
    })
}
