export default async function UF({ params }) {
    const { sigla } = await params

    return(
        <>
            <h1>UF: {sigla}</h1>
        </>
    )
}
