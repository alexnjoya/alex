'use client';

import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import TextInput from './TextInput';
import Textarea from './Textarea';
import Button from './Button';
import { ContactFormData } from '../../types';
// import { contactApi } from '../../lib/api';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setSubmitStatus(null);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Send form data to backend
      const response = await contactApi.sendMessage(formData);
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent! I will get back to you soon.',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          error={errors.name}
          fullWidth
        />
        
        <TextInput
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          error={errors.email}
          fullWidth
        />
      </div>
      
      <TextInput
        label="Subject"
        id="subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="What is this regarding?"
        error={errors.subject}
        fullWidth
      />
      
      <Textarea
        label="Message"
        id="message"
        name="message"
        rows={5}
        value={formData.message}
        onChange={handleChange}
        placeholder="Your message here..."
        error={errors.message}
        fullWidth
      />
      
      <div>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          icon={<FaPaperPlane />}
        >
          Send Message
        </Button>
      </div>
      
      {submitStatus && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`mt-4 p-3 rounded-md ${
            submitStatus.success 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
              : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
          }`}
        >
          {submitStatus.message}
        </motion.div>
      )}
    </motion.form>
  );
}