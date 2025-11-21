import { createContext } from "react";

type SearchContextType = {
 handleSearch: (place: string, from: string, to: string, guests: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
    handleSearch: () => {},
});
