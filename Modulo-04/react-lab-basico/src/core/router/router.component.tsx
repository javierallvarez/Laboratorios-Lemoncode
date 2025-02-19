import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ListPage, DetailPage, RickMortyList, RickMortyDetail } from '@/scenes';
import { MainLayout } from '@/layouts/MainLayout';
import { switchRoutes } from './routes';

export const AppRouter: React.FC = () => (
  <Router>
    <MainLayout>
      <Routes>
        <Route path={switchRoutes.root} element={<ListPage />} />
        <Route path={switchRoutes.detail} element={<DetailPage />} />
        <Route path={switchRoutes.rickMorty} element={<RickMortyList />} />
        <Route path={switchRoutes.rickMortyDetail} element={<RickMortyDetail />} />
      </Routes>
    </MainLayout>
  </Router>
);
