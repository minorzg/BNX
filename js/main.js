// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Video autoplay handling
// Video handling - Version corrigée
const videos = document.querySelectorAll('video');
videos.forEach(video => {
    // Forcer mute pour autoplay
    video.muted = true;
    
    // Essayer de jouer
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Autoplay failed:', error);
            // Réessayer après interaction
            const tryPlay = () => {
                video.play();
                document.removeEventListener('touchstart', tryPlay);
            };
            document.addEventListener('touchstart', tryPlay, { once: true });
        });
    }
});

// Forcer le bon affichage au chargement
function checkScreenSize() {
    const desktopVideo = document.querySelector('.desktop-video');
    const mobileVideo = document.querySelector('.mobile-video');
    
    if (window.innerWidth <= 1024) {
        desktopVideo.style.display = 'none';
        mobileVideo.style.display = 'block';
    } else {
        mobileVideo.style.display = 'none';
        desktopVideo.style.display = 'block';
    }
}

// Vérifier au chargement et au redimensionnement
window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);

    // Cart functionality (static)
    let cartCount = 0;
    const cartCountEl = document.querySelector('.cart-count');
    
    if (cartCountEl) {
        // Update cart count (you can modify this based on your needs)
        cartCountEl.textContent = cartCount;
    }

    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            cartCount++;
            if (cartCountEl) {
                cartCountEl.textContent = cartCount;
            }
            
            // Simple animation feedback
            this.classList.add('added');
            setTimeout(() => this.classList.remove('added'), 1000);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simple validation
                if (email.includes('@') && email.includes('.')) {
                    alert('Thanks for subscribing! (This is a demo - no data was sent)');
                    this.reset();
                } else {
                    alert('Please enter a valid email address');
                }
            }
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .feature-item, .video-card').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero (optional)
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Dropdown handling for mobile/touch devices
    if ('ontouchstart' in window) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        });
    }

    // Back to top button (optional)
    const createBackToTop = () => {
        const btn = document.createElement('button');
        btn.innerHTML = '↑';
        btn.className = 'back-to-top';
        btn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: black;
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 99;
        `;

        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                btn.style.opacity = '1';
            } else {
                btn.style.opacity = '0';
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    if (document.body.scrollHeight > window.innerHeight) {
        createBackToTop();
    }
});

// Simple product page template function
function createProductPage(product) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${product.name} | SHOP DGH</title>
            <link rel="stylesheet" href="../css/style.css">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        </head>
        <body class="dark-theme">
            <!-- Navigation (same as index) -->
            <nav class="navbar">
                <div class="nav-container">
                    <a href="../index.html" class="logo">
                        <img src="../assets/images/logo-white.png" alt="SHOP DGH">
                    </a>
                    <!-- Rest of navigation... -->
                </div>
            </nav>

            <main class="product-detail">
                <div class="container">
                    <div class="product-detail-grid">
                        <div class="product-gallery">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <h1>${product.name}</h1>
                            <div class="product-price">${product.price}</div>
                            <div class="product-description">
                                ${product.description}
                            </div>
                            <div class="product-features">
                                <h3>What's Included:</h3>
                                <ul>
                                    ${product.features.map(f => `<li>${f}</li>`).join('')}
                                </ul>
                            </div>
                            <button class="btn-primary add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Footer (same as index) -->
            <footer class="footer">
                <!-- ... -->
            </footer>

            <script src="../js/main.js"></script>
        </body>
        </html>
    `;
}
// --- LOGIQUE MENU MOBILE AVEC FERMETURE EXTERIEURE ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // 1. Vider le menu mobile et ajouter le bouton X
    mobileMenu.innerHTML = '';
    
    // Ajouter le bouton de fermeture
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', 'Fermer le menu');
    mobileMenu.appendChild(closeBtn);
    
    // 2. Ajouter les liens du menu (version simplifiée qui fonctionne partout)
    const navLinks = document.querySelectorAll('.nav-menu .nav-item');

    if (navLinks.length > 0) {
        // On a trouvé des éléments, on les clone
        navLinks.forEach(item => {
            const clone = item.cloneNode(true);
            mobileMenu.appendChild(clone);
        });
    } else {
        // Fallback: on crée les liens manuellement
        const menuItems = [
            { text: 'Products +', href: 'index.html#products' },
            { text: 'Youtube +', href: 'index.html#tutorials' },
            { text: 'Feedbacks +', href: 'index.html#feedbacks' },
            { text: 'Works +', href: 'works.html' },
            { text: 'Contact +', href: '#footer' },
            { text: 'Join Discord', href: 'https://discord.gg/Rgk9ZSyy', isDiscord: true }
        ];
        
        menuItems.forEach(item => {
            const navItem = document.createElement('div');
            navItem.className = 'nav-item';
            
            if (item.isDiscord) {
                const discordLink = document.createElement('a');
                discordLink.href = item.href;
                discordLink.className = 'discord-btn';
                discordLink.target = '_blank';
                discordLink.rel = 'noopener noreferrer';
                discordLink.innerHTML = `<i class="fab fa-discord"></i>${item.text}`;
                navItem.appendChild(discordLink);
            } else {
                const link = document.createElement('a');
                link.href = item.href;
                link.className = 'nav-link';
                link.textContent = item.text;
                navItem.appendChild(link);
            }
            mobileMenu.appendChild(navItem);
        });
    }

    // 3. Fonction pour fermer le menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        
        // Remettre le burger à l'état normal
        if (mobileBtn) {
            const spans = mobileBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            mobileBtn.classList.remove('active');
        }
    }

    // 4. Fermeture quand on clique sur le X
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // 5. Ouverture quand on clique sur le burger
    if (mobileBtn) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('open');
            
            // Animation du burger
            const spans = mobileBtn.querySelectorAll('span');
            mobileBtn.classList.toggle('active');
            if(mobileBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 6. Fermeture quand on clique sur un lien
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if(e.target.classList.contains('nav-link') || e.target.closest('.nav-link') || e.target.closest('.discord-btn')) {
                closeMobileMenu();
            }
        });
    }

    // 7. Fermeture quand on clique EN DEHORS du menu
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('open') && 
            !mobileMenu.contains(e.target) && 
            mobileBtn && !mobileBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // 8. Empêcher la fermeture quand on clique DANS le menu
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});
