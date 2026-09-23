// Course data for the Web and Computer Programming certificate
// and the logic that renders/filters the course cards.

const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: ['C#'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

const courseList = document.getElementById('courseList');
const creditTotal = document.getElementById('creditTotal');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderCourses(subjectFilter) {
  const filtered =
    subjectFilter === 'ALL'
      ? courses
      : courses.filter((course) => course.subject === subjectFilter);

  courseList.innerHTML = '';

  filtered.forEach((course) => {
    const card = document.createElement('li');
    card.className = course.completed ? 'course-card is-complete' : 'course-card';

    const code = document.createElement('p');
    code.className = 'course-code';
    code.textContent = `${course.subject} ${course.number}`;

    const title = document.createElement('p');
    title.className = 'course-title';
    title.textContent = course.title;

    const meta = document.createElement('p');
    meta.className = 'course-meta';
    meta.textContent = course.completed
      ? `${course.credits} credits · Completed`
      : `${course.credits} credits`;

    card.append(code, title, meta);
    courseList.appendChild(card);

    // Open this course's details in the modal when the card is clicked.
    card.addEventListener('click', () => showCourseModal(course));
  });

  const totalCredits = filtered.reduce((sum, course) => sum + course.credits, 0);
  creditTotal.textContent = totalCredits;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
    button.setAttribute('aria-pressed', 'true');
    renderCourses(button.dataset.subject);
  });
});

renderCourses('ALL');


const courseModal = document.getElementById('courseModal');

// Builds the modal content for one course and opens the dialog.
function showCourseModal(course) {
  // Fill the dialog with this course's details.
  courseModal.innerHTML = `
    <div class="modal-header">
      <h3>${course.subject} ${course.number}</h3>
      <button type="button" class="modal-close" aria-label="Close course details">&times;</button>
    </div>
    <div class="modal-body">
      <h4>${course.title}</h4>
      <p>${course.credits} credits</p>
      <p>Certificate: ${course.certificate}</p>
      <p>${course.description}</p>
      <p>Technology: ${course.technology.join(', ')}</p>
    </div>
  `;

  courseModal.showModal();

  // Close button inside the modal.
  courseModal.querySelector('.modal-close').addEventListener('click', () => {
    courseModal.close();
  });
}

// Close the modal when the user clicks outside of it (on the backdrop area).
// A click on the dialog element itself (not on its inner content) means
// the click landed outside the visible box.
courseModal.addEventListener('click', (event) => {
  if (event.target === courseModal) {
    courseModal.close();
  }
});