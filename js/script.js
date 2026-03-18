// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
        }
    });
    
    // --- Dynamic Content Rendering ---
    
    // 1. Render Templates
    const templatesContainer = document.getElementById('templates-grid-container');
    if (templatesContainer && typeof db !== 'undefined') {
        const templates = db.getTemplates();
        let html = '';
        
        templates.forEach(t => {
            html += `
                <div class="template-card" data-id="${t.id}">
                    <div class="template-icon">
                        <i class="${t.icon}"></i>
                    </div>
                    <h3>${t.title}</h3>
                    <p>${t.description}</p>
                    <div class="card-actions">
                        <a href="#" class="btn-secondary btn-download">Download PDF</a>
                        <a href="${t.canvaLink || '#'}" target="_blank" class="btn-canva">Edit in Canva</a>
                        <a href="${t.adobeLink || '#'}" target="_blank" class="btn-adobe">Edit in Adobe Express</a>
                    </div>
                    <div class="template-meta">
                        <span><i class="far fa-file-pdf"></i> PDF</span>
                        <span><i class="fas fa-download"></i> <span class="download-counter">${t.downloads}</span> downloads</span>
                    </div>
                </div>
            `;
        });
        
        templatesContainer.innerHTML = html;
    }
    
    // 2. Render Blogs
    const blogsContainer = document.getElementById('blog-grid-container');
    if (blogsContainer && typeof db !== 'undefined') {
        const blogs = db.getBlogs();
        let html = '';
        
        blogs.forEach((b, index) => {
            html += `
                <article class="blog-post">
                    <h2>${b.title}</h2>
                    <div class="post-meta">
                        <span><i class="far fa-calendar"></i> ${b.date}</span>
                        <span><i class="far fa-clock"></i> ${b.readTime}</span>
                        <span><i class="far fa-folder"></i> ${b.category}</span>
                    </div>
                    
                    <div class="post-image-container">
                        <img src="${b.image}" alt="${b.title}" class="post-image">
                    </div>
                    
                    <p>${b.excerpt}</p>
                    
                    ${b.content}
                    
                    <a href="#" class="btn-primary" style="margin-top: 15px;">Read Article</a>
                </article>
            `;
            
            // Add fake Adsense banner after the 3rd post (index 2)
            if (index === 2) {
                html += `
                <div class="ad-section" style="margin: 40px 0;">
                    <div class="ad-placeholder">
                        <p>AdSense In-Article (300x600)</p>
                        <div class="ad-banner">
                            <img src="https://via.placeholder.com/300x600/cccccc/969696?text=Google+AdSense+300x600" alt="Ad placeholder">
                        </div>
                    </div>
                </div>`;
            }
        });
        
        blogsContainer.innerHTML = html;
    }
    
    // --- End Dynamic Rendering ---

    // Initialize download counts logic
    const templatesCards = document.querySelectorAll('.template-card');
    
    // First let's read the initial state and load to DOM
    templatesCards.forEach(card => {
        const templateId = card.getAttribute('data-id');
        if (!templateId) return;
        
        const counterElement = card.querySelector('.download-counter');
        if (counterElement) {
            // Get from storage or use the default embedded inside HTML as starting point
            let currentStr = localStorage.getItem(`downloads_${templateId}`);
            if (currentStr === null) {
                // Parse original hardcoded count, fallback to 0
                const initialCountStr = counterElement.textContent.replace(/,/g, '');
                let initialCount = parseInt(initialCountStr, 10);
                if (isNaN(initialCount)) initialCount = 0;
                localStorage.setItem(`downloads_${templateId}`, initialCount);
                currentStr = initialCount.toString();
            }
            // Format number with commas
            counterElement.textContent = parseInt(currentStr, 10).toLocaleString();
        }
    });

    // Template download simulation
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get parent card data
            const parentCard = this.closest('.template-card');
            if (parentCard) {
                const templateId = parentCard.getAttribute('data-id');
                const counterElement = parentCard.querySelector('.download-counter');
                
                if (templateId && counterElement) {
                    // Update storage
                    let count = parseInt(localStorage.getItem(`downloads_${templateId}`), 10) || 0;
                    count += 1;
                    localStorage.setItem(`downloads_${templateId}`, count);
                    
                    // Update DOM immediately
                    counterElement.textContent = count.toLocaleString();
                }
            }
            
            // Show a modal or alert
            alert('Your template is downloading. In the live version, this would be a real file!');
        });
    });
    
    // Hide edit link buttons if no URL is provided (#)
    const editButtons = document.querySelectorAll('.btn-canva, .btn-adobe');
    editButtons.forEach(button => {
        const href = button.getAttribute('href');
        // If href string is literally just '#' or is entirely empty
        if (!href || href === '#' || href === 'http://localhost:8000/#') {
            button.style.display = 'none';
        }
    });
    
    // Simple page visit counter (for demo)
    if (!localStorage.getItem('visitCount')) {
        localStorage.setItem('visitCount', '1');
    } else {
        let count = parseInt(localStorage.getItem('visitCount'));
        localStorage.setItem('visitCount', (count + 1).toString());
    }
    
    console.log('Page visits:', localStorage.getItem('visitCount'));
});