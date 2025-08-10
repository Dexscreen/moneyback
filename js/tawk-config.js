// Tawk.to Live Chat Configuration
const TAWK_CONFIG = {
    // Your Tawk.to Property ID
    propertyId: 'your-tawk-property-id',
    
    // Your Tawk.to Widget ID  
    widgetId: 'your-tawk-widget-id',
    
    // Chat settings
    settings: {
        // Customize appearance
        backgroundColor: '#1E40AF',
        bubbleColor: '#DC2626',
        
        // Set initial status
        status: 'online',
        
        // Custom greeting message
        greeting: 'Need help with scam recovery? We\'re here to help 24/7.',
        
        // Show chat bubble on page load
        showOnLoad: true,
        
        // Position (br = bottom right, bl = bottom left, tr = top right, tl = top left)
        position: 'br'
    }
};

// Initialize Tawk.to chat widget
(function() {
    // Only load if we have valid IDs configured
    if (TAWK_CONFIG.propertyId === 'your-tawk-property-id' || 
        TAWK_CONFIG.widgetId === 'your-tawk-widget-id') {
        console.log('Tawk.to configuration needed - please update tawk-config.js with your property and widget IDs');
        return;
    }
    
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    
    // Configure Tawk.to settings
    Tawk_API.onLoad = function() {
        console.log('Tawk.to chat loaded successfully');
        
        // Set custom styling
        if (TAWK_CONFIG.settings.backgroundColor) {
            Tawk_API.setAttributes({
                'background-color': TAWK_CONFIG.settings.backgroundColor
            });
        }
        
        // Show custom greeting
        if (TAWK_CONFIG.settings.greeting) {
            Tawk_API.addEvent('Greeting', {
                message: TAWK_CONFIG.settings.greeting
            });
        }
    };
    
    // Handle chat events
    Tawk_API.onChatMessageVisitor = function(message) {
        console.log('Visitor message:', message);
        
        // Track chat engagement (for analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_message_sent', {
                'event_category': 'engagement',
                'event_label': 'visitor_message'
            });
        }
    };
    
    Tawk_API.onChatMessageAgent = function(message) {
        console.log('Agent message:', message);
        
        // Track agent response (for analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_response_received', {
                'event_category': 'support',
                'event_label': 'agent_response'
            });
        }
    };
    
    // Handle chat start
    Tawk_API.onChatStarted = function() {
        console.log('Chat session started');
        
        // Track chat sessions
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_started', {
                'event_category': 'engagement',
                'event_label': 'new_chat_session'
            });
        }
    };
    
    // Load the Tawk.to widget
    (function() {
        var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
        
        s1.async = true;
        s1.src = 'https://embed.tawk.to/' + TAWK_CONFIG.propertyId + '/' + TAWK_CONFIG.widgetId;
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        
        s0.parentNode.insertBefore(s1, s0);
    })();
})();

// Utility functions for chat management
window.TawkChat = {
    // Show chat widget
    show: function() {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.showWidget) {
            Tawk_API.showWidget();
        }
    },
    
    // Hide chat widget
    hide: function() {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.hideWidget) {
            Tawk_API.hideWidget();
        }
    },
    
    // Maximize chat window
    maximize: function() {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.maximize) {
            Tawk_API.maximize();
        }
    },
    
    // Minimize chat window
    minimize: function() {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.minimize) {
            Tawk_API.minimize();
        }
    },
    
    // Set visitor information
    setVisitor: function(name, email) {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.setAttributes) {
            Tawk_API.setAttributes({
                name: name,
                email: email
            });
        }
    },
    
    // Add tags to the conversation
    addTags: function(tags) {
        if (typeof Tawk_API !== 'undefined' && Tawk_API.addTags) {
            Tawk_API.addTags(tags);
        }
    }
};

// Auto-categorize chats based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    let chatTags = ['website'];
    
    // Add page-specific tags
    if (currentPath.includes('crypto-scam')) {
        chatTags.push('crypto-scam');
    } else if (currentPath.includes('pig-butchering')) {
        chatTags.push('pig-butchering');
    } else if (currentPath.includes('ponzi-scheme')) {
        chatTags.push('ponzi-scheme');
    } else if (currentPath.includes('complaints')) {
        chatTags.push('complaint');
    } else if (currentPath.includes('contact')) {
        chatTags.push('general-inquiry');
    }
    
    // Set tags when chat loads
    if (typeof Tawk_API !== 'undefined') {
        Tawk_API.onLoad = function() {
            window.TawkChat.addTags(chatTags);
        };
    } else {
        // Wait for Tawk to load
        setTimeout(function() {
            if (window.TawkChat) {
                window.TawkChat.addTags(chatTags);
            }
        }, 2000);
    }
});

// Export configuration for debugging
window.TawkConfig = TAWK_CONFIG;