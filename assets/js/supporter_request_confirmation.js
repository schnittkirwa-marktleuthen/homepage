function fillMessages(event) {
  const urlParams = new URLSearchParams(window.location.search);
  const activationCode = urlParams.get('activationCode');

  var titleMessage = '';
  var message = '';

  var titleNode = document.getElementById('confirmationMessageTitle');
  var messageNode = document.getElementById('confirmationMessage');

  if (!activationCode) {
    window.location.href = '/';
    return;
  } else {
    titleMessage = 'Deine Anfrage wird bestätigt';
    message = 'Das kann einige Sekunden dauern, kleinen Moment bitte.';
  }
  titleNode.innerText = titleMessage;
  messageNode.innerText = message;

  fetch('https://europe-west3-schnittkirwa-ev-api.cloudfunctions.net/api/supporter-request-confirmation', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: activationCode }),
  })
    .then((res) => {
      if (res.status === 400) {
        titleMessage = 'Ein Fehler ist aufgetreten';
        message =
          'Bitte versuche es erneut dich als Unterstützer einzutragen und die Anfrage mit dem Button in der Email zu bestätigen. Wenn dieser Fehler weiterhin auftritt nutze bitte das Kontaktformular auf der Homepage oder sende uns direkt eine Email.';
      } else if (res.status === 403) {
        if (res.body === 'TokenExpiredError') {
          titleMessage = 'Dieser Code ist abgelaufen';
        } else if (
          res.body === 'JsonWebTokenError' ||
          res.body === 'INVALID_JWT_PAYLOAD' ||
          res.body === 'INVALID_JWT_CODE_TYPE'
        ) {
          titleMessage = 'Dieser Code ist ungültig';
        } else {
          titleMessage = 'Ein Fehler ist aufgetreten';
        }
        message =
          'Bitte versuche es erneut dich als Unterstützer einzutragen und die Anfrage mit dem Button in der Email zu bestätigen. Wenn dieser Fehler weiterhin auftritt nutze bitte das Kontaktformular auf der Homepage oder sende uns direkt eine Email.';
      } else if (res.status === 200) {
        titleMessage = 'Das hat geklappt!';
        message =
          'Wir haben dich erfolgreich als Unterstützer eingetragen. Sobald es etwas wissenswertes zum Planungsstand, Termine oder andere Infos gibt kontaktieren wir dich per Mail. Vielen Dank für deine Hilfe!';
      }
    })
    .catch((rejection) => {
      console.error(rejection);
    })
    .finally(() => {
      titleNode.innerText = titleMessage;
      messageNode.innerText = message;
      var progressWrapperNode = document.getElementById('progress-wrapper');
      progressWrapperNode.style.display = 'none';

      var confirmationMessageWrapperNode = document.getElementById('confirmation-message-wrapper');
      confirmationMessageWrapperNode.ariaBusy = false;
    });
}

window.onload = fillMessages;
