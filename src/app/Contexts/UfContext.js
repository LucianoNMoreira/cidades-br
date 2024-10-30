import Cookies from "js-cookie";

const { createContext, useState, useEffect, useContext } = require("react");

export const UfContext = createContext()
export const useUf = () => useContext(UfContext)

export const UfContextProvider = ({ children }) => {
    const [ufSelecionada, setUfSelecionada] = useState()

    useEffect(() => {
        console.log('ufSelecionada dentro de UfContext', ufSelecionada)
        const ufCookiesString = Cookies.get('uf')
        if(!ufSelecionada && ufCookiesString) {
            setUfSelecionada(JSON.parse(ufCookiesString))
        }else if(ufSelecionada) {
            Cookies.set('uf', JSON.stringify(ufSelecionada))
        }
    }, [ufSelecionada])

    return(
        <UfContext.Provider value={{ufSelecionada, setUfSelecionada}}>
            {children}
        </UfContext.Provider>
    )
}
