function submitContactRequest(event) {
  event.preventDefault();
  var submitButtonNode = document.getElementById('request-submit-btn');
  submitButtonNode.disabled = true;

  var progressBarNode = document.getElementById('progress-bar');
  progressBarNode.style.visibility = 'visible';

  var errorMessageNode = document.getElementById('supporter-request-error-message');
  if (errorMessageNode) {
    document.removeChild(errorMessageNode);
  }

  var formData = new FormData(form);
  const formDataObj = Object.fromEntries(formData);

  const supporterData = {
    name: formDataObj.name,
    email: formDataObj.email,
    tel: formDataObj.tel,
    message: formDataObj.message || null,
    areas: {
      aufbau: Boolean(formDataObj.aufbau),
      abbau: Boolean(formDataObj.abbau),
      bratwurststand: Boolean(formDataObj.bratwurststand),
      fisch_kaese: Boolean(formDataObj.fisch_kaese),
      schenke: Boolean(formDataObj.schenke),
      bar: Boolean(formDataObj.bar),
      kaffee_kuchen: Boolean(formDataObj.kaffee_kuchen),
      kleinarbeiten: Boolean(formDataObj.kleinarbeiten),
    },
  };

  fetch(
    'https://europe-west3-schnittkirwa-ev-api.cloudfunctions.net/api/supporter-request',
    {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supporterData),
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
      throw 'INVALID_RESPONSE';
    })
    .then((response) => response.json())
    .then((jsondata) => {
      if (jsondata.received) {
        window.location.href = '/thank-you.html?from=supporter_request';
      } else {
        throw '';
      }
    })
    .catch(() => {
      errorMessageNode = document.createElement('small');
      errorMessageNode.style.color = 'red';
      errorMessageNode.id = 'supporter-request-error-message';
      errorMessageNode.textContent = 'Ein Fehler ist aufgetreten, bitte versuche es erneut oder schreib uns direkt eine Email an die angegebene Adresse.'

      progressBarNode.parentNode.parentNode.appendChild(errorMessageNode);
    })
    .finally(() => {
      submitButtonNode.disabled = false;
      progressBarNode.style.visibility = 'hidden';
    });
}

const form = document.getElementById('form');
form.addEventListener('submit', submitContactRequest);
