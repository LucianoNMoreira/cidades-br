'use client'

import axios from "axios"
import { useState, useEffect } from "react"

import { useSearchParams } from 'next/navigation'


export default function Cidades() {
    const [uf, setUf] = useState()
 
    const searchParams = useSearchParams()
    const ufParam = searchParams.get('uf')

    const [cidades, setCidades] = useState([])

    async function getUf(uf) {
        try {
          const resposta = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}`)
          setUf(resposta.data)
        } catch(e) {
          console.error('Deu ruim', e)
        }
    }

    async function listarCidades(uf) {
        try {
          const resposta = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`)
          const lista = resposta.data
          lista.sort((cidade1, cidade2) => cidade1.nome.localeCompare(cidade2.nome))
          setCidades(lista)
        } catch(e) {
          console.error('Deu ruim', e)
        }
    }

    useEffect(() => {
        if (uf) {
          listarCidades(uf.sigla)
        }
    }, [uf])

    useEffect(() => {
        if (ufParam) {
            getUf(ufParam)
        }
    }, [])

    return(
        <>
            <p>ufParam {ufParam}</p>
            {uf &&
                <>
                    <h1>Cidades de {uf.nome}</h1>
                    <ul>
                        {cidades.map((cidade, index) => {
                        return(
                            <li key={index}>{cidade.nome}</li>
                        )
                        })}
                    </ul>
                </>
            }
        </>
    )
}
