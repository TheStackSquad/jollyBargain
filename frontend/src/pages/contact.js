// frontend/src/pages/contact.js
import React from "react";

// Import contact page components
import ContactHero from "../components/contactpage/contactHero";
import ContactForm from "../components/contactpage/contactForm";
import ContactInfo from "../components/contactpage/contactInfo";

function Contact() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - introduces the contact page */}
      <ContactHero />

      {/* Contact Information Section - displays contact details */}
      <ContactInfo />

      {/* Contact Form Section - handles user inquiries */}
      <ContactForm />
    </div>
  );
}

export default Contact;
