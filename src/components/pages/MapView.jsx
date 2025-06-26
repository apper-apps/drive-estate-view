import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";
import PropertyMap from "@/components/organisms/PropertyMap";
import PropertyCard from "@/components/molecules/PropertyCard";
import ApperIcon from "@/components/ApperIcon";
import propertyService from "@/services/api/propertyService";

const MapView = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await propertyService.getAll();
      setProperties(result);
      
      // Select first property by default
      if (result.length > 0) {
        setSelectedProperty(result[0]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

  const handleRetry = () => {
    loadProperties();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-96 md:h-[500px] bg-gray-200 rounded-card"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-card"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
          <Text variant="heading" size="xl" weight="semibold" className="mb-2">
            Failed to Load Map
          </Text>
          <Text color="gray-600" className="mb-6">
            {error}
          </Text>
          <Button variant="secondary" onClick={handleRetry}>
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <ApperIcon name="MapPin" size={48} className="text-gray-300 mx-auto mb-4" />
          <Text variant="heading" size="xl" weight="semibold" className="mb-2">
            No Properties to Display
          </Text>
          <Text color="gray-600" className="mb-6">
            No properties are available to show on the map
          </Text>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Text variant="heading" size="3xl" weight="semibold" color="primary" className="mb-2">
          Property Map View
        </Text>
        <Text color="gray-600">
          Explore properties by location and click markers for details
        </Text>
      </motion.div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <PropertyMap
          properties={properties}
          selectedProperty={selectedProperty}
          onPropertySelect={handlePropertySelect}
        />
      </motion.div>

      {/* Selected Property Details */}
      {selectedProperty && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Text variant="heading" size="xl" weight="semibold" className="mb-4">
            Selected Property
          </Text>
          <div className="max-w-md">
            <PropertyCard property={selectedProperty} />
          </div>
        </motion.div>
      )}

      {/* All Properties List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <Text variant="heading" size="xl" weight="semibold">
            All Properties
          </Text>
          <Text size="sm" color="gray-600">
            {properties.length} properties found
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              onClick={() => setSelectedProperty(property)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedProperty?.Id === property.Id ? 'ring-2 ring-accent rounded-card' : ''
              }`}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MapView;