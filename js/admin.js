// --- Admin Dashboard Logic ---

// --- Authentication Simulation ---
document.getElementById('btn-login').addEventListener('click', () => {
    const pw = document.getElementById('admin-password').value;
    if (pw === 'admin') {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('admin-app').style.display = 'flex';
        renderTables();
    } else {
        document.getElementById('login-error').textContent = "Incorrect password.";
    }
});

document.getElementById('btn-logout').addEventListener('click', () => {
    document.getElementById('login-overlay').style.display = 'flex';
    document.getElementById('admin-app').style.display = 'none';
    document.getElementById('admin-password').value = '';
    document.getElementById('login-error').textContent = '';
});

// --- Navigation ---
document.querySelectorAll('.admin-nav li[data-target]').forEach(item => {
    item.addEventListener('click', (e) => {
        // Remove active class from all tabs
        document.querySelectorAll('.admin-nav li').forEach(nav => nav.classList.remove('active'));
        document.querySelectorAll('.admin-panel').forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        const targetId = e.currentTarget.getAttribute('data-target');
        e.currentTarget.classList.add('active');
        document.getElementById(targetId).classList.add('active');
    });
});

// --- Modal Helper Functions ---
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    // Reset forms when closing
    if(modalId === 'modal-template') document.getElementById('form-template').reset();
    if(modalId === 'modal-blog') {
        document.getElementById('form-blog').reset();
        if (typeof quill !== 'undefined') quill.root.innerHTML = '';
    }
    
    // Reset hidden IDs
    document.getElementById('tmpl-id').value = '';
    document.getElementById('blog-id').value = '';
    
    // Reset Titles
    document.getElementById('modal-template-title').textContent = 'Add New Template';
    document.getElementById('modal-blog-title').textContent = 'Write New Post';
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
}

// --- Render Tables ---
function renderTables() {
    renderTemplatesTable();
    renderBlogsTable();
}

function renderTemplatesTable() {
    const tbody = document.getElementById('tmpl-table-body');
    const templates = db.getTemplates();
    tbody.innerHTML = '';
    
    templates.forEach(t => {
        // Determine link status badge
        let statusHtml = '';
        if (t.canvaLink && t.adobeLink && t.canvaLink !== '#' && t.adobeLink !== '#') {
            statusHtml = '<span class="badge-status badge-good">Both Links</span>';
        } else if ((t.canvaLink && t.canvaLink !== '#') || (t.adobeLink && t.adobeLink !== '#')) {
            statusHtml = '<span class="badge-status badge-warn">Partial Links</span>';
        } else {
            statusHtml = '<span class="badge-status badge-none">No Links</span>';
        }
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><i class="${t.icon} tbl-icon"></i></td>
            <td><strong>${t.title}</strong></td>
            <td>${t.category}</td>
            <td>${statusHtml}</td>
            <td>${t.downloads.toLocaleString()}</td>
            <td>
                <button class="action-btn action-edit" onclick="editTemplate('${t.id}')"><i class="fas fa-edit"></i></button>
                <button class="action-btn action-delete" onclick="deleteTemplate('${t.id}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderBlogsTable() {
    const tbody = document.getElementById('blog-table-body');
    const blogs = db.getBlogs();
    tbody.innerHTML = '';
    
    blogs.forEach(b => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${b.image}" class="tbl-img"></td>
            <td><strong>${b.title}</strong></td>
            <td>${b.category}</td>
            <td>${b.date}</td>
            <td><span class="badge-status badge-good">Published</span></td>
            <td>
                <button class="action-btn action-edit" onclick="editBlog('${b.id}')"><i class="fas fa-edit"></i></button>
                <button class="action-btn action-delete" onclick="deleteBlog('${b.id}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- Template CRUD Operations ---

document.getElementById('form-template').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('tmpl-id').value;
    const isNew = !id;
    
    const newTemplate = {
        id: isNew ? db.generateId(document.getElementById('tmpl-title').value) : id,
        title: document.getElementById('tmpl-title').value,
        description: document.getElementById('tmpl-desc').value,
        category: document.getElementById('tmpl-category').value,
        icon: document.getElementById('tmpl-icon').value,
        canvaLink: document.getElementById('tmpl-canva').value,
        adobeLink: document.getElementById('tmpl-adobe').value,
        downloads: isNew ? 0 : getTemplateById(id).downloads // preserve downloads
    };
    
    const templates = db.getTemplates();
    if (isNew) {
        templates.unshift(newTemplate); // add to top
    } else {
        const idx = templates.findIndex(t => t.id === id);
        templates[idx] = newTemplate;
    }
    
    db.saveTemplates(templates);
    renderTemplatesTable();
    closeModal('modal-template');
});

function editTemplate(id) {
    const t = getTemplateById(id);
    if (!t) return;
    
    document.getElementById('modal-template-title').textContent = 'Edit Template';
    document.getElementById('tmpl-id').value = t.id;
    document.getElementById('tmpl-title').value = t.title;
    document.getElementById('tmpl-desc').value = t.description;
    document.getElementById('tmpl-category').value = t.category;
    document.getElementById('tmpl-icon').value = t.icon;
    document.getElementById('tmpl-canva').value = t.canvaLink || '';
    document.getElementById('tmpl-adobe').value = t.adobeLink || '';
    
    openModal('modal-template');
}

function deleteTemplate(id) {
    if(confirm("Are you sure you want to delete this template? This cannot be undone.")) {
        const templates = db.getTemplates().filter(t => t.id !== id);
        db.saveTemplates(templates);
        renderTemplatesTable();
    }
}

function getTemplateById(id) {
    return db.getTemplates().find(t => t.id === id);
}

// --- Blog CRUD Operations ---

document.getElementById('form-blog').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('blog-id').value;
    const isNew = !id;
    
    // Formatting today's date
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    const newBlog = {
        id: isNew ? db.generateId(document.getElementById('blog-title').value) : id,
        title: document.getElementById('blog-title').value,
        category: document.getElementById('blog-category').value,
        image: document.getElementById('blog-image').value,
        excerpt: document.getElementById('blog-excerpt').value,
        content: quill.root.innerHTML,
        date: isNew ? today.toLocaleDateString('en-US', options) : getBlogById(id).date,
        readTime: isNew ? "5 min read" : getBlogById(id).readTime // arbitrary for now
    };
    
    const blogs = db.getBlogs();
    if (isNew) {
        blogs.unshift(newBlog); // add to top
    } else {
        const idx = blogs.findIndex(b => b.id === id);
        blogs[idx] = newBlog;
    }
    
    db.saveBlogs(blogs);
    renderBlogsTable();
    closeModal('modal-blog');
});

function editBlog(id) {
    const b = getBlogById(id);
    if (!b) return;
    
    document.getElementById('modal-blog-title').textContent = 'Edit Blog Post';
    document.getElementById('blog-id').value = b.id;
    document.getElementById('blog-title').value = b.title;
    document.getElementById('blog-category').value = b.category;
    document.getElementById('blog-image').value = b.image || '';
    document.getElementById('blog-excerpt').value = b.excerpt;
    quill.root.innerHTML = b.content;
    
    openModal('modal-blog');
}

function deleteBlog(id) {
    if(confirm("Are you sure you want to delete this blog post? This cannot be undone.")) {
        const blogs = db.getBlogs().filter(b => b.id !== id);
        db.saveBlogs(blogs);
        renderBlogsTable();
    }
}

function getBlogById(id) {
    return db.getBlogs().find(b => b.id === id);
}

// --- Initialize Quill Editor ---
const quill = new Quill('#blog-content-editor', {
    theme: 'snow'
});
