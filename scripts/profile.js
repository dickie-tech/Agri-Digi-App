let currentStep = 0;
const steps = document.querySelectorAll(".step");

function showStep(stepIndex) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === stepIndex);
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

function goToStep(stepIndex) {
  currentStep = stepIndex;
  showStep(stepIndex);
}

document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const userData = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    dob: form.dob.value,
    email: form.email.value,
    idNo: form.idNo.value,
    gender: form.gender.value,
    maritalStatus: form.maritalStatus.value,
    phone: form.phone.value,
    boxNo: form.boxNo.value,
    postalCode: form.postalCode.value,
    county: form.county.value,
    town: form.town.value,
    constituency: form.constituency.value,
    ward: form.ward.value,
    role: form.role.value,
    interest: form.interest.value,
    username: form.username.value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  try {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to complete profile setup.");
      return;
    }

    // Upload profile picture
    const fileInput = document.getElementById("profilePicture");
    const file = fileInput?.files[0];
    let photoURL = "";

    if (file) {
      const storageRef = storage.ref(`profilePictures/${user.uid}`);
      await storageRef.put(file);
      photoURL = await storageRef.getDownloadURL();
      userData.photoURL = photoURL;
    }

    // Save to Firestore
    await db.collection("profiles").doc(user.uid).set(userData);

    alert("Profile saved successfully!");
    window.location.href = "view-profile.html"; // redirect after save
  } catch (error) {
    console.error("Error saving profile:", error);
    alert("Error: " + error.message);
  }
});
