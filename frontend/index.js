async function sprintChallenge5() {

  const footer = document.querySelector('footer')

  footer.textContent =`© BLOOM INSTITUTE OF TECHNOLOGY 2023`

  const cards = document.querySelector(".cards");

  
  function updateHeaderText(text) {
    const header = document.querySelector('header p');
    if (header) {
      header.textContent = text;
    }
  }

  
  async function getLearnersFromAPI(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      updateHeaderText('No learner is selected');
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  }

  
  async function getMentorsFromAPI(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  }

  
  function getMentorDetails(mentorId, mentorList) {
    const mentor = mentorList.find(mentor => mentor.id === mentorId);
    return mentor
  }

  async function createCard({ id, fullName, email, mentors }) {
    const card = document.createElement('div');
    card.classList.add('card');

    const name = document.createElement('h3');
    name.textContent = `${fullName}`;

    const contact = document.createElement('div');
    contact.textContent = `${email}`;

    const mentor2 = document.createElement('h4');
    mentor2.classList.add('closed');
    mentor2.textContent = `Mentors`;

    const mentorListElement = document.createElement('ul');
    mentorListElement.classList.add('closed');

    mentors.forEach(mentorId => {
      const mentor = getMentorDetails(mentorId, mentorList);
      const mentorItem = document.createElement('li');
      mentorItem.textContent = `${mentor.firstName} ${mentor.lastName}`;
      mentorListElement.appendChild(mentorItem);
    });

    card.appendChild(name);
    card.appendChild(contact);
    card.appendChild(mentor2);
    card.appendChild(mentorListElement);

    card.addEventListener("click", () => {
      const cardsContainer = document.querySelector(".cards")
      const selectedCard = cardsContainer.querySelector(".selected")
      if (!card.classList.contains("selected")) {
        card.classList.add("selected");
      }
      if (selectedCard) {
        selectedCard.classList.remove("selected")
      }
      const isSelected = card.classList.contains("selected");
      const learnerIdElement = name.querySelector('.learner-id');
      if (isSelected) {
        if (!learnerIdElement) {
          const learnerId =
document.createElement('span');
          learnerId.textContent =  `ID ${id}`;
          learnerId.classList.add('learner-id');
          name.textContent = `${fullName},`;
          name.appendChild(learnerId);
        }
        updateHeaderText(`The selected learner is ${fullName}`);
      } else {
        if (learnerIdElement) {
          name.textContent = `${fullName}`;
          learnerIdElement.remove();
          updateHeaderText('No learner is selected');
        }
      }
    });

    mentor2.addEventListener("click", () => {
      mentor2.classList.toggle("open");
      mentor2.classList.toggle("closed");

    });

    cards.appendChild(card);
  }

  const learnerApiUrl = "http://localhost:3003/api/learners";
  const mentorApiUrl = "http://localhost:3003/api/mentors";

  
  const [learners, mentorList] = await Promise.all([
    getLearnersFromAPI(learnerApiUrl),
    getMentorsFromAPI(mentorApiUrl)
  ]);

  
  learners.forEach(createCard);

}
// 👆 WORK WORK ABOVE THIS LINE 👆
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()