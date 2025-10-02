
// Enhanced AgriDigi Market Access functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navLinks = document.querySelector('.nav-links');
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            searchProducts(query);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchProducts(query);
            }
        }
    });
    
    function searchProducts(query) {
        console.log('Searching for:', query);
        // Here you would implement actual search functionality
        // For now, we'll just show an alert
        alert(`Searching for "${query}" in market prices...`);
    }
    
    // Watchlist functionality
    const watchlistBtns = document.querySelectorAll('.add-to-cart');
    let watchlistCount = 0;
    
    watchlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            
            addToWatchlist(productName);
            updateWatchlistCount();
        });
    });
    
    function addToWatchlist(productName) {
        watchlistCount++;
        
        // Visual feedback
        const notification = document.createElement('div');
        notification.textContent = `${productName} added to watchlist!`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    function updateWatchlistCount() {
        const countElement = document.querySelector('.cart-count');
        countElement.textContent = watchlistCount;
    }
    
    // Hero carousel functionality
    const heroNavPrev = document.querySelector('.nav-prev');
    const heroNavNext = document.querySelector('.nav-next');
    
    let currentSlide = 0;
    const totalSlides = 3; // Simulated slides
    
    heroNavNext.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateHeroSlide();
    });
    
    heroNavPrev.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateHeroSlide();
    });
    
    function updateHeroSlide() {
        const heroText = document.querySelector('.hero-text h1');
        const slides = [
            'Real-Time Market Prices &<br>Agricultural Products.',
            'Live Livestock Pricing &<br>County Market Data.',
            'Fresh Produce Rates &<br>Daily Price Updates.'
        ];
        
        heroText.innerHTML = slides[currentSlide];
    }
    
    // Auto-slide hero every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateHeroSlide();
    }, 5000);
    
    // Product navigation
    const productNavBtns = document.querySelectorAll('.products-navigation .nav-arrow');
    
    productNavBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const productsGrid = document.querySelector('.products-grid');
            const scrollAmount = 300;
            
            if (index === 0) { // Previous
                productsGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else { // Next
                productsGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    });
    
    // Smooth scrolling for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .category-btn');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to daily prices section
            const dailyPricesSection = document.querySelector('.daily-prices-section');
            if (dailyPricesSection) {
                dailyPricesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });
    
    // Language selector functionality
    const languageSelector = document.querySelector('.language-selector');
    
    languageSelector.addEventListener('click', function() {
        const languages = ['English', 'Kiswahili', 'Kikuyu'];
        const currentLang = this.querySelector('span:last-child').textContent;
        const currentIndex = languages.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % languages.length;
        
        this.querySelector('span:last-child').textContent = languages[nextIndex];
    });
    
    // Simulate real-time price updates
    function updatePrices() {
        const priceElements = document.querySelectorAll('.current-price');
        
        priceElements.forEach(priceEl => {
            const currentPrice = parseInt(priceEl.textContent.replace(/[^\d]/g, ''));
            const variation = Math.floor(Math.random() * 100) - 50; // ±50 KES
            const newPrice = Math.max(100, currentPrice + variation);
            
            priceEl.textContent = `KES ${newPrice.toLocaleString()}`;
            
            // Add visual indicator for price change
            if (variation > 0) {
                priceEl.style.color = '#dc3545'; // Red for increase
            } else if (variation < 0) {
                priceEl.style.color = '#28a745'; // Green for decrease
            }
            
            setTimeout(() => {
                priceEl.style.color = '#28a745'; // Reset to default
            }, 2000);
        });
    }
    
    // Update prices every 30 seconds to simulate real-time updates
    setInterval(updatePrices, 30000);
    
    // Add CSS animation for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .price-update {
            transition: color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});
