'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import Cidade from "./cidade";

export default function Home() {
  const [ufs, setUfs] = useState([])
  const [ufSelecionada, setUfSelecionada] = useState()
  const [cidades, setCidades] = useState([])

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

  function onSelect(ev) {
    const sigla = ev.target.value
    const uf = ufs.find(it => it.sigla === sigla)
    setUfSelecionada(uf)
  }

  useEffect(() => {
    if (ufs.length === 0) {
      listarUFs()
      // listarUFsPromise().then(ufs => setUfs(ufs)).catch(e => console.error('Deu ruim', e))
    }
  }, [ufs])

  useEffect(() => {
    if (ufSelecionada) {
      listarCidades(ufSelecionada.sigla)
    }
  }, [ufSelecionada])

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

      {ufSelecionada &&
        <>
          <h2>Cidades de {ufSelecionada.nome}</h2>
          <ul>
            {cidades.map((cidade, index) => {
              return(
                <Cidade key={index} cidade={cidade} />
              )
            })}
          </ul>
        </>
      }

    </>
  );
}
