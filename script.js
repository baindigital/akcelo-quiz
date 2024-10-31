let quizInstance;

const questions = [
    {
        question: "How do you prefer to spend your evenings?",
        icon: "🌙",
        options: [
            { text: "Training or working out", icon: "💪" },
            { text: "Creating art or music", icon: "🎨" },
            { text: "Reading or studying", icon: "📚" },
            { text: "Planning world domination", icon: "🌍" },
            { text: "Helping others", icon: "🤝" }
        ]
    },
    {
        question: "What's your ideal superpower?",
        icon: "⚡",
        options: [
            { text: "Super strength", icon: "⚡" },
            { text: "Invisibility", icon: "👻" },
            { text: "Mind reading", icon: "🧠" },
            { text: "Time control", icon: "⌛" },
            { text: "Healing powers", icon: "💖" }
        ]
    },
    {
        question: "What motivates you the most?",
        icon: "🎯",
        options: [
            { text: "Glory and recognition", icon: "🏆" },
            { text: "Self-expression", icon: "🎭" },
            { text: "Knowledge and wisdom", icon: "🔮" },
            { text: "Power and influence", icon: "👑" },
            { text: "Making a difference", icon: "✨" }
        ]
    },
    {
        question: "What's your preferred environment?",
        icon: "🏠",
        options: [
            { text: "High-tech gym", icon: "🏋️" },
            { text: "Artistic studio", icon: "🎨" },
            { text: "Ancient library", icon: "📚" },
            { text: "Secret lair", icon: "🗺️" },
            { text: "Community center", icon: "🏢" }
        ]
    },
    {
        question: "What's your life motto?",
        icon: "📜",
        options: [
            { text: "No pain, no gain", icon: "💪" },
            { text: "Express yourself freely", icon: "🎭" },
            { text: "Knowledge is power", icon: "📚" },
            { text: "Rules are meant to be broken", icon: "⚡" },
            { text: "Be the change you wish to see", icon: "🌟" }
        ]
    }
];

const alterEgos = {
    warrior: {
        title: "The Warrior",
        description: "You are a fierce and determined fighter! Your alter ego channels the spirit of ancient warriors and modern heroes combined.",
        icon: "⚔️",
        costumeIdeas: "Consider dressing as: Gladiator, Ninja, Superhero, Viking, or Amazonian Warrior",
        color: "#ef4444",
        image: "https://i.ibb.co/2sxT6jZ/Retro-80s-Human-Flying-Poster-cropped.jpg",
        particleColor: "#ff4444"
    },
    artist: {
        title: "The Mystic Artist",
        description: "You are a creative soul with supernatural flair! Your alter ego brings imagination to life through magical artistic powers.",
        icon: "🎨",
        costumeIdeas: "Consider dressing as: Enchanted Painter, Musical Sorcerer, Creative Spirit, Art Deity, or Color Wizard",
        color: "#a855f7",
        image: "https://i.ibb.co/W5qWCkK/mishkadoing-summer-flowers-sky-close-up-details-painting-grad-0e9886ef-403e-4514-866f-e7806fa3dad8-1.jpg",
        particleColor: "#9d4edd"
    },
    scholar: {
        title: "The Ancient Sage",
        description: "You are a seeker of knowledge with mysterious powers! Your alter ego holds the secrets of centuries past and future.",
        icon: "📚",
        costumeIdeas: "Consider dressing as: Wizard, Time-traveling Scholar, Alchemist, Ancient Philosopher, or Mystical Librarian",
        color: "#3b82f6",
        image: "https://i.ibb.co/Xp6s8KR/Monet-Flowers-Rocks-Corals.png",
        particleColor: "#3b82f6"
    },
    rebel: {
        title: "The Chaotic Mastermind",
        description: "You are a strategic genius with a rebellious streak! Your alter ego plays by their own rules and always stays one step ahead.",
        icon: "🎭",
        costumeIdeas: "Consider dressing as: Mad Scientist, Cyber-hacker, Charming Trickster, Revolutionary Leader, or Chaos Agent",
        color: "#22c55e",
        image: "https://i.ibb.co/cYp3hCD/Field-of-Wildflowers-Constellations.png",
        particleColor: "#22c55e"
    },
    healer: {
        title: "The Divine Healer",
        description: "You are a compassionate soul with healing powers! Your alter ego channels divine energy to help and protect others.",
        icon: "✨",
        costumeIdeas: "Consider dressing as: Angel, Nature Spirit, Medical Superhero, Mystic Healer, or Light Bearer",
        color: "#eab308",
        image: "https://i.ibb.co/5FP5HD9/Summer-Flowers-Sky-Close-Up.png",
        particleColor: "#eab308"
    }
};

function shuffleArray(array) {
    // Create a copy of the array to avoid modifying the original
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function animateReveal(container, callback) {
    const dissolveFilter = document.querySelector('#dissolve-filter');
    const displacementMap = dissolveFilter.querySelector('feDisplacementMap');
    const bigNoise = dissolveFilter.querySelector('feTurbulence[result="bigNoise"]');
    
    // Set random seed for variation
    const randomSeed = Math.floor(Math.random() * 1000);
    bigNoise.setAttribute('seed', randomSeed);

    // Apply filter to container
    container.style.filter = 'url(#dissolve-filter)';
    container.style.transform = 'scale(1)';
    container.style.opacity = '1';

    const duration = 1000;
    const startTime = performance.now();
    const maxDisplacementScale = 2000;

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);

        const displacementScale = easedProgress * maxDisplacementScale;
        displacementMap.setAttribute('scale', displacementScale);

        const scaleFactor = 1 + 0.1 * easedProgress;
        container.style.transform = `scale(${scaleFactor})`;

        if (progress < 0.5) {
            container.style.opacity = '1';
        } else {
            const opacityProgress = (progress - 0.5) / 0.5;
            container.style.opacity = (1 - opacityProgress).toString();
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            container.style.filter = '';
            container.style.transform = 'scale(1)';
            container.style.opacity = '1';
            if (callback) callback();
        }
    }

    requestAnimationFrame(animate);
}

class Quiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.init();
    }

    init() {
        this.updateQuestion();
        this.updateProgress();
    }

    updateProgress() {
        const progress = document.getElementById('progress');
        const counter = document.getElementById('question-counter');
        const progressWidth = (this.currentQuestion / questions.length) * 100;
        progress.style.width = `${progressWidth}%`;
        counter.textContent = `Question ${this.currentQuestion + 1} of ${questions.length}`;
    }

    updateQuestion() {
        const questionIcon = document.getElementById('question-icon');
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const backButton = document.getElementById('back-button');

        // Show/hide back button
        if (backButton) {
            backButton.style.display = this.currentQuestion > 0 ? 'flex' : 'none';
            // Remove old event listeners to prevent double-firing
            const newBackButton = backButton.cloneNode(true);
            backButton.parentNode.replaceChild(newBackButton, backButton);
            // Remove the onclick attribute and use addEventListener instead
            newBackButton.removeAttribute('onclick');
            newBackButton.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent any default behavior
                if (this.currentQuestion > 0) {
                    this.currentQuestion--;
                    this.answers.pop();
                    this.updateQuestion();
                    this.updateProgress();
                }
            });
        }

        const currentQ = questions[this.currentQuestion];
        questionIcon.textContent = currentQ.icon;
        questionText.textContent = currentQ.question;

        // Create an array of indices to keep track of original positions
        const optionsWithIndices = currentQ.options.map((option, index) => ({
            ...option,
            originalIndex: index
        }));

        // Shuffle the options while keeping track of their original indices
        const shuffledOptions = shuffleArray(optionsWithIndices);

        optionsContainer.innerHTML = '';
        shuffledOptions.forEach((option) => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.innerHTML = `
                <span>${option.icon}</span>
                <span>${option.text}</span>
            `;
            // Use the originalIndex when handling the answer
            button.addEventListener('click', () => this.handleAnswer(option.originalIndex));
            optionsContainer.appendChild(button);
        });
    }

    handleAnswer(answerIndex) {
        this.answers.push(answerIndex);
        
        if (this.currentQuestion < questions.length - 1) {
            this.currentQuestion++;
            this.updateQuestion();
            this.updateProgress();
        } else {
            // Set progress to 100% before showing result
            const progress = document.getElementById('progress');
            progress.style.width = '100%';
            this.showResult();
        }
    }

    calculateResult() {
        const scores = {
            warrior: 0,
            artist: 0,
            scholar: 0,
            rebel: 0,
            healer: 0
        };

        // Question weights for different alter egos
        const weights = [
            // Evening activities
            {
                warrior: 2.0, artist: 2.0, scholar: 1.5, rebel: 1.0, healer: 1.5
            },
            // Superpowers
            {
                warrior: 1.5, artist: 1.0, scholar: 2.0, rebel: 1.5, healer: 2.0
            },
            // Motivation
            {
                warrior: 1.5, artist: 2.0, scholar: 1.5, rebel: 2.0, healer: 1.5
            },
            // Environment
            {
                warrior: 1.0, artist: 1.5, scholar: 2.0, rebel: 1.5, healer: 1.0
            },
            // Life motto
            {
                warrior: 1.5, artist: 1.5, scholar: 1.5, rebel: 1.5, healer: 2.0
            }
        ];

        // Primary and secondary trait mapping for each answer
        const answerMapping = [
            // Evening activities answers
            [
                ['warrior', 'rebel'],    // Training
                ['artist', 'scholar'],   // Creating art
                ['scholar', 'healer'],   // Reading
                ['rebel', 'warrior'],    // Planning domination
                ['healer', 'artist']     // Helping others
            ],
            // Superpower answers
            [
                ['warrior', 'rebel'],    // Super strength
                ['artist', 'rebel'],     // Invisibility
                ['scholar', 'healer'],   // Mind reading
                ['rebel', 'scholar'],    // Time control
                ['healer', 'warrior']    // Healing powers
            ],
            // Motivation answers
            [
                ['warrior', 'rebel'],    // Glory
                ['artist', 'scholar'],   // Self-expression
                ['scholar', 'healer'],   // Knowledge
                ['rebel', 'warrior'],    // Power
                ['healer', 'artist']     // Making difference
            ],
            // Environment answers
            [
                ['warrior', 'rebel'],    // Gym
                ['artist', 'scholar'],   // Studio
                ['scholar', 'healer'],   // Library
                ['rebel', 'warrior'],    // Lair
                ['healer', 'artist']     // Community center
            ],
            // Life motto answers
            [
                ['warrior', 'rebel'],    // No pain no gain
                ['artist', 'healer'],    // Express yourself
                ['scholar', 'artist'],   // Knowledge is power
                ['rebel', 'warrior'],    // Break rules
                ['healer', 'scholar']    // Be the change
            ]
        ];

        // Calculate weighted scores
        this.answers.forEach((answer, questionIndex) => {
            const questionWeight = weights[questionIndex];
            const traits = answerMapping[questionIndex][answer];
            
            // Primary trait gets full weight
            scores[traits[0]] += questionWeight[traits[0]];
            // Secondary trait gets half weight
            scores[traits[1]] += questionWeight[traits[1]] * 0.5;
        });

        // Find the highest scoring alter ego
        return Object.entries(scores).reduce((max, [type, score]) => 
            score > max.score ? {type, score} : max,
            {type: 'warrior', score: -Infinity}
        ).type;
    }

    showResult() {
        const result = alterEgos[this.calculateResult()];
        const quizContent = document.getElementById('quiz-content');
        
        // Hide progress elements
        document.querySelector('.progress-container').style.display = 'none';
        document.querySelector('.question-counter').style.display = 'none';
        
        // First show the pre-reveal screen
        quizContent.innerHTML = `
            <div class="pre-reveal-container">
                <h2>Your Alter Ego Awaits...</h2>
                <button class="reveal-button">Reveal My Trait</button>
            </div>
        `;

        // Add click handler for reveal button
        document.querySelector('.reveal-button').addEventListener('click', () => {
            const container = document.querySelector('.quiz-container');
            
            // Start the reveal animation
            animateReveal(container, () => {
                // Show the result after animation
                quizContent.innerHTML = `
                    <div class="result-container">
                        <div class="result-image" style="background-image: url('${result.image}')"></div>
                        <div class="result-icon">${result.icon}</div>
                        <h2 class="result-title">${result.title}</h2>
                        <div class="result-description">
                            ${result.description}
                        </div>
                        <div class="costume-ideas">
                            <h3>Costume Ideas</h3>
                            <p>${result.costumeIdeas}</p>
                        </div>
                        <button class="reset-button" onclick="window.location.reload()">
                            🔄 Take Quiz Again
                        </button>
                    </div>
                `;
            });
        });
    }

    resetQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        this.updateQuestion();
        this.updateProgress();
    }

    // Add method to handle going back
    goBack() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.answers.pop(); // Remove the last answer
            this.updateQuestion();
            this.updateProgress();
        }
    }
}

// Start the quiz when the page loads
window.onload = () => {
    quizInstance = new Quiz();
}; 