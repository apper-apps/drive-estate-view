import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        {/* 404 Illustration */}
        <motion.div
          animate={{ 
            rotateY: [0, 10, -10, 0],
            rotateX: [0, 5, -5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <ApperIcon name="Home" size={80} className="text-gray-300 mx-auto" />
        </motion.div>

        {/* Error Message */}
        <Text variant="heading" size="4xl" weight="bold" color="primary" className="mb-4">
          404
        </Text>
        
        <Text variant="heading" size="xl" weight="semibold" className="mb-4">
          Page Not Found
        </Text>
        
        <Text color="gray-600" className="mb-8 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. 
          The property or page may have been moved or doesn't exist.
        </Text>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="primary" icon="Home" size="lg">
                Go Home
              </Button>
            </motion.div>
          </Link>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="outline" 
              icon="ArrowLeft" 
              size="lg"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </motion.div>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Text size="sm" color="gray-500">
            Need help? Contact us at{' '}
            <a 
              href="mailto:support@estateview.com" 
              className="text-accent hover:underline"
            >
              support@estateview.com
            </a>
          </Text>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;