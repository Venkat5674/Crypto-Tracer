import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Have questions about cryptocurrencies or feedback about our platform? We'd love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center space-x-2 text-gray-700 mb-2">
              <User className="w-5 h-5" />
              <span>Name</span>
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-gray-700 mb-2">
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-gray-700 mb-2">
              <MessageSquare className="w-5 h-5" />
              <span>Message</span>
            </label>
            <textarea
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;