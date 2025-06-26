import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const ContactForm = ({ property }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in ${property.title} at ${property.address.full}. Please contact me with more information.`
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Your inquiry has been sent! We\'ll contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: `I'm interested in ${property.title} at ${property.address.full}. Please contact me with more information.`
      });
    } catch (error) {
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-card shadow-card p-6"
    >
      <div className="mb-6">
        <Text variant="heading" size="xl" weight="semibold" className="mb-2">
          Contact Agent
        </Text>
        <Text color="gray-600">
          Get more information about this property
        </Text>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Your full name"
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="your.email@example.com"
        />

        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="(555) 123-4567"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            required
            className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 bg-white resize-none"
            placeholder="Tell us what you're looking for..."
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
        >
          Send Inquiry
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <Text size="sm" color="gray-600" className="text-center">
          Or call us directly at{' '}
          <a href="tel:+1-555-123-4567" className="text-accent hover:underline font-medium">
            (555) 123-4567
          </a>
        </Text>
      </div>
    </motion.div>
  );
};

export default ContactForm;