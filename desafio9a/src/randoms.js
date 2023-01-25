let numerosAleatorios = []

const getRandoms = (cantidad) => {
    let min = 0;
    let max = 1000
    for (let i=0; i<cantidad; i++) {
    let x = Math.floor(Math.random()*(max-min+1)+min);
    numerosAleatorios.push(x); 
    }
    const resultado = {}
    numerosAleatorios.forEach(el => (resultado[el] = resultado[el] + 1 || 1))
    return resultado 
}

module.exports = getRandoms;



