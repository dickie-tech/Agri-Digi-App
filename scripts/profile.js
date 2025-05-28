let currentStep = 0;
const steps = document.querySelectorAll(".step");

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });

  document.querySelectorAll(".step-tab").forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
  });

  currentStep = index;
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    showStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
}

function goToStep(index) {
  showStep(index);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profileForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = firebase.auth().currentUser;
    if (!user) {
      alert("You must be logged in to complete your profile.");
      return;
    }

    const uid = user.uid;
    const formFields = form.elements;

    const userData = {
      firstName: formFields[0].value,
      lastName: formFields[1].value,
      dob: formFields[2].value,
      email: formFields[3].value,
      idNo: formFields[4].value,
      gender: formFields[5].value,
      maritalStatus: formFields[6].value,
      phoneNumber: formFields[7].value,

      address: {
        boxNo: formFields[8].value,
        postalCode: formFields[9].value,
        county: formFields[10].value,
        town: formFields[11].value,
        constituency: formFields[12].value,
        ward: formFields[13].value,
      },

      preferences: {
        userRole: formFields[14].value,
        interest: formFields[15].value,
      },

      username: formFields[16].value,
      profilePicUrl: "", // Keep field, but leave empty
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
  // Skip image upload for now

        await firebase.firestore().collection("profiles").doc(uid).set(userData);

        alert("Profile saved successfully!");
        form.reset();
        showStep(0);

        // Safe check for imagePreview element
        const preview = document.getElementById("imagePreview");
        if (preview) preview.style.display = "none";

      } catch (error) {
        console.error("Error saving profile:", error);
        alert("Something went wrong. Please try again.");
      }
  });
});
