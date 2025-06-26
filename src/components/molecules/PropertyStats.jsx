import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const PropertyStats = ({ property }) => {
  const stats = [
    {
      icon: 'Bed',
      label: 'Bedrooms',
      value: property.bedrooms
    },
    {
      icon: 'Bath',
      label: 'Bathrooms',
      value: property.bathrooms
    },
    {
      icon: 'Home',
      label: 'Square Feet',
      value: property.squareFeet.toLocaleString()
    },
    {
      icon: 'Building',
      label: 'Property Type',
      value: property.propertyType
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-50 rounded-lg p-4 text-center"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-accent text-white rounded-full mx-auto mb-2">
            <ApperIcon name={stat.icon} size={20} />
          </div>
          <Text size="lg" weight="semibold" className="block mb-1">
            {stat.value}
          </Text>
          <Text size="sm" color="gray-600">
            {stat.label}
          </Text>
        </motion.div>
      ))}
    </div>
  );
};

export default PropertyStats;