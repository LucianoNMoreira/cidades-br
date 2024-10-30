import axios from "axios"

export async function GET(request, { params }) {
  const { uf } = await params

  return Response.json(await listarCidades(uf))
}

async function listarCidades(uf) {
  try {
    const resposta = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`)
    const lista = resposta.data
    lista.sort((cidade1, cidade2) => cidade1.nome.localeCompare(cidade2.nome))
    return lista
  } catch(e) {
    console.error('Deu ruim', e)
  }
}
