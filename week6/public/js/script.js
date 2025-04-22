// 'Click Me' button handler
const clickMe = () => {
  alert("Thanks for clicking me. Hope you're enjoying the workshop!");
};

// Submit form handler
const submitForm = () => {
  const firstName = $('#first_name').val().trim();
  const lastName = $('#last_name').val().trim();
  const email = $('#email').val().trim();

  // Debug log
  console.log("Submit button clicked!");

  if (!firstName) {
    M.toast({
      html: 'Please enter your first name.',
      classes: 'rounded red lighten-1 white-text'
    });
    return;
  }

  const formData = { firstName, lastName, email };
  console.log("Sending form data:", formData);

  $.post("/api/users", formData)
    .done((response) => {
      console.log("Server response:", response);

      M.toast({
        html: response.message,
        classes: 'rounded green lighten-1 white-text'
      });

      // Close modal
      const modal = document.getElementById('modal1');
      const modalInstance = M.Modal.getInstance(modal);
      modalInstance.close();

      // Clear form
      $('#first_name, #last_name, #email').val('');
      M.updateTextFields();
    })
    .fail((error) => {
      console.error("Form submission failed:", error);
      M.toast({
        html: 'Something went wrong. Please try again.',
        classes: 'rounded red lighten-1 white-text'
      });
    });
};

// Inject project cards from DB
const addCards = (cards) => {
  $('#card-section').empty();
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

// Fetch projects from backend
const getProjects = () => {
  $.get("/api/projects", (response) => {
    console.log("Fetched projects:", response);
    if (response.statusCode === 200) {
      addCards(response.data);
    } else {
      console.error("Project fetch failed:", response);
    }
  });
};

// DOM Ready
$(document).ready(() => {
  $('.modal').modal();
  $('.materialboxed').materialbox();

  $('#clickMeButton').click(clickMe);
  $('#formSubmit').click(submitForm);

  getProjects(); // Fetch cards from backend on load
});
