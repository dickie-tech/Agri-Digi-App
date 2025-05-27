let currentStep = 0;
const steps = document.querySelectorAll('.step');
const tabs = document.querySelectorAll('.step-tab');

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });

  tabs.forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

function goToStep(index) {
  currentStep = index;
  showStep(currentStep);
}

// Optional: Handle form submit
document.getElementById('profileForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert("Profile completed!");
});

showStep(currentStep);
