// Store user data
let userData = {
    phoneNumber: '',
    name: '',
    email: '',
    birthday: ''
};

// Show specific page and hide others
function showPage(pageNumber) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page${pageNumber}`).classList.add('active');
}

// Validate phone number and proceed to page 2
function checkPhoneNumber() {
    const phoneNumber = '+60' + document.getElementById('phoneNumber').value;
    const errorElement = document.getElementById('phoneError');
    
    if (phoneNumber === '+60173527250') {
        userData.phoneNumber = phoneNumber;
        errorElement.textContent = '';
        showPage(2);
    } else {
        errorElement.textContent = 'Invalid phone number. Please use 173527250';
    }
}

// Handle date inputs
function handleDateInput(event, nextInput) {
    const value = event.target.value;
    if (value.length === event.target.maxLength && nextInput) {
        document.getElementById(nextInput).focus();
    }
}

// Format date from separate inputs
function formatDate() {
    const day = document.getElementById('birthdayDay').value.padStart(2, '0');
    const month = document.getElementById('birthdayMonth').value.padStart(2, '0');
    const year = document.getElementById('birthdayYear').value;
    return `${year}-${month}-${day}`;
}

// Validate form and proceed to page 3
function submitDetails() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const noEmail = document.getElementById('noEmail').checked;
    const birthday = formatDate();

    if (!name) {
        document.getElementById('formError').textContent = 'Please enter your name';
        return;
    }

    if (!birthday) {
        document.getElementById('formError').textContent = 'Please enter your birthday';
        return;
    }

    if (!noEmail && (!email || !email.includes('@'))) {
        document.getElementById('formError').textContent = 'Please enter a valid email address';
        return;
    }

    userData.name = name;
    userData.email = noEmail ? 'No email provided' : email;
    userData.birthday = birthday;

    // Update summary page
    document.getElementById('summaryName').textContent = name;
    document.getElementById('summaryPhone').textContent = userData.phoneNumber;
    document.getElementById('summaryEmail').textContent = userData.email;
    document.getElementById('summaryBirthday').textContent = new Date(birthday).toLocaleDateString();

    showPage(3);
}

// Reset and return to first page
function startOver() {
    // Clear form fields
    document.getElementById('phoneNumber').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('birthdayDay').value = '';
    document.getElementById('birthdayMonth').value = '';
    document.getElementById('birthdayYear').value = '';
    document.getElementById('noEmail').checked = false;
    
    // Clear error messages
    document.getElementById('phoneError').textContent = '';
    
    // Reset userData
    userData = {
        phoneNumber: '',
        name: '',
        email: '',
        birthday: ''
    };
    
    showPage(1);
}

// Add event listeners for date inputs
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('birthdayDay').addEventListener('input', (e) => handleDateInput(e, 'birthdayMonth'));
    document.getElementById('birthdayMonth').addEventListener('input', (e) => handleDateInput(e, 'birthdayYear'));
});