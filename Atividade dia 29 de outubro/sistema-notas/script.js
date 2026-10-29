const form = document.getElementById('grade-form');
const studentNameInput = document.getElementById('student-name');
const gradeInputs = [
  document.getElementById('grade-1'),
  document.getElementById('grade-2'),
  document.getElementById('grade-3'),
];
const errorMessage = document.getElementById('error-message');
const result = document.getElementById('result');
const resetButton = document.getElementById('reset-btn');

function hideMessage(element) {
  element.classList.add('hidden');
  element.textContent = '';
}

function showMessage(element, message, type) {
  element.classList.remove('hidden');
  element.textContent = message;

  if (type) {
    element.classList.remove('success', 'warning', 'danger', 'error');
    element.classList.add(type);
  }
}

function clearMessages() {
  hideMessage(errorMessage);
  hideMessage(result);
  result.classList.remove('success', 'warning', 'danger', 'error');
}

function validateNotes(notes) {
  return notes.every((note) => Number.isFinite(note) && note >= 0 && note <= 10);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearMessages();

  const studentName = studentNameInput.value.trim();

  if (!studentName) {
    showMessage(errorMessage, 'Erro: informe o nome do estudante.', 'error');
    studentNameInput.focus();
    return;
  }

  const notes = gradeInputs.map((input) => Number.parseFloat(input.value));

  if (gradeInputs.some((input) => input.value.trim() === '') || !validateNotes(notes)) {
    showMessage(errorMessage, 'Erro: todas as notas devem ser preenchidas com valores entre 0 e 10.', 'error');
    return;
  }

  const average = notes.reduce((sum, note) => sum + note, 0) / notes.length;
  const situation = average >= 7 ? 'Aprovado' : average >= 5 ? 'Recuperação' : 'Reprovado';
  const averageLabel = average.toFixed(1).replace('.', ',');

  result.classList.remove('hidden');
  result.classList.remove('success', 'warning', 'danger');

  if (average >= 7) {
    result.classList.add('success');
  } else if (average >= 5) {
    result.classList.add('warning');
  } else {
    result.classList.add('danger');
  }

  result.textContent = `${studentName}: média ${averageLabel}. Situação: ${situation}.`;
});

resetButton.addEventListener('click', () => {
  form.reset();
  clearMessages();
  studentNameInput.focus();
});
