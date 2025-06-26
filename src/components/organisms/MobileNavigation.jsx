import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';
import { routeArray } from '@/config/routes';

const MobileNavigation = () => {
  const location = useLocation();
  const visibleRoutes = routeArray.filter(route => !route.hidden);

  return (
    <nav className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {visibleRoutes.map((route) => {
          const isActive = location.pathname === route.path;
          
          return (
            <Link
              key={route.id}
              to={route.path}
              className="flex flex-col items-center py-2 px-3 min-w-0 flex-1"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`
                  flex flex-col items-center transition-all duration-200
                  ${isActive ? 'text-accent' : 'text-gray-500'}
                `}
              >
                <ApperIcon 
                  name={route.icon} 
                  size={24} 
                  className={`mb-1 ${isActive ? 'text-accent' : 'text-gray-500'}`}
                />
                <Text 
                  size="xs" 
                  weight={isActive ? 'medium' : 'normal'}
                  className={`text-center line-clamp-1 ${isActive ? 'text-accent' : 'text-gray-500'}`}
                >
                  {route.label}
                </Text>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;