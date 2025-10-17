// Card data
const cardData = [
    {
        id: 1,
        title: "Web Development",
        description: "We create responsive and modern websites that help your business grow online with the latest technologies.",
        imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
        buttonText: "Learn More"
    },
    {
        id: 2,
        title: "Mobile Apps",
        description: "Build powerful mobile applications for iOS and Android that provide seamless user experiences.",
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        buttonText: "Get Started"
    },
    {
        id: 3,
        title: "Digital Marketing",
        description: "Boost your online presence with our comprehensive digital marketing strategies and campaigns.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1415&q=80",
        buttonText: "Explore"
    },
    {
        id: 4,
        title: "UI/UX Design",
        description: "Create beautiful and intuitive user interfaces that enhance user engagement and satisfaction.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        buttonText: "Discover"
    }
];

// Create card HTML
function createCard(card) {
    return `
        <div class="card">
            <div class="card-image-container">
                <img src="${card.imageUrl}" alt="${card.title}" class="card-image">
            </div>
            <div class="card-content">
                <h3 class="card-title">${card.title}</h3>
                <p class="card-description">${card.description}</p>
                <button class="card-button" data-card-id="${card.id}">
                    ${card.buttonText} <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
}

// Render all cards
function renderCards() {
    const container = document.getElementById('cards-container');
    if (container) {
        container.innerHTML = cardData.map(card => createCard(card)).join('');
        console.log('Cards rendered successfully!');
    } else {
        console.error('Cards container not found!');
    }
}

// Handle button clicks
function handleCardClick(cardId) {
    const card = cardData.find(c => c.id === cardId);
    if (card) {
        alert(`You clicked on: ${card.title}\n\n${card.description}`);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, rendering cards...');
    renderCards();
    
    // Add click listeners
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('card-button')) {
            const cardId = parseInt(e.target.getAttribute('data-card-id'));
            handleCardClick(cardId);
        }
    });
});