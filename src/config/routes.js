import Properties from '@/components/pages/Properties';
import PropertyDetail from '@/components/pages/PropertyDetail';
import MapView from '@/components/pages/MapView';
import Favorites from '@/components/pages/Favorites';

export const routes = {
  properties: {
    id: 'properties',
    label: 'Properties',
    path: '/',
    icon: 'Home',
    component: Properties
  },
  mapView: {
    id: 'mapView',
    label: 'Map View',
    path: '/map',
    icon: 'MapPin',
    component: MapView
  },
  favorites: {
    id: 'favorites',
    label: 'Favorites',
    path: '/favorites',
    icon: 'Heart',
    component: Favorites
  },
  propertyDetail: {
    id: 'propertyDetail',
    label: 'Property Detail',
    path: '/property/:id',
    icon: 'Home',
    component: PropertyDetail,
    hidden: true
  }
};

export const routeArray = Object.values(routes);
export default routes;