document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const searchToggle = document.querySelector('.search-toggle');
  const menuPanel = document.querySelector('.menu-panel');
  const searchPanel = document.querySelector('.search-panel');
  const searchBox = document.querySelector('.search-box');

  const closeAllPanels = () => {
    menuPanel?.classList.remove('open');
    searchPanel?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    searchToggle?.setAttribute('aria-expanded', 'false');
  };

  if (menuToggle && menuPanel) {
    const showMenu = () => {
      menuPanel.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      searchPanel?.classList.remove('open');
      searchToggle?.setAttribute('aria-expanded', 'false');
    };

    const hideMenu = () => {
      menuPanel.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      if (menuPanel.classList.contains('open')) {
        hideMenu();
      } else {
        showMenu();
      }
    });

    menuToggle.addEventListener('mouseenter', showMenu);
    menuPanel.addEventListener('mouseleave', hideMenu);

    menuPanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuPanel.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (searchToggle && searchPanel && searchBox) {
    const showSearch = () => {
      searchPanel.classList.add('open');
      searchToggle.setAttribute('aria-expanded', 'true');
      menuPanel?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      searchBox.querySelector('input').focus();
    };

    const hideSearch = () => {
      searchPanel.classList.remove('open');
      searchToggle.setAttribute('aria-expanded', 'false');
    };

    searchToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      if (searchPanel.classList.contains('open')) {
        hideSearch();
      } else {
        showSearch();
      }
    });

    searchToggle.addEventListener('mouseenter', showSearch);
    searchPanel.addEventListener('mouseleave', hideSearch);

    searchBox.addEventListener('click', (event) => event.stopPropagation());
    searchBox.querySelector('input').addEventListener('focus', showSearch);
  }

  document.addEventListener('click', (event) => {
    if (!menuPanel?.contains(event.target) && !menuToggle?.contains(event.target) && !searchPanel?.contains(event.target) && !searchToggle?.contains(event.target)) {
      closeAllPanels();
    }
  });

  const swiper = document.querySelector('.swiper');
  const track = document.querySelector('.swiper-track');
  const slides = document.querySelectorAll('.swiper-slide');
  const dots = document.querySelectorAll('.swiper-dot');
  const prevBtn = document.querySelector('.swiper-btn.prev');
  const nextBtn = document.querySelector('.swiper-btn.next');

  if (swiper && track && slides.length) {
    let currentIndex = 0;
    let touchStartX = 0;

    function updateSlider(index) {
      currentIndex = (index + slides.length) % slides.length;
      const offset = currentIndex * swiper.clientWidth;
      track.style.transform = `translateX(-${offset}px)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    updateSlider(0);

    if (prevBtn) prevBtn.addEventListener('click', () => updateSlider(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateSlider(currentIndex + 1));

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => updateSlider(index));
    });

    swiper.addEventListener('touchstart', (event) => {
      touchStartX = event.touches[0].clientX;
    }, { passive: true });

    swiper.addEventListener('touchend', (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const delta = touchStartX - touchEndX;

      if (Math.abs(delta) > 50) {
        updateSlider(delta > 0 ? currentIndex + 1 : currentIndex - 1);
      }
    }, { passive: true });
  }

  const brandsTrack = document.querySelector('.brands-track');
  const brandSlides = document.querySelectorAll('.brands-slide');

  if (brandsTrack && brandSlides.length) {
    let brandIndex = 0;

    function updateBrandsSlider(index) {
      brandIndex = (index + brandSlides.length) % brandSlides.length;
      const offset = brandIndex * brandsTrack.parentElement.clientWidth;
      brandsTrack.style.transform = `translateX(-${offset}px)`;
    }

    updateBrandsSlider(0);
    setInterval(() => updateBrandsSlider(brandIndex + 1), 4000);
  }

  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');

      tabButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });

      tabPanels.forEach((panel) => {
        panel.classList.remove('active');
        panel.hidden = true;
        panel.setAttribute('aria-hidden', 'true');
      });

      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const activePanel = document.getElementById(target);
      if (activePanel) {
        activePanel.classList.add('active');
        activePanel.hidden = false;
        activePanel.setAttribute('aria-hidden', 'false');
      }
    });
  });
});
