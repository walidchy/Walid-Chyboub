


window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadModCount = document.getElementById('loadModCount');
    const loadPct = document.getElementById('loadPct');
    const loadProgressFill = document.getElementById('loadProgressFill');
    const terminalBody = document.getElementById('terminalBody');
    let count = 0;

    document.body.classList.add('loading-active');

    const terminalMessages = [
        { text: 'loading modules...', delay: 0 },
        { text: 'compiling assets... <span class="t-success">done</span>', delay: 800 },
        { text: 'initializing UI engine... <span class="t-success">ready</span>', delay: 1600 },
        { text: 'portfolio ready. <span class="t-success">launching</span> ✓', delay: 2400 },
    ];

    // Add terminal lines
    if (terminalBody) {
        terminalBody.innerHTML = '';
        terminalMessages.forEach((msg, i) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.innerHTML = '<span class="t-prompt">$</span> ' + msg.text;
                line.style.animation = 'termLine 0.3s ease forwards';
                terminalBody.appendChild(line);
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }, msg.delay);
        });
    }

    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 3) + 1;
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                    document.body.classList.remove('loading-active');
                    setTimeout(() => loadingScreen.remove(), 1000);
                }
            }, 1000);
        }
        if (loadModCount) loadModCount.textContent = count;
        if (loadPct) loadPct.textContent = count + '%';
        if (loadProgressFill) loadProgressFill.style.width = count + '%';
    }, 35);
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
const navMenu = document.querySelector('.nav-pill');

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


// ====================================================
// NAV PILL INDICATOR
// ====================================================
(function() {
    const indicator = document.getElementById('navIndicator');
    const navPill = document.querySelector('.nav-pill');
    if (!indicator || !navPill) return;

    function moveIndicator(link) {
        if (!link || window.innerWidth <= 768) return;
        const pillRect = navPill.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        indicator.style.left = (linkRect.left - pillRect.left) + 'px';
        indicator.style.width = linkRect.width + 'px';
    }

    // Initial position
    const activeLink = navPill.querySelector('.nav-link.active');
    if (activeLink) {
        setTimeout(() => moveIndicator(activeLink), 100);
    }

    // Update on active change
    const pillObserver = new MutationObserver(() => {
        const current = navPill.querySelector('.nav-link.active');
        if (current) moveIndicator(current);
    });

    navPill.querySelectorAll('.nav-link').forEach(link => {
        pillObserver.observe(link, { attributes: true, attributeFilter: ['class'] });
    });

    window.addEventListener('resize', () => {
        const current = navPill.querySelector('.nav-link.active');
        if (current) moveIndicator(current);
    });
})();


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




// ====================================================
// CURSOR PARTICLE TRAIL
// ====================================================
(function() {
    const canvas = document.getElementById('cursorCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -100, y: -100 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        for (let i = 0; i < 3; i++) {
            particles.push({
                x: mouse.x,
                y: mouse.y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1,
                size: Math.random() * 3 + 1,
                color: Math.random() > 0.5 ? '244, 63, 94' : '192, 132, 252'
            });
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            p.size *= 0.98;
            if (p.life <= 0) {
                particles.splice(i, 1);
                return;
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.life})`;
            ctx.fill();
        });
        if (particles.length > 150) particles.splice(0, particles.length - 150);
        requestAnimationFrame(animate);
    }
    animate();
})();


// ====================================================
// SCROLL REVEAL — custom lightweight observer
// ====================================================
(function() {
    // Add reveal classes to elements that don't already have AOS
    document.querySelectorAll('.stat-box').forEach(el => el.classList.add('reveal-scale'));
    document.querySelectorAll('.contact-item').forEach(el => el.classList.add('reveal-left'));
    document.querySelectorAll('.marquee-banner').forEach(el => el.classList.add('reveal-up'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });
})();


// ====================================================
// ANIMATED STAT COUNTERS
// ====================================================
(function() {
    const statNums = document.querySelectorAll('.stat-num');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const match = text.match(/(\d+)/);
                if (!match) return;
                const target = parseInt(match[1]);
                const suffix = text.replace(/\d+/, '');
                let current = 0;
                const step = Math.max(1, Math.floor(target / 40));
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    el.textContent = current + suffix;
                }, 30);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(el => counterObserver.observe(el));
})();


// ====================================================
// MAGNETIC BUTTON EFFECT
// ====================================================
(function() {
    document.querySelectorAll('.btn-red, .btn-ghost').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
})();


// ====================================================
// TILT EFFECT + GLOW FOLLOW ON PROJECT CARDS
// ====================================================
(function() {
    document.querySelectorAll('.project-card').forEach(card => {
        const glow = card.querySelector('.card-glow');

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-12px) perspective(800px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;

            if (glow) {
                glow.style.left = (e.clientX - rect.left) + 'px';
                glow.style.top = (e.clientY - rect.top) + 'px';
                glow.style.transform = 'translate(-50%, -50%)';
            }
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            if (glow) {
                glow.style.left = '50%';
                glow.style.top = '50%';
            }
        });
    });
})();




// ====================================================
// SCROLL PROGRESS BAR
// ====================================================
(function() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = (scrollTop / docHeight) * 100;
        bar.style.width = pct + '%';
    });
})();


// ====================================================
// BACK TO TOP BUTTON WITH PROGRESS RING
// ====================================================
(function() {
    const btn = document.getElementById('backToTop');
    const ring = document.getElementById('bttRingFill');
    if (!btn) return;

    const circumference = 2 * Math.PI * 16; // r=16

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollTop / docHeight;

        if (scrollTop > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }

        if (ring) {
            ring.style.strokeDashoffset = circumference - (pct * circumference);
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();




// ====================================================
// SPOTLIGHT EFFECT ON DARK SECTIONS
// ====================================================
(function() {
    const canvas = document.getElementById('spotlightCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let mouseX = -1000, mouseY = -1000;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 350);
        gradient.addColorStop(0, 'rgba(244, 63, 94, 0.03)');
        gradient.addColorStop(0.5, 'rgba(244, 63, 94, 0.01)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(draw);
    }
    draw();
})();


// ====================================================
// TEXT SCRAMBLE EFFECT ON SECTION TITLES
// ====================================================
(function() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

    function scramble(el) {
        const original = el.dataset.original || el.textContent;
        el.dataset.original = original;
        let iteration = 0;

        const interval = setInterval(() => {
            el.textContent = original.split('').map((char, i) => {
                if (i < iteration) return original[i];
                if (char === ' ') return ' ';
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');

            iteration += 1 / 2;
            if (iteration >= original.length) {
                el.textContent = original;
                clearInterval(interval);
            }
        }, 30);
    }

    const sectionTitles = document.querySelectorAll('.section-title');
    const scrambleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Scramble the text nodes (not the .red span)
                const children = entry.target.childNodes;
                children.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                        const span = document.createElement('span');
                        span.textContent = node.textContent;
                        span.classList.add('scramble-text');
                        node.replaceWith(span);
                        setTimeout(() => scramble(span), 200);
                    }
                });
                scrambleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(t => scrambleObserver.observe(t));
})();


// ====================================================
// TECH CARD RIPPLE ON CLICK
// ====================================================
(function() {
    document.querySelectorAll('.tech-logo-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
})();




// ====================================================
// PARALLAX ON HERO ELEMENTS
// ====================================================
(function() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;
        if (scrollY > heroHeight) return;

        const heroLeft = hero.querySelector('.hero-left');
        const heroRight = hero.querySelector('.hero-right');

        if (heroLeft) heroLeft.style.transform = `translateY(${scrollY * 0.15}px)`;
        if (heroRight) heroRight.style.transform = `translateY(${scrollY * 0.08}px)`;
    });
})();


// ====================================================
// FOOTER YEAR + EASTER EGG CONSOLE
// ====================================================
(function() {
    // Set footer year
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Easter egg
    console.log(
        '%c\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\n' +
        '%c  Hey there, curious developer! \uD83D\uDC40\n' +
        '%c  Built by Walid Chyboub \uD83D\uDE80\n' +
        '%c  Like what you see? Let\'s connect!\n' +
        '%c\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588',
        'color: #f43f5e; font-size: 10px;',
        'color: #fff; font-size: 14px; font-weight: bold;',
        'color: #f43f5e; font-size: 12px;',
        'color: #94a3b8; font-size: 11px;',
        'color: #f43f5e; font-size: 10px;'
    );
})();


// ====================================================
// SMOOTH SCROLL VELOCITY-BASED HEADER HIDE/SHOW
// ====================================================
(function() {
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.scrollY;
                const header = document.getElementById('header');
                if (!header) return;

                if (currentScroll > lastScroll && currentScroll > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add transition to header
    const header = document.getElementById('header');
    if (header) header.style.transition = 'transform 0.35s cubic-bezier(0.23, 1, 0.32, 1), background 0.3s ease';
})();


// ====================================================
// KONAMI CODE EASTER EGG
// ====================================================
(function() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    let konamiIndex = 0;

    document.addEventListener('keydown', e => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                konamiIndex = 0;
                activateKonami();
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateKonami() {
        document.body.style.transition = 'filter 1s';
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'hue-rotate(360deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 1000);
        }, 2000);

        // Show a fun message
        const msg = document.createElement('div');
        msg.innerHTML = '\uD83C\uDF89 You found the secret! You\'re a true dev!';
        msg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#f43f5e,#7c3aed);color:#fff;padding:24px 48px;border-radius:16px;font-size:1.2rem;font-weight:700;z-index:99999;animation:fadeSlideIn 0.5s ease;box-shadow:0 20px 60px rgba(0,0,0,0.5);font-family:Outfit,sans-serif;';
        document.body.appendChild(msg);
        setTimeout(() => {
            msg.style.transition = 'opacity 0.5s';
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 500);
        }, 3000);
    }
})();


// ====================================================
// MARQUEE SPEED UP ON HOVER
// ====================================================
(function() {
    document.querySelectorAll('.marquee-banner').forEach(banner => {
        const track = banner.querySelector('.marquee-track');
        if (!track) return;
        const defaultDuration = track.classList.contains('marquee-track-fast') ? '18s' : '25s';
        const fastDuration = track.classList.contains('marquee-track-fast') ? '8s' : '10s';
        banner.addEventListener('mouseenter', () => {
            track.style.animationDuration = fastDuration;
        });
        banner.addEventListener('mouseleave', () => {
            track.style.animationDuration = defaultDuration;
        });
    });
})();


// ====================================================
// FUN FACTS COUNTER ANIMATION
// ====================================================
(function() {
    const funNums = document.querySelectorAll('.fun-fact-num');
    if (!funNums.length) return;

    const funObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                let current = 0;
                const duration = 2000;
                const step = Math.max(1, Math.floor(target / (duration / 16)));
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    el.textContent = current.toLocaleString();
                }, 16);
                funObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    funNums.forEach(el => funObserver.observe(el));
})();


// ====================================================
// TIMELINE LINE GROW ANIMATION
// ====================================================
(function() {
    const timelineLine = document.querySelector('.timeline-line');
    if (!timelineLine) return;

    timelineLine.style.height = '0';
    timelineLine.style.transition = 'height 1.5s cubic-bezier(0.23, 1, 0.32, 1)';

    const tlObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timelineLine.style.height = '100%';
                tlObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    tlObserver.observe(timelineLine.parentElement);
})();


// ====================================================
// SERVICE CARDS — TILT ON HOVER
// ====================================================
(function() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-8px) perspective(600px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();


// ====================================================
// PROJECT CARDS — STAGGER REVEAL ON SCROLL
// ====================================================
(function() {
    const cards = document.querySelectorAll('.project-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = (idx * 0.15) + 's';
                entry.target.classList.add('card-visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    cards.forEach(c => cardObserver.observe(c));
})();


// ====================================================
// FLOATING CODE LINES — BACKGROUND DECORATION
// ====================================================
(function() {
    const projectSection = document.getElementById('projects');
    if (!projectSection) return;

    const codeSnippets = [
        'const app = express();',
        'import React from "react";',
        'npm run build',
        'git push origin main',
        'docker compose up',
        'SELECT * FROM users;',
        'async function deploy() {',
        'return res.json(data);',
        '} catch (err) {',
        'export default App;'
    ];

    for (let i = 0; i < 6; i++) {
        const line = document.createElement('div');
        line.className = 'floating-code-line';
        line.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        line.style.top = (15 + Math.random() * 70) + '%';
        line.style.left = (Math.random() > 0.5 ? -5 : 85 + Math.random() * 10) + '%';
        line.style.animationDelay = (Math.random() * 8) + 's';
        line.style.animationDuration = (12 + Math.random() * 8) + 's';
        projectSection.appendChild(line);
    }
})();
