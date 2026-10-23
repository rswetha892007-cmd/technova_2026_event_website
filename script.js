// =====================================
// TECHNOVA 2026 - JAVASCRIPT FEATURES
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // Shortcuts for selecting HTML elements
    const $ = function (selector) {
        return document.querySelector(selector);
    };

    const $$ = function (selector) {
        return document.querySelectorAll(selector);
    };


    // =====================================
    // 1. NOTIFICATION MESSAGE
    // =====================================

    let toastTimer;

    function showToast(message) {

        const toast = $("#toast");

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function () {
            toast.classList.remove("show");
        }, 2600);
    }


    // =====================================
    // 2. EXPLORE EVENT BUTTON
    // =====================================

    $("#exploreBtn").addEventListener("click", function () {

        // Required alert interaction
        alert("Welcome to TECHNOVA 2026! Let's explore the event.");

        $("#welcomeMessage").textContent =
            "Welcome to TECHNOVA 2026 — let's explore what's planned!";

        $("#highlights").scrollIntoView({
            behavior: "smooth"
        });

        showToast("Let's explore the event highlights!");
    });


    // =====================================
    // 3. DARK AND LIGHT MODE
    // =====================================

    const themeToggle = $("#themeToggle");

    const savedTheme = localStorage.getItem("technova-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    function updateThemeButton() {

        const isLight =
            document.body.classList.contains("light-mode");

        themeToggle.textContent = isLight ? "🌙" : "☀️";

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );

        themeToggle.title =
            isLight ? "Switch to dark mode" : "Switch to light mode";
    }

    updateThemeButton();

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        const isLight =
            document.body.classList.contains("light-mode");

        localStorage.setItem(
            "technova-theme",
            isLight ? "light" : "dark"
        );

        updateThemeButton();

        showToast(
            isLight ? "Light mode enabled" : "Dark mode enabled"
        );
    });


    // =====================================
    // 4. RESPONSIVE MOBILE NAVIGATION
    // =====================================

    const menuToggle = $("#menuToggle");

    const navLinks = $("#navLinks");

    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation");

            menuToggle.textContent = "☰";
        });
    });


    // =====================================
    // 5. EVENT COUNTDOWN
    // =====================================

    // November 15, 2026 at 9:00 AM local browser time
    const eventDate = new Date(2026, 10, 15, 9, 0, 0).getTime();

    function updateCountdown() {

        const now = Date.now();

        const difference = eventDate - now;

        if (difference <= 0) {

            $("#countdown").innerHTML =
                "<p class='countdown-finished'>" +
                "TECHNOVA 2026 has started or the event date has passed!" +
                "</p>";

            $("#countdownMessage").textContent =
                "We hope you have an amazing event day.";

            clearInterval(countdownTimer);

            return;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        $("#days").textContent =
            String(days).padStart(2, "0");

        $("#hours").textContent =
            String(hours).padStart(2, "0");

        $("#minutes").textContent =
            String(minutes).padStart(2, "0");

        $("#seconds").textContent =
            String(seconds).padStart(2, "0");
    }

    updateCountdown();

    const countdownTimer = setInterval(updateCountdown, 1000);


    // =====================================
    // 6. COPY EVENT DETAILS
    // =====================================

    $("#copyDetailsBtn").addEventListener("click", async function () {

        const details =
            "TECHNOVA 2026\n" +
            "Date: November 15, 2026\n" +
            "Time: 9:00 AM - 4:00 PM\n" +
            "Venue: College Auditorium";

        try {

            await navigator.clipboard.writeText(details);

            $("#copyMessage").textContent =
                "Event details copied successfully!";

            showToast("Event details copied to clipboard!");

        } catch (error) {

            // Fallback for browsers that block clipboard access
            $("#copyMessage").textContent =
                "Clipboard access was blocked. " +
                "Event details: " +
                details.replace(/\n/g, " | ");
        }
    });


    // =====================================
    // 7. ADD TO FAVORITES
    // =====================================

    const favoriteBtn = $("#favoriteBtn");

    const favoriteMessage = $("#favoriteMessage");

    let isFavorite =
        localStorage.getItem("technova-favorite") === "yes";

    function updateFavorite() {

        favoriteBtn.textContent = isFavorite
            ? "⭐ Added to Favorites"
            : "☆ Add to Favorites";

        favoriteBtn.setAttribute(
            "aria-pressed",
            String(isFavorite)
        );

        favoriteMessage.textContent = isFavorite
            ? "TECHNOVA is saved on this device."
            : "";
    }

    updateFavorite();

    favoriteBtn.addEventListener("click", function () {

        isFavorite = !isFavorite;

        localStorage.setItem(
            "technova-favorite",
            isFavorite ? "yes" : "no"
        );

        updateFavorite();

        showToast(
            isFavorite
                ? "TECHNOVA added to favorites!"
                : "Removed from favorites."
        );
    });


    // =====================================
    // 8. FAQ ACCORDION
    // =====================================

    $$(".faq-question").forEach(function (question) {

        question.addEventListener("click", function () {

            const answer = question.nextElementSibling;

            const isOpening = answer.hidden;

            answer.hidden = !isOpening;

            question.setAttribute(
                "aria-expanded",
                String(isOpening)
            );

            question.querySelector("span").textContent =
                isOpening ? "−" : "＋";
        });
    });


    // =====================================
    // 9. BACK TO TOP BUTTON
    // =====================================

    $("#backToTop").addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // =====================================
    // 10. SCROLL PROGRESS BAR
    // =====================================

    const scrollProgress = $("#scrollProgress");

    function updateScrollProgress() {

        const scrollable =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent = scrollable > 0
            ? (window.scrollY / scrollable) * 100
            : 0;

        scrollProgress.style.width = percent + "%";
    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    // =====================================
    // 11. EVENT PREPARATION CHECKLIST
    // Additional Feature 1
    // =====================================

    const readyChecks = $$(".ready-check");

    const readyBar = $("#readyBar");

    const readyText = $("#readyText");

    readyChecks.forEach(function (check, index) {

        check.checked =
            localStorage.getItem("technova-ready-" + index) === "yes";

        check.addEventListener("change", function () {

            localStorage.setItem(
                "technova-ready-" + index,
                check.checked ? "yes" : "no"
            );

            updateReadyProgress();
        });
    });

    function updateReadyProgress() {

        const completed = [...readyChecks].filter(
            function (check) {
                return check.checked;
            }
        ).length;

        const percentage =
            (completed / readyChecks.length) * 100;

        readyBar.style.width = percentage + "%";

        readyText.textContent =
            completed + " of " + readyChecks.length + " completed";

        if (completed === readyChecks.length) {
            readyText.textContent =
                "All set! You're ready for TECHNOVA! 🎉";
        }
    }

    updateReadyProgress();


    // =====================================
    // 12. INTERACTIVE EVENT CARDS
    // Additional Feature 2
    // =====================================

    $$(".highlight-card").forEach(function (card) {

        const paragraph = card.querySelector("p");

        const originalText = paragraph.textContent;

        const title = card.querySelector("h3").textContent;

        let expanded = false;

        const extraTips = {
            "Coding Challenge":
                "Preparation tip: Practise coding problems and bring your curiosity.",

            "AI Innovation":
                "Preparation tip: Think about responsible ways AI can solve real problems.",

            "Project Showcase":
                "Preparation tip: Prepare a short demo and explain your project's impact."
        };

        function toggleCard() {

            expanded = !expanded;

            card.classList.toggle("card-expanded", expanded);

            paragraph.textContent = expanded
                ? extraTips[title]
                : originalText;

            card.setAttribute(
                "aria-pressed",
                String(expanded)
            );
        }

        card.setAttribute("role", "button");

        card.setAttribute("aria-pressed", "false");

        card.addEventListener("click", toggleCard);

        card.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                toggleCard();
            }
        });
    });


    // =====================================
    // 13. PERSONALIZED GREETING
    // Additional Feature 3
    // =====================================

    const hour = new Date().getHours();

    let greeting;

    if (hour < 12) {

        greeting = "Good morning";

    } else if (hour < 17) {

        greeting = "Good afternoon";

    } else {

        greeting = "Good evening";
    }

    $("#personalGreeting").textContent =
        greeting + ", innovator! Your next idea could start here.";


    // =====================================
    // 14. GOOGLE FORM REGISTRATION
    // =====================================

    const registerLink = $("#registerLink");

    registerLink.addEventListener("click", function () {

        showToast("Opening the TECHNOVA registration form...");
    });

});
// ===== TECH PERSONALITY QUIZ =====

const quizQuestions = [
{
question: "What excites you the most?",
answers: [
{ text: "🤖 Creating intelligent AI solutions", type: "ai" },
{ text: "💻 Solving challenging coding problems", type: "code" },
{ text: "🎨 Designing beautiful digital experiences", type: "design" },
{ text: "🚀 Building new products and startups", type: "founder" },
{ text: "🔐 Protecting systems from cyber threats", type: "cyber" }
]
},
{
question: "Which project would you choose?",
answers: [
{ text: "An AI chatbot that helps students", type: "ai" },
{ text: "A powerful application using algorithms", type: "code" },
{ text: "A modern website with stunning visuals", type: "design" },
{ text: "An innovative product that solves a real problem", type: "founder" },
{ text: "A tool that detects online security threats", type: "cyber" }
]
},
{
question: "What is your greatest strength?",
answers: [
{ text: "Thinking about intelligent solutions", type: "ai" },
{ text: "Logical thinking and debugging", type: "code" },
{ text: "Creativity and visual imagination", type: "design" },
{ text: "Leadership and big-picture thinking", type: "founder" },
{ text: "Attention to detail and risk detection", type: "cyber" }
]
},
{
question: "Which workshop sounds most exciting?",
answers: [
{ text: "Generative AI and machine learning", type: "ai" },
{ text: "Competitive programming and algorithms", type: "code" },
{ text: "UI/UX design and creative technology", type: "design" },
{ text: "Innovation, entrepreneurship and pitching", type: "founder" },
{ text: "Ethical hacking and digital security", type: "cyber" }
]
},
{
question: "What impact would you love to make?",
answers: [
{ text: "Make technology smarter with AI", type: "ai" },
{ text: "Build reliable and efficient software", type: "code" },
{ text: "Make technology easier and more enjoyable to use", type: "design" },
{ text: "Turn bold ideas into useful products", type: "founder" },
{ text: "Make the digital world safer", type: "cyber" }
]
}
];

const techPersonas = {
ai: {
emoji: "🤖",
title: "The AI Innovator",
description: "You love intelligent systems, experimentation and exploring how AI can solve real-world problems. Your curiosity drives you to discover what technology can do next.",
recommendation: "Explore the AI Innovation session and discover new applications of artificial intelligence."
},
code: {
emoji: "💻",
title: "The Code Architect",
description: "You enjoy logical challenges, structured thinking and turning complex problems into working solutions. You believe great ideas deserve great code.",
recommendation: "Challenge yourself in the Coding Challenge and showcase your problem-solving skills."
},
design: {
emoji: "🎨",
title: "The Creative Designer",
description: "You combine imagination with technology. You care about how things look, feel and work, and you enjoy creating experiences that people love using.",
recommendation: "Explore creative technology and present an engaging interface or design concept."
},
founder: {
emoji: "🚀",
title: "The Future Founder",
description: "You think beyond existing solutions. You enjoy spotting opportunities, bringing people together and transforming promising ideas into useful products.",
recommendation: "Join the Project Showcase and present an innovative solution to a real-world problem."
},
cyber: {
emoji: "🔐",
title: "The Cyber Guardian",
description: "You are observant, analytical and interested in protecting people and information. You enjoy finding weaknesses and thinking about how to make systems safer.",
recommendation: "Explore cybersecurity concepts and investigate how technology can protect digital systems."
}
};

let currentQuestion = 0;
let quizScores = {
ai: 0,
code: 0,
design: 0,
founder: 0,
cyber: 0
};

let selectedAnswers = [];

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const progressBar = document.getElementById("quiz-progress-bar");
const nextButton = document.getElementById("next-question-btn");
const quizError = document.getElementById("quiz-error");
const quizResult = document.getElementById("quiz-result");

function displayQuestion() {
const question = quizQuestions[currentQuestion];

questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

questionText.textContent = question.question;

progressBar.style.width =
    `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

answerOptions.innerHTML = "";
quizError.textContent = "";

question.answers.forEach((answer, index) => {
    const label = document.createElement("label");
    label.className = "answer-option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz-answer";
    radio.value = answer.type;
    radio.checked = selectedAnswers[currentQuestion] === answer.type;

    radio.addEventListener("change", () => {
        selectedAnswers[currentQuestion] = answer.type;

        document.querySelectorAll(".answer-option").forEach(option => {
            option.classList.remove("selected");
        });

        label.classList.add("selected");
        quizError.textContent = "";
    });

    label.appendChild(radio);
    label.appendChild(
        document.createTextNode(" " + answer.text)
    );

    if (radio.checked) {
        label.classList.add("selected");
    }

    answerOptions.appendChild(label);
});

nextButton.textContent =
    currentQuestion === quizQuestions.length - 1
        ? "Discover My Tech Persona ✨"
        : "Next Question →";

}

function calculateResult() {
quizScores = {
ai: 0,
code: 0,
design: 0,
founder: 0,
cyber: 0
};

selectedAnswers.forEach(type => {
    if (type && Object.prototype.hasOwnProperty.call(quizScores, type)) {
        quizScores[type]++;
    }
});

// Find the highest score.
// If scores are tied, the first matching type in this order wins.
const personaTypes = ["ai", "code", "design", "founder", "cyber"];

const winningType = personaTypes.reduce((best, type) => {
    return quizScores[type] > quizScores[best] ? type : best;
}, personaTypes[0]);

return techPersonas[winningType];

}

function showResult() {
const persona = calculateResult();

questionNumber.hidden = true;
questionText.hidden = true;
answerOptions.hidden = true;
nextButton.hidden = true;
progressBar.style.width = "100%";

quizResult.hidden = false;

document.getElementById("result-emoji").textContent = persona.emoji;
document.getElementById("result-title").textContent = persona.title;
document.getElementById("result-description").textContent =
    persona.description;

document.getElementById("result-recommendation").textContent =
    persona.recommendation;

// Store the result for the copy button.
quizResult.dataset.persona = persona.title;
quizResult.dataset.recommendation = persona.recommendation;

}

nextButton.addEventListener("click", () => {
if (!selectedAnswers[currentQuestion]) {
quizError.textContent =
"Please select an answer before continuing.";
return;
}

if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    displayQuestion();
} else {
    showResult();
}

});

document.getElementById("restart-quiz-btn").addEventListener("click", () => {
currentQuestion = 0;
selectedAnswers = [];

quizScores = {
    ai: 0,
    code: 0,
    design: 0,
    founder: 0,
    cyber: 0
};

quizResult.hidden = true;

questionNumber.hidden = false;
questionText.hidden = false;
answerOptions.hidden = false;
nextButton.hidden = false;

document.getElementById("share-message").textContent = "";

displayQuestion();

});

document.getElementById("share-result-btn").addEventListener("click", async () => {
const persona = quizResult.dataset.persona;
const recommendation = quizResult.dataset.recommendation;

const shareText =
    `My TECHNOVA 2026 Tech Persona is ${persona}! 🚀\n` +
    `${recommendation}\n` +
    `Discover your tech persona too!`;

const shareMessage = document.getElementById("share-message");

try {
    // Clipboard API works on secure contexts, such as HTTPS or localhost.
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareText);
        shareMessage.textContent = "✅ Your result has been copied!";
    } else {
        // Fallback for websites opened directly as local HTML files.
        const temporaryTextArea = document.createElement("textarea");
        temporaryTextArea.value = shareText;
        temporaryTextArea.style.position = "fixed";
        temporaryTextArea.style.left = "-9999px";

        document.body.appendChild(temporaryTextArea);
        temporaryTextArea.focus();
        temporaryTextArea.select();

        const copied = document.execCommand("copy");
        temporaryTextArea.remove();

        shareMessage.textContent = copied
            ? "✅ Your result has been copied!"
            : "Please select and copy your result manually.";
    }
} catch (error) {
    shareMessage.textContent =
        "Copy was unsuccessful. Please copy your result manually.";
}

});

// Display the first question when the page loads.
displayQuestion();