async function lockedProfile() {
  let main = document.getElementById('main');

  let response = await fetch(`http://localhost:3030/jsonstore/advanced/profiles`);
  let data = await response.json();
  let i = 1;

  Object.keys(data).forEach(profile => {

    let divProfile = create('div', '', main);
    divProfile.className = 'profile';

    let img = create('img', '', divProfile);
    img.src = './iconProfile2.png';
    img.className = 'userIcon';

    let labelLock = create('label', 'Lock', divProfile);
    let inputLock = create('input', '', divProfile);
    inputLock.type = 'radio';
    inputLock.name = `user${i}Locked`;
    inputLock.value = 'lock';
    inputLock.checked = true;

    let labelUNLock = create('label', 'Unlock', divProfile);
    let inputUNLock = create('input', '', divProfile);
    inputUNLock.type = 'radio';
    inputUNLock.name = `user${i}Locked`;
    inputUNLock.value = 'unlock';

    let br = create('br', '', divProfile);
    let hr = create('hr', '', divProfile);

    let labelUsername = create('label', 'Username', divProfile);
    let inputUserName = create('input', '', divProfile);
    inputUserName.type = 'text';
    inputUserName.name = `user${i}Username`;
    inputUserName.value = `${data[profile].username}`;
    inputUserName.disabled = true;
    inputUserName.readOnly = true;

    let divHide = create('div', '', divProfile);
    divHide.id = `user${i}HiddenFields`;
    divHide.style.display = 'none';
    let hr1 = create('hr', '', divHide);

    let labelEmail = create('label', 'Email', divHide);
    let inputEmail = create('input', '', divHide);
    inputEmail.type = 'email';
    inputEmail.name = `user${i}Email`;
    inputEmail.value = `${data[profile].email}`;
    inputEmail.disabled = true;
    inputEmail.readOnly = true;

    let labelAge = create('label', 'Age', divHide);
    let inputAge = create('input', '', divHide);
    inputAge.type = 'text';
    inputAge.name = `user${i}Age`;
    inputAge.value = `${data[profile].age}`;
    inputAge.disabled = true;
    inputAge.readOnly = true;

    let button = create('button', 'Show more', divProfile);

    button.addEventListener('click', (e) => {
      let parent = e.target.parentNode;
      let div = parent.querySelector('div');

      let unlock = parent.querySelector('input:nth-of-type(2)');
      if (unlock.checked == true) {
        if (e.target.textContent == 'Show more') {
          e.target.textContent = 'Hide it';
          div.style.display = 'block';
        } else {
          e.target.textContent = 'Show more';
          div.style.display = 'none';
        }

      }
    });

    i++;
  })

  function create(type, content, parent) {
    let element = document.createElement(type);

    if (content) {
      element.textContent = content;
    }

    if (parent) {
      parent.appendChild(element)
    }

    return element;
  }
}