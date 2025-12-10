document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const mainProductImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');
    const subscriptionRadios = document.querySelectorAll('input[name="subscription"]');
    const fragrance1Radios = document.querySelectorAll('input[name="fragrance1"]');
    const fragrance2Radios = document.querySelectorAll('input[name="fragrance2"]');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const fragranceSection = document.getElementById('fragranceSection');
    const fragranceSection2 = document.getElementById('fragranceSection2');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    let currentImageIndex = 0;
    const images = [
        'assets/images/Group 1000004277.png',
        'assets/images/Group 1000004277.png',
        'assets/images/Group 1000004277.png',
        'assets/images/Group 1000004277.png',
        'assets/images/Group 1000004277.png',
        'assets/images/Group 1000004277.png',
        'assets/images/Group 1000004277.png',
        'assets/images/Group 1000004277.png'
    ];
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    function updateMainImage(index) {
        mainProductImage.src = images[index];
        
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        currentImageIndex = index;
    }
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateMainImage(index);
        });
    });
    
    prevButton.addEventListener('click', () => {
        const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
        updateMainImage(newIndex);
    });
    
    nextButton.addEventListener('click', () => {
        const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
        updateMainImage(newIndex);
    });
    
    function updateFragranceSections() {
        const selectedSubscription = document.querySelector('input[name="subscription"]:checked').value;
        
        if (selectedSubscription === 'single') {
            fragranceSection.classList.add('active');
            fragranceSection2.classList.remove('active');
        } else if (selectedSubscription === 'double') {
            fragranceSection.classList.add('active');
            fragranceSection2.classList.add('active');
        }
    }
    
    function updateCartLink() {
        const selectedSubscription = document.querySelector('input[name="subscription"]:checked').value;
        const selectedFragrance1 = document.querySelector('input[name="fragrance1"]:checked')?.value || 'original';
        const selectedFragrance2 = document.querySelector('input[name="fragrance2"]:checked')?.value || 'original';
        
        const cartUrls = {
            'single-original': 'https://example.com/cart/single-original',
            'single-lily': 'https://example.com/cart/single-lily',
            'single-rose': 'https://example.com/cart/single-rose',
            'double-original-original': 'https://example.com/cart/double-original-original',
            'double-original-lily': 'https://example.com/cart/double-original-lily',
            'double-original-rose': 'https://example.com/cart/double-original-rose',
            'double-lily-original': 'https://example.com/cart/double-lily-original',
            'double-lily-lily': 'https://example.com/cart/double-lily-lily',
            'double-lily-rose': 'https://example.com/cart/double-lily-rose',
            'double-rose-original': 'https://example.com/cart/double-rose-original',
            'double-rose-lily': 'https://example.com/cart/double-rose-lily',
            'double-rose-rose': 'https://example.com/cart/double-rose-rose'
        };
        
        let key;
        if (selectedSubscription === 'single') {
            key = `single-${selectedFragrance1}`;
        } else {
            key = `double-${selectedFragrance1}-${selectedFragrance2}`;
        }
        
        addToCartBtn.onclick = function() {
            window.location.href = cartUrls[key] || '#';
        };
    }
    
    subscriptionRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateFragranceSections();
            updateCartLink();
        });
    });
    
    fragrance1Radios.forEach(radio => {
        radio.addEventListener('change', updateCartLink);
    });
    
    fragrance2Radios.forEach(radio => {
        radio.addEventListener('change', updateCartLink);
    });
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const wasActive = item.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });
            
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    }
    
    let statsAnimated = false;
    
    function checkStatsInView() {
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.top <= window.innerHeight;
        
        if (!statsAnimated && isInView) {
            statNumbers.forEach(statNumber => {
                const target = parseInt(statNumber.getAttribute('data-target'));
                animateCounter(statNumber, target);
            });
            statsAnimated = true;
        }
    }
    
    window.addEventListener('scroll', checkStatsInView);
    checkStatsInView();
    
    function lazyLoadImages() {
        const images = document.querySelectorAll('[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    lazyLoadImages();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    updateFragranceSections();
    updateCartLink();
});