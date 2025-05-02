
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formState.name || !formState.email || !formState.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
    }, 1000);
  };
  
  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      details: [
        "PickMyPitch HQ",
        "123 Sports Avenue, T. Nagar",
        "Chennai 600017, Tamil Nadu, India"
      ]
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      details: [
        "+91 98765 43210",
        "+91 44 2223 3344"
      ]
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      details: [
        "hello@pickmypitch.com",
        "support@pickmypitch.com"
      ]
    }
  ];
  
  const staggerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-r from-turf-800 to-sport-900 text-white">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-gray-200">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Form & Info */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h2>
              
              {isSubmitted ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-4 inline-block">
                    <CheckCircle size={50} className="text-green-500 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    Your message has been sent successfully. We'll get back to you soon!
                  </p>
                  <Button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: '', email: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      rows={5}
                      className="w-full"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-turf-600 to-sport-600 hover:from-turf-700 hover:to-sport-700 text-white"
                  >
                    <Send size={16} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>
            
            {/* Contact Info */}
            <div>
              <motion.h2 
                className="text-2xl font-bold mb-6 text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Get in Touch
              </motion.h2>
              
              <motion.div
                variants={staggerAnimation}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={index}
                    variants={itemAnimation}
                    className="flex items-start p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="bg-turf-100 p-3 rounded-full mr-4">
                      <span className="text-turf-600">{info.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 rounded-xl overflow-hidden shadow-lg border border-gray-200"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.1146383072!2d79.92880809887291!3d13.04762809538816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1713722341871!5m2!1sen!2sin" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="PickMyPitch Location"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our services.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={staggerAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { 
                  question: "How do I book a turf?", 
                  answer: "Simply browse available turfs, select your preferred location, date, and time, and complete the booking process. Payments can be made online through our secure payment gateway." 
                },
                { 
                  question: "Can I cancel my booking?", 
                  answer: "Yes, you can cancel your booking up to 24 hours before the scheduled time for a full refund. Cancellations made less than 24 hours in advance may be subject to partial or no refund." 
                },
                { 
                  question: "Are there any discounts for regular bookings?", 
                  answer: "Yes, we offer loyalty programs and package deals for regular users. Sign up for an account to access these special offers." 
                },
                { 
                  question: "Do you have turfs for multiple sports?", 
                  answer: "Absolutely! We offer turfs for various sports including football, cricket, tennis, basketball, and more across Tamil Nadu." 
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  variants={itemAnimation}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
