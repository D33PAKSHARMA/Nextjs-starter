'use client'

import React,{ createContext, useContext, useState } from "react";


const AppContext = createContext({});


export const MyContext = ({ children }: { children: React.ReactNode }) => {
    const [user,setUser] = useState()
    return (
        <AppContext.Provider value={{ user, setUser }}>
          {children}
        </AppContext.Provider>
    );
};


const useMyContext = ()=> useContext(AppContext);

export default useMyContext ;
