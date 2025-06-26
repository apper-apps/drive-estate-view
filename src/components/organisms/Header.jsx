import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import SearchBar from '@/components/molecules/SearchBar';
import ApperIcon from '@/components/ApperIcon';
import { routeArray } from '@/config/routes';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const visibleRoutes = routeArray.filter(route => !route.hidden);

  const handleSearch = (query) => {
    // Handle search functionality - would typically navigate to properties with search params
    console.log('Search query:', query);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Home" size={20} className="text-white" />
            </div>
            <Text variant="heading" size="xl" weight="bold" color="primary">
              EstateView
            </Text>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {visibleRoutes.map((route) => (
              <Link
                key={route.id}
                to={route.path}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200
                  ${location.pathname === route.path
                    ? 'text-accent bg-blue-50 border-b-2 border-accent'
                    : 'text-gray-700 hover:text-accent hover:bg-gray-50'
                  }
                `}
              >
                <ApperIcon name={route.icon} size={18} />
                <Text weight="medium">{route.label}</Text>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            icon={mobileMenuOpen ? "X" : "Menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          />
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:block pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            {/* Mobile Search */}
            <div className="mb-4">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {visibleRoutes.map((route) => (
                <Link
                  key={route.id}
                  to={route.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${location.pathname === route.path
                      ? 'text-accent bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <ApperIcon name={route.icon} size={20} />
                  <Text weight="medium">{route.label}</Text>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;