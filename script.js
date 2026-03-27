


window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadModCount = document.getElementById('loadModCount');
    let count = 0;
    
    
    document.body.classList.add('loading-active');
    
    
    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 4) + 1; 
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            setTimeout(() => {
                if(loadingScreen) {
                    loadingScreen.classList.add('hidden');
                    
                    document.body.classList.remove('loading-active');
                    
                    setTimeout(() => loadingScreen.remove(), 800);
                }
            }, 800); 
        }
        if(loadModCount) loadModCount.textContent = count;
    }, 40); 
});


AOS.init({
    duration: 700,
    once: true,
    offset: 60,
    easing: 'ease-out-cubic'
});


const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.style.background = window.scrollY > 10
        ? 'rgba(10,10,10,0.97)'
        : 'rgba(10,10,10,0.85)';
});


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(s => observer.observe(s));


const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});


navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
    });
});


const phrases = [
    'always learning.',
    'building full stack apps.',
    'open to work.',
    'a team player.',
    'a problem solver.'
];

const el = document.getElementById('typewriter');
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;

function type() {
    if (!el) return;
    const cur = phrases[phraseIdx];

    if (!deleting) {
        el.textContent = cur.slice(0, ++charIdx);
        if (charIdx === cur.length) {
            deleting = true;
            setTimeout(type, 2200);
            return;
        }
    } else {
        el.textContent = cur.slice(0, --charIdx);
        if (charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
        }
    }

    setTimeout(type, deleting ? 45 : 95);
}
setTimeout(type, 800);


const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.style.display = match ? '' : 'none';

            
            if (match) {
                card.classList.remove('aos-animate');
                void card.offsetWidth; 
                card.classList.add('aos-animate');
            }
        });
    });
});


document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) {
            e.preventDefault();
            t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
const skillPanels  = document.querySelectorAll('.skill-panel');

function animateBarsInPanel(panel) {
    panel.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.classList.remove('animated');
        
        void bar.offsetWidth;
        bar.classList.add('animated');
    });
}

skillTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        skillTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const target = btn.dataset.tab;
        skillPanels.forEach(p => {
            p.classList.remove('active');
            if (p.dataset.panel === target) {
                p.classList.add('active');
                
                setTimeout(() => animateBarsInPanel(p), 30);
            }
        });
    });
});


const defaultPanel = document.querySelector('.skill-panel.active');
if (defaultPanel) {
    
    setTimeout(() => animateBarsInPanel(defaultPanel), 600);
}


const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const barObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const active = document.querySelector('.skill-panel.active');
                if (active) animateBarsInPanel(active);
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    barObserver.observe(skillsSection);
}


const modalOverlay  = document.getElementById('projectModal');
const modalClose    = document.getElementById('modalClose');
const modalImg      = document.getElementById('modalImg');
const modalTitle    = document.getElementById('modalTitle');
const modalYear     = document.getElementById('modalYear');
const modalDesc     = document.getElementById('modalDesc');
const modalFeatures = document.getElementById('modalFeatures');
const modalTech     = document.getElementById('modalTech');
const modalLive     = document.getElementById('modalLive');
const modalGithub   = document.getElementById('modalGithub');

function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

window.openModal = function(cardBtn) {
    const card = cardBtn.closest('.project-card') || cardBtn;

    if (modalImg)   { modalImg.src = card.dataset.img || ''; modalImg.alt = card.dataset.title || ''; }
    if (modalTitle) modalTitle.textContent = card.dataset.title || '';
    if (modalYear && card.dataset.year)  modalYear.textContent = card.dataset.year;
    if (modalDesc)  modalDesc.textContent = card.dataset.desc || '';

    if (modalFeatures) {
        modalFeatures.innerHTML = '';
        const feats = (card.dataset.features || '').split('|');
        feats.forEach(f => {
            if (f.trim()) {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check-circle"></i> ${f.trim()}`;
                modalFeatures.appendChild(li);
            }
        });
    }

    if (modalTech) {
        modalTech.innerHTML = '';
        (card.dataset.tech || '').split(',').forEach(t => {
            if (t.trim()) {
                const span = document.createElement('span');
                span.className = 'tech-badge';
                span.textContent = t.trim();
                modalTech.appendChild(span);
            }
        });
    }

    if (modalLive)   modalLive.href   = card.dataset.live   || '#';
    if (modalGithub) modalGithub.href = card.dataset.github || '#';

    if (modalOverlay) {
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
};

if (modalClose)   modalClose.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
