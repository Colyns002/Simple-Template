// Initial Data Seed for LocalStorage CMS
const defaultTemplates = [
    {
        id: "business-contract",
        icon: "fas fa-briefcase",
        title: "Business Contract",
        description: "Service agreement template for freelancers and businesses.",
        category: "Business",
        canvaLink: "https://www.canva.com/templates/",
        adobeLink: "",
        downloads: 0
    },
    {
        id: "invoice-template",
        icon: "fas fa-file-invoice-dollar",
        title: "Invoice Template",
        description: "Professional invoice with payment terms and tax columns.",
        category: "Business",
        canvaLink: "",
        adobeLink: "https://new.express.adobe.com/",
        downloads: 0
    },
    {
        id: "partnership-agreement",
        icon: "fas fa-handshake",
        title: "Partnership Agreement",
        description: "Formal agreement for business partners with profit sharing.",
        category: "Business",
        canvaLink: "https://www.canva.com/templates/",
        adobeLink: "",
        downloads: 12345
    },
    {
        id: "rental-agreement",
        icon: "fas fa-home",
        title: "Rental Agreement",
        description: "Comprehensive lease agreement for residential property.",
        category: "Property",
        canvaLink: "",
        adobeLink: "https://new.express.adobe.com/",
        downloads: 45678
    },
    {
        id: "lease-termination",
        icon: "fas fa-key",
        title: "Lease Termination",
        description: "Formal letter to terminate a rental agreement properly.",
        category: "Property",
        canvaLink: "https://www.canva.com/templates/",
        adobeLink: "",
        downloads: 0
    },
    {
        id: "property-inspection",
        icon: "fas fa-clipboard-list",
        title: "Property Inspection",
        description: "Checklist for move-in/move-out property condition.",
        category: "Property",
        canvaLink: "",
        adobeLink: "https://new.express.adobe.com/",
        downloads: 8901
    },
    {
        id: "last-will",
        icon: "fas fa-balance-scale",
        title: "Last Will & Testament",
        description: "Simple will template valid in all 50 states.",
        category: "Personal",
        canvaLink: "https://www.canva.com/templates/",
        adobeLink: "",
        downloads: 23456
    },
    {
        id: "power-of-attorney",
        icon: "fas fa-user-tie",
        title: "Power of Attorney",
        description: "Grant someone legal authority to act on your behalf.",
        category: "Personal",
        canvaLink: "",
        adobeLink: "https://new.express.adobe.com/",
        downloads: 0
    }
];

const defaultBlogs = [
    {
        id: "rental-agreement-guide",
        title: "How to Write a Rental Agreement That Protects Both Parties",
        date: "March 15, 2024",
        readTime: "8 min read",
        category: "Property Law",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Creating a rental agreement that protects both landlords and tenants is crucial for a smooth renting experience.",
        content: `<h3>Key Elements to Include:</h3><ul><li>Clear identification of parties and property</li><li>Rent amount, due date, and payment methods</li><li>Security deposit terms and conditions</li><li>Maintenance responsibilities</li><li>Termination and renewal clauses</li></ul><p>Remember, state laws vary significantly when it comes to rental agreements. Always check your local regulations or consult with a legal professional...</p>`
    },
    {
        id: "will-mistakes",
        title: "5 Common Mistakes When Creating a Will (And How to Avoid Them)",
        date: "March 10, 2024",
        readTime: "6 min read",
        category: "Estate Planning",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Many people put off creating a will, and those who do often make critical errors that can lead to disputes or invalidation.",
        content: `<h3>Top Mistakes:</h3><ol><li><strong>Not updating after major life events</strong> - Marriage, divorce, or births</li><li><strong>Vague language</strong> - Be specific about assets and beneficiaries</li><li><strong>Forgetting digital assets</strong> - Include online accounts and cryptocurrencies</li><li><strong>Improper witnessing</strong> - Follow state requirements exactly</li><li><strong>DIY without legal review</strong> - Templates are great, but get professional review</li></ol>`
    },
    {
        id: "business-contracts",
        title: "Understanding Business Contracts: A Guide for Small Business Owners",
        date: "March 5, 2024",
        readTime: "10 min read",
        category: "Business Law",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "As a small business owner, you'll encounter various contracts. Understanding the key components can save you from costly disputes...",
        content: `<h3>Essential Contract Clauses:</h3><table style="width:100%; border-collapse: collapse; margin: 20px 0;"><thead><tr style="background: #f8f9fa;"><th style="padding: 12px; text-align: left;">Clause</th><th style="padding: 12px; text-align: left;">Purpose</th></tr></thead><tbody><tr><td style="padding: 10px; border-bottom: 1px solid #eee;">Termination</td><td style="padding: 10px; border-bottom: 1px solid #eee;">How either party can end the agreement</td></tr><tr><td style="padding: 10px; border-bottom: 1px solid #eee;">Liability</td><td style="padding: 10px; border-bottom: 1px solid #eee;">Limits responsibility for damages</td></tr><tr><td style="padding: 10px; border-bottom: 1px solid #eee;">Dispute Resolution</td><td style="padding: 10px; border-bottom: 1px solid #eee;">How conflicts will be resolved</td></tr><tr><td style="padding: 10px; border-bottom: 1px solid #eee;">Payment Terms</td><td style="padding: 10px; border-bottom: 1px solid #eee;">When and how payment occurs</td></tr></tbody></table>`
    },
    {
        id: "free-vs-paid",
        title: "Free vs Paid Legal Documents: When to Use Templates vs Hire a Lawyer",
        date: "February 28, 2024",
        readTime: "7 min read",
        category: "Legal Tips",
        image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "When should you use free templates versus hiring an expensive lawyer? This guide helps you make the right decision...",
        content: `<div style="background: #e8f4fc; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #3498db;"><h4 style="margin-top: 0;">When Templates Work Best:</h4><ul><li>Simple agreements between trusted parties</li><li>Standard documents with low financial risk</li><li>Internal business documents</li><li>When you need a starting point for lawyer review</li></ul></div><div style="background: #ffe8e8; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #e74c3c;"><h4 style="margin-top: 0;">When to Hire a Lawyer:</h4><ul><li>High-value transactions (over $10,000)</li><li>Complex family or business situations</li><li>When litigation is a possibility</li><li>Documents involving government agencies</li></ul></div>`
    }
];

// Initialize Data if not exists
function initDatabase() {
    if (!localStorage.getItem('cms_templates')) {
        localStorage.setItem('cms_templates', JSON.stringify(defaultTemplates));
    }
    if (!localStorage.getItem('cms_blogs')) {
        localStorage.setItem('cms_blogs', JSON.stringify(defaultBlogs));
    }
}

// Ensure database is ready immediately
initDatabase();

// DB Helper Functions
const db = {
    getTemplates: () => JSON.parse(localStorage.getItem('cms_templates')),
    saveTemplates: (data) => localStorage.setItem('cms_templates', JSON.stringify(data)),
    
    getBlogs: () => JSON.parse(localStorage.getItem('cms_blogs')),
    saveBlogs: (data) => localStorage.setItem('cms_blogs', JSON.stringify(data)),
    
    generateId: (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4)
};
