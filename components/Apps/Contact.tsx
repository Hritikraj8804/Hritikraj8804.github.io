'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin, Twitter, CheckCircle } from 'lucide-react';

const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/Hritikraj8804', color: 'hover:text-white' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com', color: 'hover:text-sky-400' },
];

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would send this to an API
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="h-full bg-[#0a0a0a] p-6 overflow-auto">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-400" />
                    Get In Touch
                </h2>
                <p className="text-sm text-white/60">
                    Have a question or want to work together? Drop me a message!
                </p>
            </div>

            {/* Contact Form */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4 mb-8"
            >
                <div>
                    <label className="block text-sm text-white/70 mb-1.5">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="Your name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-white/70 mb-1.5">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="your@email.com"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-white/70 mb-1.5">Message</label>
                    <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                        placeholder="Your message..."
                        required
                    />
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                    {isSubmitted ? (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            Message Sent!
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Send Message
                        </>
                    )}
                </motion.button>
            </motion.form>

            {/* Social Links */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <h3 className="text-sm font-medium text-white/50 mb-3">Or find me on</h3>
                <div className="flex gap-3">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 ${social.color} transition-colors`}
                        >
                            <social.icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
            </motion.div>

            {/* Direct Email */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10"
            >
                <p className="text-sm text-white/50 mb-1">Prefer email?</p>
                <a
                    href="mailto:hritikraj8804@gmail.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                    hritikraj8804@gmail.com
                </a>
            </motion.div>
        </div>
    );
}
