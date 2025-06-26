import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const FilterSidebar = ({ filters, onFiltersChange, onClose, isOpen }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePropertyTypeToggle = (type) => {
    const currentTypes = localFilters.propertyType || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    handleFilterChange('propertyType', newTypes);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose?.();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      location: '',
      priceMin: 0,
      priceMax: 0,
      bedroomsMin: 0,
      bathroomsMin: 0,
      propertyType: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const propertyTypes = ['House', 'Condo', 'Townhouse', 'Apartment'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 md:relative md:w-full md:shadow-none overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <Text variant="heading" size="xl" weight="semibold">
                  Filters
                </Text>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="X"
                  onClick={onClose}
                  className="md:hidden"
                />
              </div>

              {/* Location */}
              <div className="mb-6">
                <Text weight="medium" className="mb-3">Location</Text>
                <Input
                  placeholder="City, State, or ZIP"
                  value={localFilters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  icon="MapPin"
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Text weight="medium" className="mb-3">Price Range</Text>
                <div className="space-y-3">
                  <Input
                    type="number"
                    placeholder="Min Price"
                    value={localFilters.priceMin || ''}
                    onChange={(e) => handleFilterChange('priceMin', parseInt(e.target.value) || 0)}
                    icon="DollarSign"
                  />
                  <Input
                    type="number"
                    placeholder="Max Price"
                    value={localFilters.priceMax || ''}
                    onChange={(e) => handleFilterChange('priceMax', parseInt(e.target.value) || 0)}
                    icon="DollarSign"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <Text weight="medium" className="mb-3">Minimum Bedrooms</Text>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((num) => (
                    <Button
                      key={num}
                      variant={localFilters.bedroomsMin === num ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange('bedroomsMin', num)}
                      className="flex-1"
                    >
                      {num === 0 ? 'Any' : num}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div className="mb-6">
                <Text weight="medium" className="mb-3">Minimum Bathrooms</Text>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((num) => (
                    <Button
                      key={num}
                      variant={localFilters.bathroomsMin === num ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange('bathroomsMin', num)}
                      className="flex-1"
                    >
                      {num === 0 ? 'Any' : num}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-8">
                <Text weight="medium" className="mb-3">Property Type</Text>
                <div className="space-y-2">
                  {propertyTypes.map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(localFilters.propertyType || []).includes(type)}
                        onChange={() => handlePropertyTypeToggle(type)}
                        className="sr-only"
                      />
                      <div className={`
                        w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-colors
                        ${(localFilters.propertyType || []).includes(type)
                          ? 'bg-accent border-accent text-white'
                          : 'border-gray-300'
                        }
                      `}>
                        {(localFilters.propertyType || []).includes(type) && (
                          <ApperIcon name="Check" size={12} />
                        )}
                      </div>
                      <Text>{type}</Text>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleApplyFilters}
                  className="w-full"
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleClearFilters}
                  className="w-full"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;