import axios from "axios"
import { useState, useEffect } from "react"

export default function Cidades({ uf }) {
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
        if (uf) {
          listarCidades(uf.sigla)
        }
      }, [uf])

    return(
        <>
            {uf &&
                <>
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
