/**
 * Disclaimer: existen herramientas y metodologías más completas y complejas para este trabajo. EL jueves os daré algunos recursos gratis y de pagos por si quereis ahondar en el mundo del testing de aplicaciones
 */

it('should get a 404 if the endpoint is invalid', async () => {
    const response = await fetch('http://localhost:3000/api/apartmentx');


    expect(response.ok).toBe(false);
    expect(response.status).toBe(404);


})

it('should return a valid response it no query parameters are provided', async () => {
    const response = await fetch('http://localhost:3000/api/apartments');

    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('results');
    expect(Array.isArray(data.results)).toBe(true);
    expect(data.results.length).toBeGreaterThan(0);


})

// test negativo -> intentar averiguar si la API falla "bien" ante la recepción de datos inválidos

it('should return a 400 error response in case query parameter limit is invilid', async () => {
    const response = await fetch('http://localhost:3000/api/apartments?limit=-1');

    const data = await response.json();

    expect(response.ok).toBe(false);
    expect(response.status).toBe(400);
    expect(data).not.toHaveProperty('results');

})