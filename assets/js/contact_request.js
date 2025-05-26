function submitContactRequest(event) {
  event.preventDefault();
  const submitButtonNode = document.getElementById('contact-submit-btn');
  submitButtonNode.disabled = true;

  const progressBarNode = document.getElementById('progress-bar');
  progressBarNode.style.visibility = 'visible';

  var errorMessageNode = document.getElementById('contact-error-message');
  if (errorMessageNode) {
    document.removeChild(errorMessageNode);
  }

  var formData = new FormData(form);
  const formDataObj = Object.fromEntries(formData);
  const contactData = {
    name: formDataObj.name,
    email: formDataObj.email,
    message: formDataObj.message,
  };

  fetch('https://europe-west3-schnittkirwa-ev-api.cloudfunctions.net/api/contact', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  })
    .then((response) => {
      if (response.status === 200) {
        return response;
      }
      throw 'INVALID_RESPONSE';
    })
    .then(() => {
      window.location.href = '/thank-you.html?from=contact_form';
    })
    .catch(() => {
      errorMessageNode = document.createElement('small');
      errorMessageNode.style.color = 'red';
      errorMessageNode.id = 'contact-error-message';
      errorMessageNode.textContent =
        'Ein Fehler ist aufgetreten, bitte versuche es erneut oder schreib uns direkt eine Email an die angegebene Adresse.';

      progressBarNode.parentNode.parentNode.appendChild(errorMessageNode);
    })
    .finally(() => {
      submitButtonNode.disabled = false;
      progressBarNode.style.visibility = 'hidden';
    });
}

const form = document.getElementById('form');
form.addEventListener('submit', submitContactRequest);
