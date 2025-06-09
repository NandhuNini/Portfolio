// Typing Animation
class TypingAnimation {
    constructor(element, texts, speed = 100, delay = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.delay = delay;
        this.currentTextIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const fullText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = fullText.substring(0, this.currentText.length + 1);
        }

        this.element.textContent = this.currentText;

        let timeout = this.speed;
        if (this.isDeleting) timeout /= 2;

        if (!this.isDeleting && this.currentText === fullText) {
            timeout = this.delay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            timeout = 500;
        }

        setTimeout(() => this.type(), timeout);
    }
}

// AI Assistant
// Remove the AIAssistant class completely

// Update CursorFollower class to FaceCursor
class FaceCursor {
    constructor() {
        this.cursor = document.getElementById('face-cursor');
        this.follower = document.getElementById('cursor-follower');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                // Face cursor follows with slight delay for smooth effect
                this.cursor.style.left = e.clientX - 20 + 'px';
                this.cursor.style.top = e.clientY - 20 + 'px';
                
                // Small follower dot follows directly
                this.follower.style.left = e.clientX - 5 + 'px';
                this.follower.style.top = e.clientY - 5 + 'px';
            });
        });

        // Add hover effects
        document.querySelectorAll('a, button, .project-card').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
            });
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
            });
        });
    }
}

// In the DOMContentLoaded event, replace AIAssistant with FaceCursor
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        new TypingAnimation(typingElement, [
            'AI/ML Engineer',
            'Data Science Engineer',
            'UI/UX Designer',
            'Creative Innovator',
            'Problem Solver'
        ]);
    }
    
    // Initialize other components
    new FaceCursor(); // Replaced CursorFollower with FaceCursor
    new ProjectFilters();
    new SkillsAnimation();
    new Navigation();
    
    // Close modal when clicking outside
    document.getElementById('project-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
    
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});

// Cursor Follower
class CursorFollower {
    constructor() {
        this.follower = document.getElementById('cursor-follower');
        this.face = document.getElementById('face-cursor');
        this.offsetX = 20; // distance away from the cursor
        this.offsetY = 20;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                // Move small cursor follower
                this.follower.style.left = (e.clientX - 5) + 'px';
                this.follower.style.top = (e.clientY - 5) + 'px';

                // Move the face image slightly away
                this.face.style.left = (e.clientX + this.offsetX) + 'px';
                this.face.style.top = (e.clientY + this.offsetY) + 'px';
            });
        });
    }
}


// Project Filters
class ProjectFilters {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.categories = document.querySelectorAll('.projects-category');
        this.init();
    }

    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setActiveFilter(e.target);
                this.filterProjects(filter);
            });
        });
    }

    setActiveFilter(activeBtn) {
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    filterProjects(filter) {
        if (filter === 'all') {
            this.categories.forEach(category => {
                category.style.display = 'block';
            });
        } else {
            this.categories.forEach(category => {
                if (category.id === `${filter}-projects`) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        }
    }
}

// Skills Animation
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.proficiency-fill');
        this.animated = false;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateSkills();
                    this.animated = true;
                }
            });
        }, { threshold: 0.5 });

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    animateSkills() {
        this.skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const progress = bar.dataset.progress;
                bar.style.width = progress + '%';
            }, index * 200);
        });
    }
}

// Navigation
class Navigation {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollToSection(targetId);
            });
        });

        window.addEventListener('scroll', () => {
            this.updateActiveNav();
        });
    }

    updateActiveNav() {
        let current = '';
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
}

// Project Data
const projectData = {
    'crop-recommendation': {
        title: 'Crop and Fertilizers Recommendation using Random Forest',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
        overview: 'This smart agriculture system leverages machine learning to recommend optimal crops and fertilizers based on soil conditions, weather patterns, and environmental factors. The Random Forest algorithm analyzes multiple parameters to provide accurate recommendations for farmers.',
        features: [
            'Soil condition analysis',
            'Weather pattern integration',
            'Crop yield prediction',
            'Fertilizer optimization',
            'User-friendly interface'
        ],
        technologies: ['Python', 'Random Forest', 'Scikit-learn', 'Pandas', 'NumPy'],
        results: 'Achieved 92% accuracy in crop recommendations and helped farmers increase yield by 25% through optimized fertilizer usage.',
        githubUrl: 'https://github.com/NandhuNini/Crop-recommendation'
    },
    'leaf-disease': {
        title: 'Leaf Disease Prediction using CNN-EfficientNet',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
        overview: 'Advanced computer vision system that detects plant diseases from leaf images using EfficientNet architecture. The model can identify multiple disease types and severity levels, enabling early intervention and treatment.',
        features: [
            'Multi-disease detection',
            'Severity assessment', 
            'Real-time processing',
            'Mobile-friendly interface',
            'Treatment recommendations'
        ],
        technologies: ['Python', 'TensorFlow', 'EfficientNet', 'OpenCV', 'Keras'],
        results: 'Achieved 94% accuracy in disease detection across 15 different plant species and disease types.',
        githubUrl: 'https://github.com/NandhuNini/Leaf-Disease-Prediction'
    },
    'speech-recognition': {
        title: 'Speech Recognition System',
        image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
        overview: 'Real-time speech recognition system with natural language processing capabilities. Features voice command processing, multi-language support, and intelligent response generation for interactive applications.',
        features: [
            'Real-time speech processing',
            'Multi-language support',
            'Voice command recognition',
            'Natural language understanding',
            'Custom wake word detection'
        ],
        technologies: ['Python', 'Speech API', 'NLP', 'NLTK', 'spaCy'],
        results: 'Achieved 96% accuracy in speech recognition with sub-200ms response time for voice commands.',
        githubUrl: 'https://github.com/NandhuNini/Speech_recognition_system/tree/main'
    },
    'ecommerce-app': {
        title: 'E-Learning Platform Design',
        image: 'https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
        overview: 'Complete UI/UX design for a modern e-learning platform featuring intuitive navigation, seamless checkout process, and engaging product discovery. Designed with user-centered approach and modern design principles.',
        features: [
            'Intuitive product navigation',
            'Seamless checkout flow',
            'Personalized recommendations',
            'Knowledge base and support',
            'Wishlist and favorites'
        ],
        technologies: ['Figma', 'Mobile Design', 'Prototyping', 'User Research'],
        results: 'Design increased user engagement by 40% and improved conversion rates by 25% during user testing phases.',
        figmaUrl: 'https://www.figma.com/proto/y6PZV079APYbOMTze9mAVy/Codexx?node-id=1-4&p=f&t=VFXgRGHOTeJxayhH-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A4'
    },
    'analytics-dashboard': {
        title: 'Cycle shop Dashboard Design',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    overview: 'A modern, responsive mobile UI/UX design tailored for a bicycle store. This concept focuses on intuitive browsing, detailed product previews, and seamless purchase flows to enhance the customer journey in purchasing cycles and accessories.',
    features: [
        'Unique symbol & wordmark',
        'Color palette & gradients',
        'Modern typography pairing',
        'Brand usage guidelines',
        'Mockups for digital and print'
        ],
        technologies: ['Figma', 'Data Visualization', 'Responsive Design', 'UX Research'],
        results: 'Improved mobilization and good health maintaining for everyone.',
        figmaUrl: 'https://www.figma.com/proto/HIpNLOTvVi6m9NKrdmf0wO/Cycle?node-id=17-4&p=f&t=FG5NG6MBID1Q2JKi-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=17%3A4'
    },
    'brand-identity': {
        title: 'Brand Identity & Logo Design',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
        overview: 'Complete brand identity design including logo creation, color palette development, typography selection, and comprehensive brand guidelines for tech startups and modern businesses.',
        features: [
            'Logo design and variations',
            'Color palette and guidelines',
            'Typography system',
            'Brand voice and messaging',
            'Application examples'
        ],
        technologies: ['Adobe Creative Suite', 'Branding', 'Logo Design', 'Typography'],
        results: 'Created memorable brand identities that increased brand recognition by 60% and improved customer engagement.',
        figmaUrl: 'https://www.figma.com/proto/d9uRcvacQ4OCeOv0xgncCx/Logos-visuals?node-id=2-8&t=LlIjaa6vuiViI2mS-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1'
    }
};

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function downloadCV() {
    alert('CV download functionality would be implemented here with actual CV file.');
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        projectType: formData.get('project-type'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    alert(`Thank you ${data.name}! Your message has been sent. I'll get back to you within 24-48 hours.`);
    
    // Reset form
    event.target.reset();
}

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content-inner');
    
    modalContent.innerHTML = `
        <h3>${project.title}</h3>
        <img src="${project.image}" alt="${project.title}" class="modal-project-image">
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
            <div>
                <h4>${project.title.includes('Design') ? 'Design Overview' : 'Project Overview'}</h4>
                <p>${project.overview}</p>
                
                <h4 style="margin-top: 1.5rem;">Key Features</h4>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div>
                <h4>${project.title.includes('Design') ? 'Design Tools' : 'Technology Stack'}</h4>
                <div class="modal-tech-tags">
                    ${project.technologies.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('')}
                </div>
                
                <h4 style="margin-top: 1.5rem;">${project.title.includes('Design') ? 'Impact' : 'Results'}</h4>
                <p>${project.results}</p>
                
                ${project.githubUrl || project.figmaUrl ? `
                    <div class="modal-links">
                        ${project.githubUrl ? `
                            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="modal-link">
                                <i class="fab fa-github"></i>
                                GitHub
                            </a>
                        ` : ''}
                        ${project.figmaUrl ? `
                            <a href="${project.figmaUrl}" target="_blank" rel="noopener noreferrer" class="modal-link">
                                <i class="fab fa-figma"></i>
                                View Design
                            </a>
                        ` : ''}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        new TypingAnimation(typingElement, [
            'AI/ML Engineer',
            'UI/UX Designer',
            'Creative Innovator',
            'Problem Solver'
        ]);
    }
    
    // Initialize other components
    new CursorFollower();
    new AIAssistant();
    new ProjectFilters();
    new SkillsAnimation();
    new Navigation();
    
    // Close modal when clicking outside
    document.getElementById('project-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
    
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});