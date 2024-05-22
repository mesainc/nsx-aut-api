const request = require('supertest');

const app = ('https://scores-api.webdevelopers.com.br'); // url
describe('Teste do endpoint de partidas de futebol ao vivo', () => {
    test('Deve retornar as partidas de futebol ao vivo para a data especificada', async () => {
      const date = '2023-02-10';
      const response = await request(app)
        .get(`/soccer/competition/live?date=${date}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined(); // Verifica se o corpo da resposta está definido
      expect(response.body).toBeInstanceOf(Object); // Verifica se o corpo da resposta é um array
  
      // Limpeza (opcional)
      // Aqui você pode adicionar código para fechar conexões ou realizar outras tarefas de limpeza, se necessário
    });
    // Teste negativo
  test('Deve retornar um erro quando a data não for válida', async () => {
    const date = '2023-99-99'; // Data inválida
    const response = await request(app)
      .get(`/soccer/competition/live?date=${date}`);
    
    expect(response.status).toBe(400); // Espera-se um erro 400 Bad Request
    expect(response.body).toBeInstanceOf(Object);

  });
});
describe('Teste do endpoint de categorias que retorna as competições', () => {
    test('Deve retornar as categorias de futebol', async () => {
      const response = await request(app)
        .get(`/soccer/competition/categories`);
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined(); // Verifica se o corpo da resposta está definido
      expect(response.body).toBeInstanceOf(Object); // Verifica se o corpo da resposta é um Onjeto
  
    });
    // Teste negativo
  test('Deve retornar um erro quando tem algum erro na url', async () => {
    const response = await request(app)
      .get(`/soccer/competition/categorie`);
    
    expect(response.status).toBe(404); // Espera-se um erro 400 Bad Request
    expect(response.body).toBeInstanceOf(Object);

  });
});
describe('Teste do endpoint de retorna a pesquisa de todas as competições', () => {
    test('Deve retornar as categorias de futebol', async () => {
      const response = await request(app)
        .get(`/soccer/competition/search`);
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined(); // Verifica se o corpo da resposta está definido
      expect(response.body).toBeInstanceOf(Object); // Verifica se o corpo da resposta é um Onjeto
    });
    // Teste negativo
  test('Deve retornar um erro quando tem algum erro na url', async () => {
    const response = await request(app)
      .get(`/soccer/competition/searc`);
    
    expect(response.status).toBe(404); // Espera-se um erro 400 Bad Request
    expect(response.body).toBeInstanceOf(Object);
 
  });
});
describe('Teste do endpoint de listar as conpetições pelo competitionId', () => {
    test('Deve retornar as partidas de futebol ao vivo para a data especificada', async () => {
        const competitionId = '978bedd2-f46f-46f3-a12c-b76d2e46c0be';
      const response = await request(app)
        .get(`/soccer/competition/${competitionId}/seasons`);
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined(); // Verifica se o corpo da resposta está definido
      expect(response.body).toBeInstanceOf(Object); // Verifica se o corpo da resposta é um Onjeto
  
    });
    // Teste negativo
  test('Deve retornar um erro quando o competitionId for errado', async () => {
    const competitionId = '978bedd2-f46f-46f3-a12c-b76d2e46c0b'; // Código invalido
    const response = await request(app)
        .get(`/soccer/competition/${competitionId}/seasons`);
    
    expect(response.status).toBe(500); // Espera-se um erro 500 Internal server error
    expect(response.body).toBeInstanceOf(Object);

  });
  test('Deve retornar um erro quando a ulr é inválida', async () => {
    const competitionId = '978bedd2-f46f-46f3-a12c-b76d2e46c0b'; // Código válido
    const response = await request(app)
       .get(`/soccer/competition/${competitionId}/season`); //url inválida
    
    expect(response.status).toBe(404); // Espera-se um erro 404 Not found
    expect(response.body).toBeInstanceOf(Object);
 
});
});
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1M2UyOGIwYi0yZDYzLTQ3ZjMtOGRlYi1hOGI3YjVmMmVjMmQiLCJpc0Fub255bW91c1VzZXIiOmZhbHNlLCJpYXQiOjE3MTYzOTY3OTUsImV4cCI6MTcxODk4ODc5NX0.gO8gbWCS3eVKYQr7DZRVB1oUsLoOTIk-5-OJLy5TNMA';
let invalidToken = 'WIiOiJhZWIyM';
describe('Teste do endpoint de agrupar por categorias', () => {
    test('Deve retornar as partidas de futebol das categorias', async () => {
    
      const response = await request(app)
        
        .get(`/soccer/competition/grouped-by-categories?page=1&perPage=1`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined(); // Verifica se o corpo da resposta está definido
      expect(response.body).toBeInstanceOf(Object); // Verifica se o corpo da resposta é um Onjeto
  
    });
    // Teste negativo
  test('Deve retornar um erro quando a ulr é inválida', async () => {
    const response = await request(app)
       .get(`/soccer/competition/grouped-by-categoriespage=1&perPage=1`); //url inválida
    
    expect(response.status).toBe(404); // Espera-se um erro 404 Not found
    expect(response.body).toBeInstanceOf(Object);
   
});
// Teste negativo
    test('Deve retornar um erro sem com token inválido', async () => {
    const response = await request(app)
    
   
    .get(`/soccer/competition/grouped-by-categories?page=1&perPage=1`)
    .set('Authorization', `Bearer ${invalidToken}`);

    expect(response.status).toBe(401); // Espera-se um erro 401 Bad Request
    expect(response.body).toBeInstanceOf(Object);

});
describe('POST /soccer/competition/all', () => {
   test('should return a list of all soccer competitions', async () => {
   const response = await request(app)
    .post('/soccer/competition/all')
    .expect('Content-Type', /json/)
    .expect(200);
  
      // Assuming the response body contains an Objeto of competitions
    expect(response.body).toBeInstanceOf(Object);
    console.log(response.body)
    
});
    // Teste negativo
  test('POST /soccer/competition/all com url invalida', async () => {
        const response = await request(app)
        
    .post('/soccer/competition/al')
    
    expect(response.status).toBe(404); // Espera-se um erro Not Found
    expect(response.body).toBeInstanceOf(Object);
    
    });

});
describe('POST /soccer/competition/all B', () => {
   test('should return a list of all soccer competitions', async () => {
  const response = await request(app)
    .post('/soccer/competition/all/B')
    .expect('Content-Type', /json/)
    .expect(200);
  
      // Assuming the response body contains an Onjeto of competitions
    expect(response.body).toBeInstanceOf(Object);
    console.log(response.body)
    
    });
    // Teste negativo
    test('POST /soccer/competition/all com parâmetro invalido', async () => {
        const response = await request(app)
        
    .post('/soccer/competition/all/1')
    
    expect(response.status).toBe(400); // Espera-se um erro 400 Bad Request
    expect(response.body).toBeInstanceOf(Object);
    
    });
    // Teste negativo
    test('POST /soccer/competition/all com url invalida', async () => {
        const response = await request(app)
        
        .post('/soccer/competitin/all/B')
    
        expect(response.status).toBe(404); // Espera-se um erro 404 Not found
        expect(response.body).toBeInstanceOf(Object);
});
describe('Teste do endpoint de categorias que retorna as recomendações', () => {
      test('Deve retornar as categorias de futebol', async () => {
      const response = await request(app)
      .get(`/soccer/competition/recommended`);
          
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined(); // Verifica se o corpo da resposta está definido
      expect(response.body).toBeInstanceOf(Object); // Verifica se o corpo da resposta é um Objeto
      
  });
        // Teste negativo
  test('Deve retornar um erro de competições quando tem algum erro na url', async () => {
    const response = await request(app)
    .get(`/soccer/competition/recommende`);
        
    expect(response.status).toBe(404); // Espera-se um erro 404 Bad Request
    expect(response.body).toBeInstanceOf(Object);
    
      });
    });
  });
});
