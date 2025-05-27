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

// Handle form submission
document.getElementById("profileForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const profilePic = document.getElementById("profilePicture").files[0];

  const userData = {
    firstName: form[0].value,
    lastName: form[1].value,
    dob: form[2].value,
    email: form[3].value,
    idNo: form[4].value,
    gender: form[5].value,
    maritalStatus: form[6].value,
    phoneNumber: form[7].value,

    boxNo: form[8].value,
    postalCode: form[9].value,
    county: form[10].value,
    town: form[11].value,
    constituency: form[12].value,
    ward: form[13].value,

    userRole: form[14].value,
    interest: form[15].value,
    username: form[16].value,
    profilePicUrl: ""
  };

  try {
    // Upload profile picture if exists
    if (profilePic) {
      const storageRef = firebase.storage().ref(`profile_pictures/${userData.username}_${Date.now()}`);
      await storageRef.put(profilePic);
      const downloadURL = await storageRef.getDownloadURL();
      userData.profilePicUrl = downloadURL;
    }

    // Save to Firestore
    const user = firebase.auth().currentUser;
    const uid = user ? user.uid : `anonymous_${Date.now()}`; // fallback for testing

    await firebase.firestore().collection("users").doc(uid).set(userData);

    alert("Profile saved successfully!");
    form.reset();
    showStep(0);
    document.getElementById("imagePreview").style.display = "none";
  } catch (error) {
    console.error("Error saving profile:", error);
    alert("Something went wrong. Please try again.");
  }
});
