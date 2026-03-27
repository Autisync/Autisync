"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TurnstileWidget from "@/app/components/TurnstileWidget";

// ─── Constants ────────────────────────────────────────────────────────────────

const GOLD = "#b98b2f";
const GOLD_DARK = "#7a5a1d";
const GOLD_LIGHT = "#d1a94c";

// ─── Types ────────────────────────────────────────────────────────────────────

type FieldType = "text" | "textarea" | "select" | "multiselect" | "radio" | "email" | "tel" | "url";

interface Field {
    id: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    options?: string[];
    required?: boolean;
    hint?: string;
}

interface Section {
    title: string;
    fields: Field[];
}

interface Questionnaire {
    id: string;
    title: string;
    tagline: string;
    subtitle: string;
    description: string;
    sections: Section[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const questionnaires: Questionnaire[] = [
    {
        id: "graphic-design",
        title: "Graphic Design Questionnaire",
        tagline: "We want to be 100% aligned and on the same page as you.",
        subtitle: "Brand & Visual Identity",
        description: "Tell us about your brand, style preferences, and what success looks like for your visuals.",
        sections: [
            {
                title: "About Your Brand",
                fields: [
                    { id: "brand_name", label: "Brand / Company Name", type: "text", placeholder: "e.g. Autisync Studio", required: true },
                    { id: "industry", label: "Industry / Sector", type: "text", placeholder: "e.g. Tech, Fashion, Healthcare", required: true },
                    { id: "brand_description", label: "Describe your brand in a few sentences", type: "textarea", placeholder: "What do you do, who do you serve, and what makes you different?", required: true },
                    { id: "target_audience", label: "Who is your target audience?", type: "textarea", placeholder: "Age range, interests, geography, mindset..." },
                    { id: "competitors", label: "Name 2–3 competitors or brands you admire", type: "textarea", placeholder: "Include links if possible" },
                ],
            },
            {
                title: "Design Requirements",
                fields: [
                    { id: "deliverables", label: "What deliverables do you need?", type: "multiselect", options: ["Logo", "Brand guidelines", "Business cards", "Letterhead", "Social media kit", "Brochure / flyer", "Presentation deck", "Packaging", "Signage / banners", "Other"] },
                    { id: "style", label: "Which visual style resonates with your brand?", type: "multiselect", options: ["Minimal & clean", "Bold & modern", "Luxury & refined", "Playful & energetic", "Corporate & professional", "Retro / vintage", "Organic & natural", "Futuristic / tech"] },
                    { id: "colors_existing", label: "Do you have existing brand colours?", type: "radio", options: ["Yes — I'll share them", "No — I need help choosing", "Partially — open to refinement"] },
                    { id: "colors_notes", label: "Colour preferences or hex codes", type: "text", placeholder: "#B98B2F, gold + dark tones..." },
                    { id: "fonts_existing", label: "Do you have existing fonts / typography?", type: "radio", options: ["Yes", "No", "Not sure"] },
                    { id: "avoid", label: "Anything you absolutely want to avoid?", type: "textarea", placeholder: "Styles, colours, references that feel wrong for your brand..." },
                ],
            },
            {
                title: "Project Context",
                fields: [
                    { id: "usage", label: "Where will designs be used?", type: "multiselect", options: ["Digital / web", "Print", "Social media", "Out-of-home / signage", "Product packaging", "Video / motion"] },
                    { id: "timeline", label: "What is your ideal delivery timeline?", type: "select", options: ["ASAP (rush)", "Within 1 week", "2–3 weeks", "1 month+", "Flexible"] },
                    { id: "budget", label: "Approximate budget range (local currency)", type: "select", options: ["Under 500", "500 - 1,500", "1,500 - 5,000", "5,000+", "To be discussed"] },
                    { id: "inspiration", label: "Share any inspiration links, moodboards, or references", type: "textarea", placeholder: "URLs, Pinterest boards, Dribbble shots..." },
                    { id: "extra", label: "Anything else we should know?", type: "textarea", placeholder: "Context, constraints, stakeholders involved..." },
                ],
            },
            {
                title: "Contact",
                fields: [
                    { id: "contact_name", label: "Your Full Name", type: "text", placeholder: "Jane Smith", required: true },
                    { id: "contact_email", label: "Email Address", type: "email", placeholder: "jane@company.com", required: true },
                    { id: "contact_phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+351 900 000 000" },
                    { id: "contact_company", label: "Company / Project Name", type: "text", placeholder: "If different from above" },
                ],
            },
        ],
    },
    {
        id: "web-app",
        title: "App/Website Questionnaire",
        tagline: "To ensure clarity and understanding of your needs.",
        subtitle: "Digital Product Development",
        description: "Share your goals, target audience, and required features so we can plan the ideal digital experience.",
        sections: [
            {
                title: "Project Overview",
                fields: [
                    { id: "project_name", label: "Project / Product Name", type: "text", placeholder: "e.g. My SaaS Platform", required: true },
                    { id: "project_type", label: "What are you building?", type: "radio", options: ["Marketing / corporate website", "E-commerce store", "Web application (SaaS/portal)", "Mobile app", "Landing page", "Redesign of existing site", "Other"] },
                    { id: "project_description", label: "Describe your project in detail", type: "textarea", placeholder: "What problem does it solve? What's the core user journey?", required: true },
                    { id: "existing_url", label: "Existing website URL (if redesign)", type: "url", placeholder: "https://yoursite.com" },
                ],
            },
            {
                title: "Audience & Goals",
                fields: [
                    { id: "target_users", label: "Who are your primary users?", type: "textarea", placeholder: "Age, occupation, tech-savviness, geography, goals..." },
                    { id: "primary_goal", label: "What is the #1 goal of this project?", type: "select", options: ["Generate leads", "Sell products / services", "Build brand awareness", "Serve existing customers", "Automate a workflow", "Launch an MVP", "Other"] },
                    { id: "success_metrics", label: "How will you measure success?", type: "multiselect", options: ["Traffic / visitors", "Conversion rate", "Sign-ups / leads", "Revenue", "Engagement / time on site", "App downloads", "Customer satisfaction (NPS)", "Other"] },
                    { id: "competitors_url", label: "Competitor or reference websites you like", type: "textarea", placeholder: "List URLs and what you like about them" },
                ],
            },
            {
                title: "Features & Functionality",
                fields: [
                    { id: "features", label: "Which features do you need?", type: "multiselect", options: ["Contact form", "Blog / CMS", "User login / accounts", "Admin dashboard", "Booking / calendar", "Payment processing", "Product catalogue", "Search & filtering", "API integrations", "Multilingual", "Analytics", "Live chat", "Newsletter signup", "Other"] },
                    { id: "cms", label: "Do you need to edit content yourself?", type: "radio", options: ["Yes — I want a CMS", "No — team manages it", "Not sure"] },
                    { id: "integrations", label: "Any tools / platforms to integrate?", type: "textarea", placeholder: "e.g. Stripe, HubSpot, Zapier, Google Analytics, Mailchimp..." },
                    { id: "tech_preference", label: "Technology preferences (if any)", type: "textarea", placeholder: "e.g. Next.js, WordPress, Webflow, React Native..." },
                ],
            },
            {
                title: "Design & Delivery",
                fields: [
                    { id: "design_style", label: "Preferred design style", type: "multiselect", options: ["Minimal / clean", "Bold / modern", "Corporate / trustworthy", "Creative / editorial", "Dark / premium", "Bright / energetic"] },
                    { id: "brand_assets", label: "Do you have brand assets ready?", type: "radio", options: ["Yes — logo, colours, fonts ready", "Partial — some assets exist", "No — starting from scratch"] },
                    { id: "pages_count", label: "Estimated number of pages / screens", type: "select", options: ["1–5", "6–15", "16–30", "30+", "Not sure yet"] },
                    { id: "timeline", label: "Target launch date / timeline", type: "select", options: ["ASAP", "1 month", "2–3 months", "3–6 months", "Flexible"] },
                    { id: "budget", label: "Budget range (local currency)", type: "select", options: ["Under 1,000", "1,000 - 5,000", "5,000 - 15,000", "15,000+", "To be discussed"] },
                ],
            },
            {
                title: "Contact",
                fields: [
                    { id: "contact_name", label: "Your Full Name", type: "text", placeholder: "Jane Smith", required: true },
                    { id: "contact_email", label: "Email Address", type: "email", placeholder: "jane@company.com", required: true },
                    { id: "contact_phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+351 900 000 000" },
                    { id: "extra", label: "Anything else we should know?", type: "textarea", placeholder: "Constraints, stakeholders, inspiration..." },
                ],
            },
        ],
    },
    {
        id: "social-media",
        title: "Social Media Management",
        tagline: "Tell us about your channels and content preferences.",
        subtitle: "Content & Channel Management",
        description: "Help us understand your tone of voice, posting frequency, and the type of content your audience loves.",
        sections: [
            {
                title: "Your Brand Voice",
                fields: [
                    { id: "brand_name", label: "Brand / Company Name", type: "text", placeholder: "e.g. Autisync", required: true },
                    { id: "brand_description", label: "What does your brand do?", type: "textarea", placeholder: "Brief description of your product/service and what makes it unique", required: true },
                    { id: "tone", label: "How would you describe your brand's tone of voice?", type: "multiselect", options: ["Professional", "Friendly & approachable", "Witty & humorous", "Inspirational", "Educational", "Luxury / exclusive", "Bold & edgy", "Empathetic & caring"] },
                    { id: "tone_avoid", label: "Tone or topics to avoid", type: "textarea", placeholder: "e.g. avoid political content, no slang, never aggressive..." },
                ],
            },
            {
                title: "Channels & Audience",
                fields: [
                    { id: "channels", label: "Which platforms do you want managed?", type: "multiselect", options: ["Instagram", "Facebook", "LinkedIn", "TikTok", "X (Twitter)", "YouTube", "Pinterest", "Threads", "Other"] },
                    { id: "current_following", label: "Current follower counts (approximate)", type: "textarea", placeholder: "e.g. Instagram: 1,200 | LinkedIn: 400 | TikTok: 0" },
                    { id: "target_audience", label: "Who is your ideal social media follower?", type: "textarea", placeholder: "Age, interests, profession, location, pain points..." },
                    { id: "audience_goal", label: "Primary audience goal", type: "radio", options: ["Grow followers / awareness", "Drive website traffic", "Generate direct leads/sales", "Build community & engagement", "Establish thought leadership"] },
                ],
            },
            {
                title: "Content Strategy",
                fields: [
                    { id: "content_types", label: "What content types work for your brand?", type: "multiselect", options: ["Educational tips", "Behind-the-scenes", "Product / service showcase", "Client testimonials", "Team / culture", "Industry news", "Promotions & offers", "User-generated content", "Reels / short video", "Long-form video", "Carousels / infographics"] },
                    { id: "posting_frequency", label: "How often do you want to post?", type: "select", options: ["Daily", "5x/week", "3–4x/week", "1–2x/week", "TBD"] },
                    { id: "content_provided", label: "Will you provide raw content (photos, videos)?", type: "radio", options: ["Yes — I'll provide assets", "No — you handle everything", "Mix — some from us, some created"] },
                    { id: "competitors_social", label: "Social accounts of competitors or brands you admire", type: "textarea", placeholder: "@handles or URLs" },
                    { id: "campaigns", label: "Any upcoming campaigns, launches, or events?", type: "textarea", placeholder: "Dates, product launches, seasonal promotions..." },
                ],
            },
            {
                title: "Goals & Budget",
                fields: [
                    { id: "kpis", label: "What KPIs matter most to you?", type: "multiselect", options: ["Follower growth", "Reach & impressions", "Engagement rate", "Link clicks / traffic", "DMs / enquiries", "Sales conversions", "Brand sentiment"] },
                    { id: "paid_ads", label: "Do you want paid social ads included?", type: "radio", options: ["Yes", "No", "Maybe — let's discuss"] },
                    { id: "reporting", label: "How often do you want performance reports?", type: "select", options: ["Weekly", "Bi-weekly", "Monthly", "Quarterly"] },
                    { id: "budget", label: "Monthly budget range (local currency)", type: "select", options: ["Under 500", "500 - 1,500", "1,500 - 3,000", "3,000+", "To be discussed"] },
                ],
            },
            {
                title: "Contact",
                fields: [
                    { id: "contact_name", label: "Your Full Name", type: "text", placeholder: "Jane Smith", required: true },
                    { id: "contact_email", label: "Email Address", type: "email", placeholder: "jane@company.com", required: true },
                    { id: "contact_phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+351 900 000 000" },
                    { id: "extra", label: "Anything else we should know?", type: "textarea", placeholder: "Login access, brand guidelines location, past content examples..." },
                ],
            },
        ],
    },
    {
        id: "tech-support",
        title: "Technical Support & Maintenance",
        tagline: "What kind of ongoing support do you expect?",
        subtitle: "IT Infrastructure & Support",
        description: "From updates to monitoring, let us know what level of technical coverage you'd like us to provide.",
        sections: [
            {
                title: "Your Current Setup",
                fields: [
                    { id: "business_name", label: "Business / Organisation Name", type: "text", placeholder: "e.g. Acme Ltd", required: true },
                    { id: "website_url", label: "Website URL(s)", type: "url", placeholder: "https://yoursite.com" },
                    { id: "tech_stack", label: "What technologies are in use?", type: "multiselect", options: ["WordPress", "Next.js / React", "Webflow", "Shopify", "Custom code", "PHP / Laravel", "Node.js", "Python / Django", "Not sure"] },
                    { id: "hosting", label: "Current hosting provider", type: "text", placeholder: "e.g. Vercel, AWS, Hetzner, Hostinger..." },
                    { id: "team_size", label: "How many people in your team use IT systems?", type: "select", options: ["1–5", "6–20", "21–50", "50+"] },
                    { id: "current_issues", label: "What problems are you currently experiencing?", type: "textarea", placeholder: "Slow site, security concerns, frequent crashes, no backups..." },
                ],
            },
            {
                title: "Support Scope",
                fields: [
                    { id: "services_needed", label: "What support services do you need?", type: "multiselect", options: ["Website updates & edits", "Bug fixes", "Performance optimisation", "Security monitoring", "Daily/weekly backups", "Domain & hosting management", "SSL certificates", "Device setup & configuration", "Helpdesk / user support", "Software installations", "Email setup (GSuite / M365)", "Database management", "API integrations", "Other"] },
                    { id: "response_time", label: "Expected response time for issues", type: "radio", options: ["Within 1 hour (critical)", "Same business day", "Within 48 hours", "Weekly batch — no urgency"] },
                    { id: "support_hours", label: "Support hours required", type: "radio", options: ["Business hours (Mon–Fri, 9–18)", "Extended (Mon–Fri, 8–20)", "Weekends included", "24/7"] },
                    { id: "monitoring", label: "Do you want proactive uptime monitoring?", type: "radio", options: ["Yes — alert me if anything goes down", "No — reactive only", "Not sure"] },
                ],
            },
            {
                title: "Security & Compliance",
                fields: [
                    { id: "gdpr", label: "Do you handle personal/customer data?", type: "radio", options: ["Yes — GDPR compliance needed", "Minimal data only", "Not sure"] },
                    { id: "backups_current", label: "Do you currently have a backup strategy?", type: "radio", options: ["Yes", "No", "Partial / unsure"] },
                    { id: "security_incidents", label: "Have you experienced security issues before?", type: "radio", options: ["Yes — hacks, malware, breaches", "No", "Suspected but unconfirmed"] },
                    { id: "access_control", label: "Any special access control requirements?", type: "textarea", placeholder: "e.g. two-factor auth, role-based access, VPN..." },
                ],
            },
            {
                title: "Contract & Budget",
                fields: [
                    { id: "contract_type", label: "Preferred arrangement", type: "radio", options: ["Monthly retainer", "Pay-per-incident", "Annual contract", "Project-based", "Not sure yet"] },
                    { id: "budget", label: "Monthly budget range (local currency)", type: "select", options: ["Under 200", "200 - 500", "500 - 1,500", "1,500+", "To be discussed"] },
                    { id: "start_date", label: "When do you need support to begin?", type: "select", options: ["Immediately", "Within 2 weeks", "Next month", "Flexible"] },
                    { id: "extra", label: "Any other context or requirements?", type: "textarea", placeholder: "Existing contracts, documentation, system diagrams..." },
                ],
            },
            {
                title: "Contact",
                fields: [
                    { id: "contact_name", label: "Your Full Name", type: "text", placeholder: "Jane Smith", required: true },
                    { id: "contact_email", label: "Email Address", type: "email", placeholder: "jane@company.com", required: true },
                    { id: "contact_phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+351 900 000 000" },
                    { id: "contact_role", label: "Your role / title", type: "text", placeholder: "e.g. CTO, Operations Manager, Owner" },
                ],
            },
        ],
    },
    {
        id: "ecommerce",
        title: "E-Commerce Store Setup",
        tagline: "Tell us your goals for your online store.",
        subtitle: "Online Store Development",
        description: "Products, shipping, payments and customer journey — share the essentials so we can structure your store.",
        sections: [
            {
                title: "Your Store",
                fields: [
                    { id: "store_name", label: "Store / Brand Name", type: "text", placeholder: "e.g. Tchary Glamour", required: true },
                    { id: "store_description", label: "What will you sell?", type: "textarea", placeholder: "Describe your products or services — physical, digital, or both", required: true },
                    { id: "product_count", label: "Approximate number of products at launch", type: "select", options: ["1–10", "11–50", "51–200", "200+", "Not sure yet"] },
                    { id: "existing_store", label: "Do you have an existing store?", type: "radio", options: ["Yes — migration / redesign", "No — starting from scratch"] },
                    { id: "existing_url", label: "Existing store URL (if applicable)", type: "url", placeholder: "https://yourstore.com" },
                ],
            },
            {
                title: "Products & Inventory",
                fields: [
                    { id: "product_types", label: "Product types", type: "multiselect", options: ["Physical products", "Digital downloads", "Services / bookings", "Subscriptions", "Bundles / kits", "Custom / made-to-order"] },
                    { id: "variants", label: "Do products have variants?", type: "radio", options: ["Yes (size, colour, etc.)", "No", "Some do"] },
                    { id: "inventory_management", label: "Do you need inventory tracking?", type: "radio", options: ["Yes — stock levels, low-stock alerts", "No", "Not sure"] },
                    { id: "product_images", label: "Do you have product photography ready?", type: "radio", options: ["Yes", "No — need guidance", "Partially"] },
                ],
            },
            {
                title: "Payments & Shipping",
                fields: [
                    { id: "payment_methods", label: "Payment methods to accept", type: "multiselect", options: ["Credit / debit card", "PayPal", "MB Way", "Multibanco", "Apple Pay / Google Pay", "Bank transfer", "Buy now, pay later (Klarna, etc.)", "Crypto"] },
                    { id: "currencies", label: "Currencies to support", type: "text", placeholder: "e.g. EUR, GBP, USD" },
                    { id: "shipping_regions", label: "Where will you ship to?", type: "multiselect", options: ["Portugal only", "Europe", "Worldwide", "No shipping (digital/local)"] },
                    { id: "shipping_methods", label: "Shipping methods / carriers", type: "textarea", placeholder: "e.g. CTT, DHL, free shipping over €50, click & collect..." },
                    { id: "tax", label: "Do you need tax / VAT handling?", type: "radio", options: ["Yes — PT VAT", "Yes — EU VAT (OSS)", "Yes — international tax", "No / not sure"] },
                ],
            },
            {
                title: "Customer Experience",
                fields: [
                    { id: "features", label: "Store features needed", type: "multiselect", options: ["Wishlist", "Product reviews", "Live chat", "Email order notifications", "Abandoned cart recovery", "Discount codes / vouchers", "Loyalty / points programme", "Product recommendations", "Multi-language", "Customer accounts"] },
                    { id: "design_style", label: "Preferred store aesthetic", type: "multiselect", options: ["Minimal & clean", "Luxury / high-end", "Bold & colourful", "Warm & organic", "Corporate / B2B", "Playful / lifestyle"] },
                    { id: "brand_assets", label: "Brand assets ready?", type: "radio", options: ["Yes — logo, colours, fonts", "Partial", "No — starting from scratch"] },
                    { id: "platform", label: "Platform preference (if any)", type: "select", options: ["Shopify", "WooCommerce (WordPress)", "Custom (Next.js)", "Webflow Commerce", "No preference", "Other"] },
                ],
            },
            {
                title: "Goals & Budget",
                fields: [
                    { id: "monthly_orders", label: "Expected monthly orders at launch", type: "select", options: ["Under 50", "50–200", "200–500", "500+", "Not sure"] },
                    { id: "timeline", label: "Target launch date", type: "select", options: ["ASAP", "Within 1 month", "1–2 months", "3+ months", "Flexible"] },
                    { id: "budget", label: "Budget range (store build, local currency)", type: "select", options: ["Under 1,000", "1,000 - 3,000", "3,000 - 8,000", "8,000+", "To be discussed"] },
                    { id: "extra", label: "Anything else to share?", type: "textarea", placeholder: "Existing supplier data, import requirements, post-launch support needs..." },
                ],
            },
            {
                title: "Contact",
                fields: [
                    { id: "contact_name", label: "Your Full Name", type: "text", placeholder: "Jane Smith", required: true },
                    { id: "contact_email", label: "Email Address", type: "email", placeholder: "jane@company.com", required: true },
                    { id: "contact_phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+351 900 000 000" },
                ],
            },
        ],
    },
    {
        id: "email-marketing",
        title: "Email Marketing Services",
        tagline: "What kind of newsletters or promotions do you plan?",
        subtitle: "Campaigns & Automation",
        description: "Tell us about your audience, frequency, and offers so we can craft high-performing email flows.",
        sections: [
            {
                title: "Your Brand & List",
                fields: [
                    { id: "brand_name", label: "Brand / Company Name", type: "text", placeholder: "e.g. Autisync", required: true },
                    { id: "brand_description", label: "What does your business do?", type: "textarea", placeholder: "Products/services, what problem you solve, your value proposition", required: true },
                    { id: "list_size", label: "Current email list size", type: "select", options: ["No list yet", "Under 500", "500–2,000", "2,000–10,000", "10,000+"] },
                    { id: "current_platform", label: "Current email platform (if any)", type: "text", placeholder: "e.g. Mailchimp, Klaviyo, Brevo, none yet" },
                    { id: "existing_campaigns", label: "Do you send emails currently?", type: "radio", options: ["Yes — regularly", "Yes — occasionally / ad-hoc", "No — starting fresh"] },
                ],
            },
            {
                title: "Audience & Segmentation",
                fields: [
                    { id: "target_audience", label: "Who are you emailing?", type: "textarea", placeholder: "Customer types, interests, purchase behaviour, demographics..." },
                    { id: "segments", label: "Do you have or need audience segments?", type: "radio", options: ["Yes — I have segments defined", "I'd like help creating segments", "No segmentation needed"] },
                    { id: "list_growth", label: "How do subscribers currently join your list?", type: "multiselect", options: ["Website signup form", "Lead magnet / freebie", "Purchase / checkout", "Events / in-store", "Social media", "Paid ads", "Don't have a system yet"] },
                ],
            },
            {
                title: "Campaign Strategy",
                fields: [
                    { id: "email_types", label: "What types of emails do you want?", type: "multiselect", options: ["Newsletter (regular updates)", "Promotional / sales", "Welcome series", "Abandoned cart recovery", "Post-purchase follow-up", "Re-engagement / win-back", "Transactional (order, shipping)", "Event / webinar invites", "Seasonal campaigns", "Drip / nurture sequences"] },
                    { id: "frequency", label: "Desired sending frequency", type: "select", options: ["Daily", "2–3x per week", "Weekly", "Bi-weekly", "Monthly", "Campaign-based only"] },
                    { id: "content_focus", label: "What will your emails mainly focus on?", type: "multiselect", options: ["Educational / tips", "Product / service announcements", "Discounts & promotions", "Brand storytelling", "Case studies / testimonials", "Event invitations", "Industry news / roundups"] },
                    { id: "tone", label: "Email tone of voice", type: "multiselect", options: ["Formal / corporate", "Conversational & friendly", "Witty & engaging", "Inspirational", "Direct & to-the-point", "Luxury / refined"] },
                ],
            },
            {
                title: "Design & Automation",
                fields: [
                    { id: "design_style", label: "Preferred email design style", type: "multiselect", options: ["Fully designed (branded templates)", "Text-heavy / newsletter", "Minimal / clean", "Image-led / visual", "Plain text (personal feel)"] },
                    { id: "brand_assets", label: "Brand assets available?", type: "radio", options: ["Yes — full brand kit ready", "Partial — logo + colours", "No — need from scratch"] },
                    { id: "automation", label: "Do you want automated email flows?", type: "radio", options: ["Yes — full automation setup", "Some automations", "Manual sends only", "Not sure"] },
                    { id: "crm_integration", label: "CRM or tools to integrate with?", type: "textarea", placeholder: "e.g. Shopify, HubSpot, Salesforce, Webflow, none..." },
                ],
            },
            {
                title: "Goals & Budget",
                fields: [
                    { id: "primary_goal", label: "Primary goal of email marketing", type: "radio", options: ["Drive sales / revenue", "Nurture leads into customers", "Retain & delight existing customers", "Grow brand awareness", "Drive website/blog traffic"] },
                    { id: "kpis", label: "KPIs you care about", type: "multiselect", options: ["Open rate", "Click-through rate", "Revenue per email", "Unsubscribe rate", "Conversion rate", "List growth rate"] },
                    { id: "reporting", label: "Reporting frequency", type: "select", options: ["After every send", "Weekly", "Monthly", "Quarterly"] },
                    { id: "budget", label: "Monthly budget range (local currency)", type: "select", options: ["Under 300", "300 - 800", "800 - 2,000", "2,000+", "To be discussed"] },
                    { id: "extra", label: "Anything else we should know?", type: "textarea", placeholder: "Past campaigns, what's worked/not worked, compliance needs (GDPR)..." },
                ],
            },
            {
                title: "Contact",
                fields: [
                    { id: "contact_name", label: "Your Full Name", type: "text", placeholder: "Jane Smith", required: true },
                    { id: "contact_email", label: "Email Address", type: "email", placeholder: "jane@company.com", required: true },
                    { id: "contact_phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+351 900 000 000" },
                ],
            },
        ],
    },
];

function FormField({ field, value, onChange, error }: {
    field: Field;
    value: string | string[];
    onChange: (id: string, val: string | string[]) => void;
    error?: string;
}) {
    const base = `w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-2 ${
        error
            ? "border-red-400 focus:border-red-400 focus:ring-red-200"
            : "border-gray-200 focus:border-[#b98b2f] focus:ring-[#b98b2f]/20"
    }`;

    const toggleMulti = (opt: string) => {
        const arr = Array.isArray(value) ? value : [];
        onChange(field.id, arr.includes(opt) ? arr.filter((v) => v !== opt) : [...arr, opt]);
    };

    if (field.type === "multiselect") {
        const arr = Array.isArray(value) ? value : [];
        return (
            <div className={`flex flex-wrap gap-2 rounded-lg p-1 transition-all ${error ? "ring-1 ring-red-300" : ""}`}>
                {field.options!.map((opt) => {
                    const active = arr.includes(opt);
                    return (
                        <button key={opt} type="button" onClick={() => toggleMulti(opt)}
                                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                                    active
                                        ? "border-[#b98b2f] bg-[#b98b2f] text-white shadow-sm"
                                        : "border-gray-200 bg-white text-gray-600 hover:border-[#b98b2f]/50 hover:text-[#b98b2f]"
                                }`}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
        );
    }

    if (field.type === "radio") {
        return (
            <div className={`flex flex-col gap-2 rounded-lg p-1 transition-all ${error ? "ring-1 ring-red-300" : ""}`}>
                {field.options!.map((opt) => {
                    const active = value === opt;
                    return (
                        <label key={opt}
                               className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all duration-200 ${
                                   active
                                       ? "border-[#b98b2f] bg-[#b98b2f]/5 text-gray-900"
                                       : "border-gray-200 bg-white text-gray-700 hover:border-[#b98b2f]/40"
                               }`}
                        >
                            <input type="radio" name={field.id} value={opt} checked={active} onChange={() => onChange(field.id, opt)} className="sr-only" />
                            <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${active ? "border-[#b98b2f]" : "border-gray-300"}`}>
                {active && <span className="h-1.5 w-1.5 rounded-full bg-[#b98b2f]" />}
              </span>
                            {opt}
                        </label>
                    );
                })}
            </div>
        );
    }

    if (field.type === "select") {
        return (
            <select value={value as string} onChange={(e) => onChange(field.id, e.target.value)} className={`${base} appearance-none`}>
                <option value="">Select an option...</option>
                {field.options!.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        );
    }

    if (field.type === "textarea") {
        return (
            <textarea value={value as string} onChange={(e) => onChange(field.id, e.target.value)}
                      placeholder={field.placeholder} rows={3} className={`${base} resize-none`} />
        );
    }

    return (
        <input type={field.type} value={value as string} onChange={(e) => onChange(field.id, e.target.value)}
               placeholder={field.placeholder} className={base} />
    );
}


// ─── Questionnaire Modal ──────────────────────────────────────────────────────

function QuestionnaireModal({ q, onClose }: { q: Questionnaire; onClose: () => void }) {
    const [currentSection, setCurrentSection] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [website, setWebsite] = useState("");
    const [formStartedAt, setFormStartedAt] = useState<number>(() => Date.now());
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

    const section = q.sections[currentSection];
    const isLast = currentSection === q.sections.length - 1;

    // Lock body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleChange = (id: string, val: string | string[]) => {
        setAnswers((prev) => ({ ...prev, [id]: val }));
        if (errors[id]) setErrors((prev) => { const n = { ...prev }; delete n[id]; return n; });
    };

    // ── Validate current section ────────────────────────────────────────────────
    const validateSection = (): boolean => {
        const newErrors: Record<string, string> = {};

        section.fields.forEach((field) => {
            const val = answers[field.id];
            const isEmpty =
                val === undefined ||
                val === "" ||
                (Array.isArray(val) && val.length === 0);

            if (field.required && isEmpty) {
                newErrors[field.id] = "This field is required.";
                return;
            }

            if (!isEmpty && typeof val === "string" && val.trim() !== "") {
                if (field.type === "email") {
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
                        newErrors[field.id] = "Please enter a valid email address.";
                }
                if (field.type === "tel") {
                    if (!/^\+?[\d\s\-().]{7,20}$/.test(val))
                        newErrors[field.id] = "Please enter a valid phone number.";
                }
                if (field.type === "url") {
                    try { new URL(val); } catch { newErrors[field.id] = "Please enter a valid URL (e.g. https://example.com)."; }
                }
            }
        });

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            return false;
        }
        return true;
    };

    // ── Submit to API ───────────────────────────────────────────────────────────
    const submitForm = async () => {
        setSending(true);
        setSendError(null);

        if (!turnstileSiteKey || !turnstileToken) {
            setSendError("Please complete the verification check before submitting.");
            setSending(false);
            return;
        }

        try {
            const res = await fetch("/api/questionnaire", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: q.title,
                    sections: q.sections,
                    answers,
                    website,
                    form_started_at: formStartedAt,
                    turnstileToken,
                }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Failed to send. Please try again.");
            }
            setSubmitted(true);
            setWebsite("");
            setTurnstileToken(null);
            setFormStartedAt(Date.now());
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        } catch (err) {
            setSendError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setSending(false);
        }
    };

    const handleNext = () => {
        if (!validateSection()) return;
        if (isLast) {
            submitForm();
        } else {
            setCurrentSection((s) => s + 1);
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePrev = () => {
        if (currentSection > 0) {
            setErrors({});
            setCurrentSection((s) => s - 1);
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 24 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full max-w-2xl bg-gray-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                style={{ maxHeight: "90vh" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Gold accent bar at top */}
                <div className="h-1 w-full flex-shrink-0"
                     style={{ background: `linear-gradient(to right, ${GOLD_DARK}, ${GOLD_LIGHT})` }} />

                {/* ── Header ── */}
                <div className="flex-shrink-0 border-b border-gray-100 bg-white px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePrev}
                            disabled={currentSection === 0}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Previous step"
                        >
                            ←
                        </button>

                        <div className="flex-1 min-w-0">
                            <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 truncate">
                  {submitted ? q.title : `${q.title} — ${section.title}`}
                </span>
                                {!submitted && (
                                    <span className="ml-2 flex-shrink-0 text-xs font-semibold text-[#b98b2f]">
                    {Math.round(((currentSection + 1) / q.sections.length) * 100)}%
                  </span>
                                )}
                            </div>
                            {!submitted && (
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${((currentSection + 1) / q.sections.length) * 100}%`,
                                            background: `linear-gradient(to right, ${GOLD_DARK}, ${GOLD_LIGHT})`,
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all hover:bg-red-50 hover:border-red-200 hover:text-red-500"
                            aria-label="Close questionnaire"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {!submitted && (
                        <div className="mt-3 flex gap-1.5">
                            {q.sections.map((s, i) => (
                                <button
                                    key={s.title}
                                    onClick={() => i < currentSection && setCurrentSection(i)}
                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${i > currentSection ? "bg-gray-200" : i < currentSection ? "cursor-pointer" : ""}`}
                                    style={i <= currentSection ? { backgroundColor: GOLD } : {}}
                                    title={s.title}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Scrollable body ── */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto">
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center px-8 py-16 text-center"
                        >
                            <div
                                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full text-3xl text-white shadow-lg"
                                style={{ background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})` }}
                            >
                                ✓
                            </div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">All done!</h2>
                            <p className="mb-2 text-gray-500">
                                Thank you for completing the <strong>{q.title}</strong>.
                            </p>
                            <p className="mb-8 text-sm text-gray-400">
                                We&apos;ll review your answers and get back to you within 1 business day.
                            </p>
                            <p className="mb-8 text-sm text-gray-500">
                                A confirmation email has been sent to the email address you provided.
                            </p>
                            <button
                                onClick={onClose}
                                className="rounded-lg px-6 py-3 text-sm font-semibold text-white shadow transition-opacity hover:opacity-90"
                                style={{ background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})` }}
                            >
                                Close ✕
                            </button>
                        </motion.div>
                    ) : (
                        <div className="px-6 py-8">
                            <div hidden aria-hidden="true">
                                <label htmlFor="questionnaire_website">Website</label>
                                <input
                                    id="questionnaire_website"
                                    name="website"
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                                <input type="hidden" name="form_started_at" value={formStartedAt} readOnly />
                            </div>

                            <div className="mb-8">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#b98b2f]">
                  Step {currentSection + 1} of {q.sections.length}
                </span>
                                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                            </div>

                            {/* Send error banner */}
                            {sendError && (
                                <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                    </svg>
                                    <span>{sendError}</span>
                                </div>
                            )}

                            <div className="space-y-6">
                                {section.fields.map((field) => (
                                    <div key={field.id}>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            {field.label}
                                            {field.required && <span className="ml-1 text-[#b98b2f]">*</span>}
                                        </label>
                                        {field.id === "budget" && (
                                            <p className="mb-2 text-xs text-gray-400">Please use your local currency.</p>
                                        )}
                                        {field.hint && <p className="mb-2 text-xs text-gray-400">{field.hint}</p>}
                                        <FormField
                                            field={field}
                                            value={answers[field.id] ?? (field.type === "multiselect" ? [] : "")}
                                            onChange={handleChange}
                                            error={errors[field.id]}
                                        />
                                        {errors[field.id] && (
                                            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                                                <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4m0 4h.01"/>
                                                </svg>
                                                {errors[field.id]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {isLast && (
                                <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Security verification
                                    </p>
                                    {turnstileSiteKey ? (
                                        <TurnstileWidget
                                            siteKey={turnstileSiteKey}
                                            onTokenChange={setTurnstileToken}
                                            theme="light"
                                        />
                                    ) : (
                                        <p className="text-xs text-red-600">
                                            Verification is currently unavailable. Please try again later.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ── Sticky footer nav ── */}
                {!submitted && (
                    <div className="flex-shrink-0 border-t border-gray-100 bg-white px-6 py-4 flex items-center justify-between">
                        <button
                            onClick={handlePrev}
                            disabled={currentSection === 0 || sending}
                            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            ← Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={sending || (isLast && (!turnstileToken || !turnstileSiteKey))}
                            className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            style={{ background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})` }}
                        >
                            {sending && (
                                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                </svg>
                            )}
                            {sending ? "Sending..." : isLast ? "Submit ↗" : "Continue →"}
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ServiceQuestionnairePage() {
    const [active, setActive] = useState<string | null>(null);
    const activeQ = questionnaires.find((q) => q.id === active);

    return (
        <>
            <main className="min-h-screen bg-gray-100">
                {/* HERO — kept exactly from original */}
                <section className="relative overflow-hidden bg-gradient-to-b from-black via-black/80 to-black/70">
                    <div
                        className="absolute inset-0 bg-center bg-cover opacity-40"
                        style={{ backgroundImage: "url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90" />
                    <div className="relative px-4 pt-28 pb-20 mx-auto max-w-5xl text-center sm:px-6 lg:px-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
                        >
                            Service Questionnaire
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                            className="max-w-3xl mx-auto mt-6 text-base text-gray-200 sm:text-lg"
                        >
                            This isn&apos;t just any questionnaire; it&apos;s the secret sauce that fuels the success of our projects.
                            Help us understand your vision, goals, and needs. Say goodbye to miscommunication and hello to seamless execution.
                        </motion.p>
                    </div>
                </section>

                {/* CARDS GRID */}
                <section className="py-16 bg-gray-100">
                    <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
                        <div className="grid gap-8 md:grid-cols-2">
                            {questionnaires.map((item, index) => (
                                <motion.article
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.45, delay: index * 0.05 }}
                                    className="flex flex-col justify-between h-full p-8 bg-white rounded-lg shadow-lg shadow-black/5 border border-gray-100"
                                >
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-900">{item.title}</h2>
                                        <p className="mt-1 text-sm font-medium text-[var(--autisync-gold,#b98b2f)]">{item.tagline}</p>
                                        <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            onClick={() => setActive(item.id)}
                                            className="inline-flex items-center text-sm font-semibold text-[var(--autisync-gold,#b98b2f)] hover:text-gray-900 transition-colors"
                                        >
                                            Start this questionnaire
                                            <span className="ml-2 text-xs">↗</span>
                                        </button>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        <p className="mt-12 text-center text-xs text-gray-400">
                            All answers are confidential and used solely to prepare your project proposal.
                        </p>
                    </div>
                </section>
            </main>

            {/* Modal — layered on top, page stays in background */}
            <AnimatePresence>
                {activeQ && (
                    <QuestionnaireModal
                        q={activeQ}
                        onClose={() => setActive(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}