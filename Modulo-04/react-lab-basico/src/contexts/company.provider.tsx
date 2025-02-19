import React, { createContext, useContext, useState } from "react";

// setCompany es una función que recibe un string y no devuelve nada, se usa para cambiar el valor de company
interface CompanyContext {
    company: string;
    setCompany: (company: string) => void;
}


// Crea el contexto con valor inicial de undefined
const CompanyContext = createContext<CompanyContext | undefined>(undefined);


export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [company, setCompany] = useState<string>('lemoncode');

    return (
        <CompanyContext.Provider value={{ company, setCompany }}>
        {children}
        </CompanyContext.Provider>
    );
};


export const useCompany = () => {
    const context = useContext(CompanyContext);
    return context;
  };
