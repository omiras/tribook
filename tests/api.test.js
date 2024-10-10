const API_URL = process.env.API_URL;

it('should return the list of apartment if we make a GET request to /api/apartments', async ()=> {

    // Arrange
    // Preparo el endpoint
    const url = "http://localhost:3000/api/apartments";
    

    // Act
    // Ejecitar el método fetch para realizar una petición GET al endpoint
    const response = await fetch(url);

    // Assert
    // Comprobar que nos devuelve un código 200 la petición HTTP GET
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200); 
    // Comprobar si el valor de la propiedad "message" es "Query executed successfully"
    const data = await response.json();
    expect(data.message).toBe("Query executed successfully");
    // Comprobar si existe el array 'results' y tiene al menos un elemento
    expect(data.results.length).toBeGreaterThan(0);
})

it('should return only one apartment if we make a GET request to /api/apartments with limit=1 in the query string', async ()=> {
    
    const url = "http://localhost:3000/api/apartments?limit=1";

    const response = await fetch(url);
    const data = await response.json();

    // el código de respesta es 200
    expect(response.status).toBe(200); 

    // si el "message" es el esperado
    expect(data.message).toBe("Query executed successfully");

    // si el array de apartamentos (results) solamente hay uno
    expect(data.results).toHaveLength(1);
})

it('should return an error if we make a GET request to /api/apartments with a wrong limit value', async ()=> {
    const url = "http://localhost:3000/api/apartments?limit=-7";

    const response = await fetch(url);
    const data = await response.json();

    expect(response.ok).toBe(false);
    expect(response.status).toBe(400);
    expect(data).not.toHaveProperty("results")
})