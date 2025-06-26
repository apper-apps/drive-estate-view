import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const PropertyMap = ({ properties, selectedProperty, onPropertySelect }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 47.6062, lng: -122.3321 });
  const [zoom, setZoom] = useState(11);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(price);
  };

  // Calculate map bounds based on properties
  useEffect(() => {
    if (properties.length > 0) {
      const lats = properties.map(p => p.coordinates.lat);
      const lngs = properties.map(p => p.coordinates.lng);
      
      const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
      const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
      
      setMapCenter({ lat: centerLat, lng: centerLng });
    }
  }, [properties]);

  return (
    <div className="relative w-full h-96 md:h-[500px] bg-gray-100 rounded-card overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <ApperIcon name="MapPin" size={48} className="text-gray-400 mx-auto mb-2" />
            <Text color="gray-500">Interactive Map View</Text>
            <Text size="sm" color="gray-400" className="mt-1">
              Click on property markers to view details
            </Text>
          </div>
        </div>
      </div>

      {/* Property Markers */}
      {properties.map((property, index) => {
        // Convert coordinates to pixel positions (simplified for demo)
        const x = 50 + (index % 4) * 200;
        const y = 100 + Math.floor(index / 4) * 150;
        
        const isSelected = selectedProperty?.Id === property.Id;

        return (
          <motion.div
            key={property.Id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute cursor-pointer"
            style={{ left: x, top: y }}
            onClick={() => onPropertySelect?.(property)}
          >
            {/* Property Marker */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative flex flex-col items-center transition-all duration-200
                ${isSelected ? 'z-20' : 'z-10'}
              `}
            >
              {/* Price Badge */}
              <Badge 
                variant={isSelected ? 'primary' : 'secondary'}
                className="mb-1 shadow-lg whitespace-nowrap"
              >
                {formatPrice(property.price)}
              </Badge>

              {/* House Icon */}
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors
                ${isSelected ? 'bg-primary text-white' : 'bg-white text-secondary'}
              `}>
                <ApperIcon name="Home" size={16} />
              </div>

              {/* Property Info Popup */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute top-full mt-2 bg-white rounded-lg shadow-xl p-4 min-w-64 max-w-xs"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <Text weight="semibold" size="sm" className="line-clamp-1">
                        {property.title}
                      </Text>
                      <Text size="xs" color="gray-600" className="line-clamp-1">
                        {property.address.full}
                      </Text>
                      <div className="flex items-center gap-3 mt-1">
                        <Text size="xs" color="gray-600">
                          {property.bedrooms} bed
                        </Text>
                        <Text size="xs" color="gray-600">
                          {property.bathrooms} bath
                        </Text>
                        <Text size="xs" color="gray-600">
                          {property.squareFeet.toLocaleString()} sq ft
                        </Text>
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow pointing to marker */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setZoom(zoom + 1)}
          className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50"
        >
          <ApperIcon name="Plus" size={16} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setZoom(zoom - 1)}
          className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50"
        >
          <ApperIcon name="Minus" size={16} />
        </motion.button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <Text size="xs" weight="medium" className="mb-2">Map Legend</Text>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-secondary rounded-full"></div>
          <Text size="xs" color="gray-600">Property Location</Text>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;