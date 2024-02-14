// Function to calculate the time difference between two dates
function getTimeDifference(startDate, endDate) {
    const difference = Math.abs(startDate - endDate) / 1000; // Difference in seconds
//    const years = Math.floor(difference / (365 * 24 * 60 * 60));
    const months = Math.floor((difference % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
    const days = Math.floor((difference % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
    const hours = Math.floor((difference % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((difference % (60 * 60)) / 60);
    const seconds = Math.floor(difference % 60);

    return { months, days, hours, minutes, seconds };
}
//in the future add years
// Update the counter every second
function updateCounter() {
    const startDate = new Date('2023-08-25'); // Change the year to the starting year
    const endDate = new Date();
    const timeDifference = getTimeDifference(startDate, endDate);

    const counter = document.getElementById('counter');
    counter.textContent = `we have been together for ${timeDifference.months} months- ${timeDifference.days} days, ${timeDifference.hours} hours, ${timeDifference.minutes} minutes, and ${timeDifference.seconds} seconds.`;
}

// ${timeDifference.years} years,

// Initial call to update counter
updateCounter();
// Update the counter every second
setInterval(updateCounter, 1000);
