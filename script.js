document.addEventListener('DOMContentLoaded', () => {
    // Fetch and Populate Data
    fetchData();

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial check for elements
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

async function fetchData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        populateUI(data);
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback or direct message if fetch fails (e.g. file protocol)
        const bioElement = document.getElementById('user-bio');
        if (bioElement) {
            bioElement.innerHTML = `
                <div style="background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 4px; border: 1px solid red;">
                    <strong>Notice:</strong> Please run this website using a local server (e.g., Live Server in VS Code) to load the JSON content correctly.
                </div>
            `;
        }
    }
}

function populateUI(data) {
    const { personalInfo, researchInterests, publications } = data;

    // Hero Section
    document.getElementById('user-name').textContent = personalInfo.name + '.';
    document.getElementById('user-title').textContent = personalInfo.title + '.';
    document.getElementById('user-bio').textContent = personalInfo.bio;
    document.getElementById('email-link').href = `mailto:${personalInfo.email}`;

    // Footer Links
    document.getElementById('linkedin-link').href = personalInfo.social.linkedin;
    document.getElementById('scholar-link').href = personalInfo.social.scholar;
    document.getElementById('twitter-link').href = personalInfo.social.twitter;

    // Research Interests
    const interestGrid = document.getElementById('interest-grid');
    interestGrid.innerHTML = '';
    researchInterests.forEach(interest => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <i class="bi ${interest.icon}"></i>
            <h3>${interest.title}</h3>
            <p>${interest.description}</p>
        `;
        interestGrid.appendChild(card);
    });

    // Publications
    const pubList = document.getElementById('publication-list');
    pubList.innerHTML = '';
    publications.forEach(pub => {
        const item = document.createElement('div');
        item.className = 'pub-item';
        item.innerHTML = `
            <h3>${pub.title}</h3>
            <p style="color: var(--text-dim); margin: 0.5rem 0;">${pub.authors}</p>
            <div class="pub-tags">
                <span><i class="bi bi-calendar"></i> ${pub.year}</span>
                <span><i class="bi bi-journal-text"></i> ${pub.journal}</span>
                ${pub.link !== '#' ? `<a href="${pub.link}" target="_blank" style="color: var(--accent); text-decoration: none;"><i class="bi bi-link-45deg"></i> View Paper</a>` : ''}
            </div>
        `;
        pubList.appendChild(item);
    });
}
