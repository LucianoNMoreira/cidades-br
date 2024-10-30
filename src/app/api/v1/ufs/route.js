import axios from "axios"

export async function GET() {
    const ufs = await listarUFs()
    return Response.json(ufs)
}

async function listarUFs() {
    try {
      const resposta = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      const lista = resposta.data
      lista.sort((uf1, uf2) => uf1.nome.localeCompare(uf2.nome))
      return lista
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
