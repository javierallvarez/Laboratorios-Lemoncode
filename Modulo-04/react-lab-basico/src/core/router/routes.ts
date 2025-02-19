import { generatePath } from 'react-router-dom';

interface SwitchRoutes {
  root: string;
  detail: string;
  rickMorty: string;
  rickMortyDetail: string;
}

// Simplifico la definición de las rutas para que sea más fácil de mantener
export const switchRoutes: SwitchRoutes = {
  root: '/',
  detail: '/detail/:id',
  rickMorty: '/rick-morty',
  rickMortyDetail: '/rick-morty/:id',
};

// Creo una interfaz con las rutas y un objeto con las rutas
interface Routes extends Omit<SwitchRoutes, 'detail' | 'rickMortyDetail'> {
  detail: (id: string) => string;
  rickMortyDetail: (id: string) => string;
}

export const routes: Routes = {
  ...switchRoutes,
  detail: (id) => generatePath(switchRoutes.detail, { id }),
  rickMortyDetail: (id) => generatePath(switchRoutes.rickMortyDetail, { id }),
};
