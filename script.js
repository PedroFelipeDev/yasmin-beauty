// script.js

// Impede que o navegador lembre e restaure a rolagem anterior
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
// Força a rolagem para o topo (Hero) ao carregar/recarregar a página
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    // Efeito sutil no header ao dar scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(250, 247, 242, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(61, 35, 20, 0.08)';
            header.style.padding = '1rem 5%';
        } else {
            header.style.background = 'rgba(250, 247, 242, 0.85)';
            header.style.boxShadow = 'none';
            header.style.padding = '1.2rem 5%';
        }
    });

    // Smooth scroll para os links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    // Portfólio Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                        // Pequena re-animação de fade in
                        item.style.opacity = '0';
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('.portfolio-img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                    document.body.classList.add('no-scroll');
                }
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
            setTimeout(() => lightboxImg.src = '', 300); // limpa img depois de fechar
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
                document.body.classList.remove('no-scroll');
                setTimeout(() => lightboxImg.src = '', 300);
            }
        });
    }

    // Menu do Autor (Falcão Dev)
    const authorBtn = document.getElementById('authorBtn');
    const authorMenu = document.getElementById('authorMenu');

    if (authorBtn && authorMenu) {
        authorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            authorMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!authorMenu.contains(e.target) && e.target !== authorBtn) {
                authorMenu.classList.remove('active');
            }
        });
    }

    // Catálogo (Meus Serviços): clicar em um serviço abre o WhatsApp com a mensagem pronta
    const WHATSAPP_NUMBER = '5582991898863';
    const HEART_EMOJI = '\u{1F90E}';
    const FLOWER_EMOJI = '\u{1F338}';

    document.querySelectorAll('#servicos .service-list-card, #servicos .grid-card').forEach(card => {
        const nameEl = card.querySelector('h4');
        if (!nameEl) return;
        const service = nameEl.textContent.trim();

        card.style.cursor = 'pointer';
        card.setAttribute('role', 'link');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', 'Agendar ' + service + ' pelo WhatsApp');

        const openWhatsApp = () => {
            const msg = 'Olá Yasmin, eu gostaria de agendar um horário para ' + service + ' ' + HEART_EMOJI + FLOWER_EMOJI;
            window.open('https://api.whatsapp.com/send?phone=' + WHATSAPP_NUMBER + '&text=' + encodeURIComponent(msg), '_blank', 'noopener');
        };

        card.addEventListener('click', openWhatsApp);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openWhatsApp();
            }
        });
    });
});
