'use client'

import axios from "axios"
import { useState, useEffect, useContext } from "react"

import { useUf } from "../Contexts/UfContext"

export default function Cidades() {
    const { ufSelecionada } = useUf()

    const [cidades, setCidades] = useState([])

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
        console.log('ufSelecionada', ufSelecionada)
        if (ufSelecionada) {
          listarCidades(ufSelecionada.sigla)
        }
    }, [ufSelecionada])

    return(
        <>
            {ufSelecionada &&
                <>
                    <h1>Cidades de {ufSelecionada.nome}</h1>
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
