let quizInstance;

const questions = [
    {
        question: "How do you get your caffeine hit?",
        icon: "🍵",
        options: [
            { text: "Me & the office coffee machine are in a loving, committed relationship", icon: "🥰" },      // warrior
            { text: "Energy drink baby!", icon: "⚡️" },        // artist
            { text: "The café next door never fails me", icon: "☕️" },          // scholar
            { text: "None needed. I'm high on office vibes already <3", icon: "😎" }     // rebel
        ]
    },
    {
        question: "When do you rock up to work?",
        icon: "🕒",
        options: [
            { text: "Early bird gets the worm", icon: "🪱" },               // warrior
            { text: "I cruise in at midday (if I decide to show up that day)", icon: "🙃" },                // artist
            { text: "Fashionably late xo", icon: "💅" },                // scholar
            { text: "Bang on time", icon: "⏰" }                  // rebel
        ]
    },
    {
        question: "What do you wear to the office?",
        icon: "👕",
        options: [
            { text: "Dad core ", icon: "🤘" },       // warrior
            { text: "A step above pyjamas", icon: "💤" },             // artist
            { text: "I dress to impress", icon: "🕴️" },        // scholar
            { text: "Like a secret millionaire (Mark Zuckerberg vibes)", icon: "💸" }          // rebel
        ]
    },
    {
        question: "It's 3pm. What little treat are you grabbing?",
        icon: "🍰",
        options: [
            { text: "My five a day", icon: "🍎" },              // warrior
            { text: "Cheese. Like the little rat I am", icon: "🧀" },             // artist
            { text: "Raiding the choccy drawer ", icon: "🍫" },             // scholar
            { text: "Snacking is for the weak", icon: "💪" }                 // rebel
        ]
    },
    {
        question: "What's your desktop screensaver?",
        icon: "🖥️",
        options: [
            { text: "Mi familia", icon: "🫶" },           // warrior
            { text: "Something silly", icon: "😝" },     // artist
            { text: "Holiday pics (#wanderlust)", icon: "🌅" },          // scholar
            { text: "The default. I'm too busy for that nonsense", icon: "🫥" }  // rebel
        ]
    },
    {
        question: "You're on a video call. Who are you?",
        icon: "📞",
        options: [
            { text: "The one with the goofy background", icon: "🏞️" },           // warrior
            { text: "The mic-hogger (I'm a yapper)", icon: "🎙️" },          // artist
            { text: "Nelly No Camera", icon: "😶‍" },               // scholar
            { text: "Devil's advocate", icon: "😈" }          // rebel
        ]
    }
];

const alterEgos = {
    warrior: {
        title: "💥 THE WILD CARD 💥",
        uniqueDescription: "At work you're pure, wholesome and a bit of a goody two shoes.",
        description: "Your alter ego is larger than life, unpredictable and thrives on the element of surprise. They're not afraid to turn heads.",
        inspiration: "Miley Cyrus, Corey Worthington, Tyler Durden",
        costumeIdeas: "Take a risk. We want to see bold prints, statement accessories and edgy outfits. Or, in true wild card fashion, wear something no one would expect.",
        image: "https://i.ibb.co/2sxT6jZ/Retro-80s-Human-Flying-Poster-cropped.jpg"
    },
    artist: {
        title: "👴 THE OLD TIMER 👵",
        uniqueDescription: "You bring youthful, restless and rebellious energy to the workplace",
        description: "Like a fine wine, your alter ego just gets better with age. You're sturdy, full of wisdom and like to embrace tradition. If it ain’t broke, don’t fix it.",
        inspiration: "Robert DeNiro, Mufasa and Meryl Streep",
        costumeIdeas: "Consider dressing as: Enchanted Painter, Musical Sorcerer, Creative Spirit, Art Deity, or Color Wizard",
        image: "https://i.ibb.co/1djDm4R/Screenshot-2024-11-14-at-12-21-00-PM.jpg"
    },
    scholar: {
        title: "☮️ HIPPIE DIPPY ☮️",
        uniqueDescription: "At work you're a bit of a diva and love to indulge in a little treat.",
        description: "Your alter ego is a grounded free spirit that finds beauty in simplicity and natural harmony.",
        inspiration: "Lennon and Yoko, Penny Lane and Almond Mum",
        costumeIdeas: "Whip out those Earthy tones, loose fitting clothes and layered jewellery. We want you to go full barefoot, elephant pants (but please don't skip the deodorant…)",
        image: "https://i.ibb.co/Lrn2zvT/Screenshot-2024-11-14-at-12-21-08-PM.jpg"
    },
    rebel: {
        title: "👯 DEPENDENT 👯",
        uniqueDescription: "Typically you're defiant, independent and a little devious in the workplace.",
        description: "While you're typically a lone wolf, your alter ego needs their partner in crime to thrive. You're two halves of a whole that complement each other perfectly and can accomplish anything together.",
        inspiration: "Batman & Robin, Miley Cyrus & Hannah Montana and Steve Irwin & The Stingray",
        costumeIdeas: "Pair up with another 'Dependent' and dress as your fav iconic duo.",
        image: "https://i.ibb.co/f2zTkJc/PNG-image.jpg"
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

function detectMobile() {
    // Check for touch capability
    const hasTouch = 'ontouchstart' in window || 
                     navigator.maxTouchPoints > 0 ||
                     navigator.msMaxTouchPoints > 0;
    
    // Check for mobile/tablet device in user agent
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check viewport width
    const isNarrowScreen = window.innerWidth <= 768;
    
    // Check device memory (if available)
    const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;

    // Return true if device shows multiple mobile characteristics
    return (hasTouch && (isMobileDevice || isNarrowScreen)) || 
           (isNarrowScreen && hasLowMemory);
}

function animateReveal(container, callback) {
    const dissolveFilter = document.querySelector('#dissolve-filter');
    const displacementMap = dissolveFilter.querySelector('feDisplacementMap');
    const bigNoise = dissolveFilter.querySelector('feTurbulence[result="bigNoise"]');
    
    // Use the new detection method
    const isMobile = detectMobile();
    
    // Reduce complexity for mobile
    const duration = isMobile ? 800 : 1000; // Shorter duration on mobile
    const maxDisplacementScale = isMobile ? 1000 : 2000; // Lower displacement on mobile
    
    // Set random seed for variation
    const randomSeed = Math.floor(Math.random() * 1000);
    bigNoise.setAttribute('seed', randomSeed);
    
    // Optimize noise frequency for mobile
    if (isMobile) {
        bigNoise.setAttribute('baseFrequency', '0.008'); // Increase base frequency
        bigNoise.setAttribute('numOctaves', '1'); // Reduce complexity
    }

    // Apply filter to container
    container.style.filter = 'url(#dissolve-filter)';
    container.style.transform = 'scale(1)';
    container.style.opacity = '1';
    
    // Force browser to use GPU acceleration
    container.style.willChange = 'transform, opacity';

    const startTime = performance.now();

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);

        // Reduce number of calculations
        if (progress < 1) {
            const displacementScale = easedProgress * maxDisplacementScale;
            displacementMap.setAttribute('scale', displacementScale);

            // Only update these if not on mobile or if essential
            if (!isMobile) {
                const scaleFactor = 1 + 0.1 * easedProgress;
                container.style.transform = `scale(${scaleFactor})`;
            }

            // Simplified opacity handling
            container.style.opacity = progress < 0.5 ? '1' : String(1 - (progress - 0.5) * 2);

            requestAnimationFrame(animate);
        } else {
            // Cleanup
            container.style.filter = '';
            container.style.transform = 'scale(1)';
            container.style.opacity = '1';
            container.style.willChange = 'auto';
            if (callback) callback();
        }
    }

    requestAnimationFrame(animate);
}

// Add this function to preload images
function preloadImages() {
    // Get all image URLs from alterEgos
    const imageUrls = Object.values(alterEgos).map(ego => ego.image);
    
    // Create an array to track loading promises
    const loadPromises = imageUrls.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => reject(url);
            img.src = url;
        });
    });

    // Return promise that resolves when all images are loaded
    return Promise.all(loadPromises);
}

class Quiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.init();
        
        // Start preloading images immediately
        preloadImages()
            .then(() => console.log('All images preloaded'))
            .catch(error => console.log('Error preloading some images:', error));
    }

    init() {
        // Show start screen instead of first question
        this.showStartScreen();
    }

    showStartScreen() {
        const quizContent = document.getElementById('quiz-content');
        const cardHeader = document.querySelector('.card-header');
        const card = document.getElementById('quiz-card');
        
        // Add class for start screen specific styling
        card.classList.add('start-screen-active');
        
        cardHeader.innerHTML = `
            <p class="pre-title">Discover your</p>
            <img src="https://i.ibb.co/JqbQ9zM/alter-ego.png" alt="Discover Your Alter Ego" class="quiz-header-image">
        `;
        
        quizContent.innerHTML = `
            <div class="start-screen">
                <button class="start-button">Start Quiz</button>
            </div>
        `;

        // Add click handler for start button
        document.querySelector('.start-button').addEventListener('click', () => {
            cardHeader.innerHTML = ''; // Remove header content for questions
            card.classList.remove('start-screen-active'); // Remove extra padding
            this.startQuiz();
        });
    }

    startQuiz() {
        // Add the question container structure first
        const quizContent = document.getElementById('quiz-content');
        const cardHeader = document.querySelector('.card-header');
        
        // Add progress bar to header - start at 0 progress
        cardHeader.innerHTML = `
            <div class="progress-container">
                <div class="progress-bar" style="width: 0%"></div>
            </div>
        `;
        
        quizContent.innerHTML = `
            <div class="question-container">
                <div class="icon" id="question-icon"></div>
                <h2 id="question-text"></h2>
                <div class="options-container" id="options-container"></div>
            </div>
        `;
        
        // Then update with the first question
        this.updateQuestion();
    }

    updateQuestion() {
        const questionIcon = document.getElementById('question-icon');
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');

        const currentQ = questions[this.currentQuestion];
        questionIcon.textContent = currentQ.icon;
        questionText.textContent = currentQ.question;

        // Create array of options with their original indices
        const optionsWithIndices = currentQ.options.map((option, index) => ({
            ...option,
            originalIndex: index  // Store the original index for scoring
        }));

        // Shuffle the options
        const shuffledOptions = shuffleArray(optionsWithIndices);

        // Render the shuffled options
        optionsContainer.innerHTML = '';
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.innerHTML = `
                <span>${option.icon}</span>
                <span>${option.text}</span>
            `;
            // Use the originalIndex for scoring
            button.addEventListener('click', () => this.handleAnswer(option.originalIndex));
            optionsContainer.appendChild(button);
        });
    }

    handleAnswer(answerIndex) {
        this.answers.push(answerIndex);
        
        if (this.currentQuestion < questions.length - 1) {
            this.currentQuestion++;
            // Update progress bar based on completed questions
            const progressBar = document.querySelector('.progress-bar');
            progressBar.style.width = `${(this.currentQuestion) / (questions.length - 1) * 100}%`;
            this.updateQuestion();
        } else {
            this.showResult();
        }
    }

    calculateResult() {
        // Count occurrences of each answer index
        const counts = this.answers.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});

        // Find the highest count
        const maxCount = Math.max(...Object.values(counts));
        
        // Get all answers that have the highest count (could be multiple in case of tie)
        const topAnswers = Object.entries(counts)
            .filter(([_, count]) => count === maxCount)
            .map(([answer]) => parseInt(answer));

        // If there's a tie, randomly select one of the top answers
        const result = topAnswers.length > 1 
            ? topAnswers[Math.floor(Math.random() * topAnswers.length)]
            : topAnswers[0];

        // Map answer index to alter ego type
        const types = ['warrior', 'artist', 'scholar', 'rebel'];
        return types[result];
    }

    showResult() {
        const result = alterEgos[this.calculateResult()];
        const quizContent = document.getElementById('quiz-content');
        const cardHeader = document.querySelector('.card-header');
        
        cardHeader.style.display = 'none';
        
        quizContent.innerHTML = `
            <div class="pre-reveal-container">
                <h2>Your Alter Ego Awaits...</h2>
                <button class="reveal-button">Reveal My Trait</button>
            </div>
        `;

        document.querySelector('.reveal-button').addEventListener('click', () => {
            const container = document.querySelector('.quiz-container');
            
            animateReveal(container, () => {
                quizContent.innerHTML = `
                    <div class="result-container">
                        <div class="result-image" style="background-image: url('${result.image}')"></div>
                        <div class="result-content">
                            <div class="result-header">
                                <p class="unique-description">${result.uniqueDescription}</p>
                                <div class="party-section">
                                    <p class="party-intro">So for the 2024 Akcelo Christmas Party, your alter ego is...</p>
                                    <h2 class="result-title">
                                        <span class="emoji">${result.title.split(' ')[0]}</span>
                                        <span class="title-text">${result.title.split(' ').slice(1, -1).join(' ')}</span>
                                        <span class="emoji">${result.title.split(' ').pop()}</span>
                                    </h2>
                                </div>
                            </div>
                            <div class="result-details">
                                <div class="result-description">
                                    ${result.description}
                                    <p class="inspiration">Think <em>${result.inspiration}</em></p>
                                </div>
                                <div class="costume-ideas">
                                    <h3>Outfit inspo</h3>
                                    <p>${result.costumeIdeas}</p>
                                </div>
                            </div>
                            <button class="reset-button" onclick="window.location.reload()">
                                🔄 Take Quiz Again
                            </button>
                        </div>
                    </div>
                `;
            });
        });
    }

    resetQuiz() {
        const cardHeader = document.querySelector('.card-header');
        cardHeader.style.display = 'block';
        
        this.currentQuestion = 0;
        this.answers = [];
        this.updateQuestion();
    }
}

// Start the quiz when the page loads
window.onload = () => {
    quizInstance = new Quiz();
}; 