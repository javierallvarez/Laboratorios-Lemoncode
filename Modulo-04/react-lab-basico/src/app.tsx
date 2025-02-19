import React from "react";
import { CompanyProvider, RickMortyProvider } from "@/contexts";
import { AppRouter } from "@/core";

export const App = () => {
  return (
    <CompanyProvider>
      <RickMortyProvider>
        <AppRouter />
      </RickMortyProvider>
    </CompanyProvider>
  );
};