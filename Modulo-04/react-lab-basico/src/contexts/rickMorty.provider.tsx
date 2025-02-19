import React, { createContext, useContext, useState, useEffect } from 'react';


interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}


interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}


interface RickMortyContextType {
  characters: Character[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}


const RickMortyContext = createContext<RickMortyContextType | undefined>(undefined);

export const RickMortyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(() => localStorage.getItem('searchTerm') || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);


  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);


  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const url = searchTerm
          ? `https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${currentPage}`
          : `https://rickandmortyapi.com/api/character/?page=${currentPage}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          if (response.status === 404) {
            setCharacters([]);
            setTotalPages(0);
            setError("No characters found");
            return;
          }
        }
        
        const data: CharactersResponse = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
        setError(null);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
        setCharacters([]);
        setTotalPages(0);

      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [searchTerm, currentPage]);


  // Defino el valor del contexto y se los paso a los componentes hijos
  return (
    <RickMortyContext.Provider 
      value={{ 
        characters, 
        searchTerm, 
        setSearchTerm, 
        loading, 
        error, 
        totalPages, 
        currentPage, 
        setCurrentPage 
      }}
    >
      {children}
    </RickMortyContext.Provider>
  );
};


export const useRickMorty = () => {
  const context = useContext(RickMortyContext);
  return context;
};
