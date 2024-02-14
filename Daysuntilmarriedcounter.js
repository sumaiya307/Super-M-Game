// Function to calculate the time difference between two dates
function getTimeDifference(startDate, endDate) {
    const difference = endDate - startDate; // Difference in milliseconds
    const milliseconds = difference % 1000;
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30); // Approximate months

    return { months, days, hours, minutes, seconds };
}

// Update the countdown every second
function updateCountdown() {
    const currentDate = new Date();
    const weddingDate = new Date('2024-05-18'); // Date of wedding
    const timeDifference = getTimeDifference(currentDate, weddingDate);

    const countdown = document.getElementById('countdown');
    countdown.textContent = `can't wait to marry you in ${timeDifference.months} months- ${timeDifference.days} days, ${timeDifference.hours} hours, ${timeDifference.minutes} minutes, and ${timeDifference.seconds} seconds `;
}

// Initial call to update countdown
updateCountdown();
// Update countdown every second
setInterval(updateCountdown, 1000);
