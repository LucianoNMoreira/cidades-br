import axios from "axios"

export async function GET(request, { params }) {
    const { uf } = await params
    return Response.json(await getUf(uf))
}

async function getUf(uf) {
    try {
      const resposta = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}`)
      return resposta.data
    } catch(e) {
      console.error('Deu ruim', e)
    }
  }
