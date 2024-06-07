document.addEventListener("DOMContentLoaded", function() {
    function getRandomValue(min, max) {
        return (Math.random() * (max - min) + min).toFixed(1);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function updateSensorValues() {
        document.getElementById("temperature").querySelector("span").textContent = getRandomValue(22.5, 30);
        document.getElementById("humidity").querySelector("span").textContent = getRandomInt(69, 80);
        document.getElementById("soil-moisture").querySelector("span").textContent = getRandomInt(250, 1500);

        // Luminosity levels
        const levels = ["high", "medium", "low"];
        const activeLevel = levels[Math.floor(Math.random() * levels.length)];
        
        levels.forEach(level => {
            const element = document.getElementById(level);
            if (level === activeLevel) {
                element.style.display = "inline-block";
            } else {
                element.style.display = "none";
            }
        });
    }

    function fetchData() {
        const loadingMessage = document.getElementById("loading-message");
        const loadingDots = document.getElementById("loading-dots");
        const progressBarContainer = document.getElementById("progress-bar-container");
        const progressBar = document.getElementById("progress-bar");
        const successMessage = document.getElementById("success-message");

        loadingMessage.style.display = "block";
        progressBarContainer.style.display = "block";
        successMessage.style.display = "none";
        progressBar.style.width = "0";

        let progress = 0;
        const duration = getRandomInt(10, 20); // Duration between 10 and 20 seconds
        const intervalTime = duration * 1000 / 100; // Time for each percent step

        const interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                updateSensorValues();
                loadingMessage.style.display = "none";
                progressBarContainer.style.display = "none";
                successMessage.style.display = "block";
            }
        }, intervalTime);

        let dotCount = 0;
        const dotInterval = setInterval(() => {
            dotCount = (dotCount + 1) % 4;
            loadingDots.textContent = '.'.repeat(dotCount);
        }, 500);

        setTimeout(() => {
            clearInterval(dotInterval);
        }, duration * 1000);
    }

    document.getElementById("fetch-data-btn").addEventListener("click", fetchData);

    // Optionally, fetch data automatically at the beginning
    fetchData();
});
