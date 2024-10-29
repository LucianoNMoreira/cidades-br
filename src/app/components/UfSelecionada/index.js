/**
 * 
 * @param {*} uf "id":11,"sigla":"RO","nome":"Rondônia","regiao":{"id":1,"sigla":"N","nome":"Norte"}}
 * @returns 
 */

export default function UfSelecionada({ uf }) {
    return(
        <>
            {!uf &&
                <p>Você ainda não selecionou uma UF</p>
            }
            {uf &&                
                <p>Você selecionou a UF <strong>{uf.nome}</strong></p>
            }
        </>
    )
}
