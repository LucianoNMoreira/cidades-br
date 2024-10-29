'use client'

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UfSelecionada from "./components/UfSelecionada";
import Cidades from "./components/Cidades";
import { UfContext } from "./Contexts/UfContext";

export default function Home() {
  const [ufs, setUfs] = useState([])
  const { ufSelecionada, setUfSelecionada } = useContext(UfContext)
  
  async function listarUFs() {
    try {
      const resposta = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      const lista = resposta.data
      lista.sort((uf1, uf2) => uf1.nome.localeCompare(uf2.nome))
      setUfs(lista)
    } catch(e) {
      console.error('Deu ruim', e)
    }
  }

  function listarUFsPromise() {
    return new Promise((resolve, reject) => {
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((resposta) => {
        const lista = resposta.data
        lista.sort((uf1, uf2) => uf1.nome.localeCompare(uf2.nome))  
        resolve(lista)
      })
      .catch(e => {
        reject(e)
      })
    })
  }

  function onSelect(ev) {
    const sigla = ev.target.value
    const uf = ufs.find(it => it.sigla === sigla)
    setUfSelecionada(uf)
  }

  useEffect(() => {
    if (ufs.length === 0) {
      listarUFs()
    }
  }, [ufs])

  return (
    <>
      <h1>Cidades do Brasil</h1>

      <label>Escolha um UF:</label>
      <select name="ufs" id="ufs" onChange={onSelect}>
        {ufs.map((uf, index) => {
          return(
            <option key={index} value={uf.sigla}>{uf.nome}</option>
          )
        })}
      </select>

      <hr/>

      <UfSelecionada
        uf={ufSelecionada}
      />
      
      {ufSelecionada &&
        <Cidades uf={ufSelecionada} />
      }

    </>
  );
}
