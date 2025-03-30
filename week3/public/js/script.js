//List of cards to display
const cardList = [
  {
    title: "SIT725 Repository",
    image: "images/project-1.png",
    link: "https://github.com/aniraj2020/SIT725",
    description: "This repo showcases my skills in HTML, CSS, JavaScript and Express. Weekly hands-on work will be committed to this repo and pushed regularly."
  }
];

//'Click Me' button handler
const clickMe = () => {
  alert("Thanks for clicking me. Hope you're enjoying the workshop!");
};

//Modal form submit handler
const submitForm = () => {
  const firstName = $('#first_name').val().trim();
  const lastName = $('#last_name').val().trim();
  const email = $('#email').val().trim();

  if (!firstName) {
    M.toast({ html: 'Please enter your first name.', classes: 'rounded red lighten-1 white-text' });
    return;
  }

  const formData = { first_name: firstName, last_name: lastName, email: email };
  console.log("Form Data Submitted:", formData);

  M.toast({
    html: `Thanks, ${firstName}! We'll be in touch.`,
    classes: 'rounded green lighten-1 white-text'
  });

  //close modal
  const modal = document.getElementById('modal1');
  const modalInstance = M.Modal.getInstance(modal);
  modalInstance.close();

  //clear the form
  $('#first_name, #last_name, #email').val('');
  M.updateTextFields();
};

// Dynamically inject card elements
const addCards = (cards) => {
  cards.forEach(card => {
    const cardHTML = `
      <div class="col s12 m12 center-align">
        <div class="card medium hoverable">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${card.image}" alt="${card.title}">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">
              ${card.title}<i class="material-icons right">more_vert</i>
            </span>
            <p><a href="${card.link}" target="_blank">View on GitHub</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              ${card.title}<i class="material-icons right">close</i>
            </span>
            <p>${card.description}</p>
          </div>
        </div>
      </div>
    `;
    $('#card-section').append(cardHTML).hide().fadeIn(400);
  });
};

// When DOM is ready
$(document).ready(() => {
  $('.modal').modal();
  $('.materialboxed').materialbox();

  $('#clickMeButton').click(clickMe);
  $('#formSubmit').click(submitForm);

  addCards(cardList);
});
