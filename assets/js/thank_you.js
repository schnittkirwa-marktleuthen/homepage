function fillMessages(event) {
  const urlParams = new URLSearchParams(window.location.search);
  const from = urlParams.get('from');

  var titleMessage = '';
  var message = '';

  if (!from) {
    window.location.href = '/';
    return;
  }

  if (from === 'supporter_request') {
    titleMessage = 'Vielen Dank für die Eintragung in unsere Unterstützerliste!';
    message =
      'Du bekommst in Kürze noch eine Email zur Bestätigung – bitte prüfe auch deinen Spam-Ordner falls du die Mail nicht finden kannst. Sobald die Anfrage bestätigt ist bist du dabei und erhältst ab dann Informationen und Termine zur Schnittkirwa Marktleuthen. Wir freuen uns auf dich!';
  } else if (from === 'contact_form') {
    titleMessage = 'Vielen Dank für deine Nachricht!';
    message =
      'Du bekommst in Kürze noch eine Email zur Bestätigung – bitte prüfe auch deinen Spam-Ordner falls du die Mail nicht finden kannst. Wir melden uns zeitnah bei dir.';
  }

  var titleNode = document.getElementById('thankYouMessageTitle');
  titleNode.innerText = titleMessage;

  var messageNode = document.getElementById('thankYouMessage');
  messageNode.innerText = message;
}

window.onload = fillMessages;
