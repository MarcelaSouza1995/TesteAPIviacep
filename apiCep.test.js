const request = require('supertest');

const expectResponse = {
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}

const expectResponseBuscaPorEstadoCidadeRua = [
  {
    "cep": "33855-110",
    "logradouro": "Rua Diamantina",
    "complemento": "",
    "bairro": "Sevilha (1ª Seção)",
    "localidade": "Ribeirão das Neves",
    "uf": "MG",
    "ibge": "3154606",
    "gia": "",
    "ddd": "31",
    "siafi": "5091"
  },
  {
    "cep": "33938-080",
    "logradouro": "Rua Diamantina",
    "complemento": "",
    "bairro": "Jardim Alvorada (Justinópolis)",
    "localidade": "Ribeirão das Neves",
    "uf": "MG",
    "ibge": "3154606",
    "gia": "",
    "ddd": "31",
    "siafi": "5091"
  },
  {
    "cep": "33943-660",
    "logradouro": "Rua Diamantina",
    "complemento": "",
    "bairro": "Jardim de Alá (Justinópolis)",
    "localidade": "Ribeirão das Neves",
    "uf": "MG",
    "ibge": "3154606",
    "gia": "",
    "ddd": "31",
    "siafi": "5091"
  },
  {
    "cep": "33925-560",
    "logradouro": "Rua Diamantina",
    "complemento": "",
    "bairro": "Pedra Branca (Justinópolis)",
    "localidade": "Ribeirão das Neves",
    "uf": "MG",
    "ibge": "3154606",
    "gia": "",
    "ddd": "31",
    "siafi": "5091"
  },
  {
    "cep": "33938-026",
    "logradouro": "Beco Diamantina",
    "complemento": "",
    "bairro": "Jardim Alvorada (Justinópolis)",
    "localidade": "Ribeirão das Neves",
    "uf": "MG",
    "ibge": "3154606",
    "gia": "",
    "ddd": "31",
    "siafi": "5091"
  }
];

const responsePorCidade = [
  {
      "cep": "30010-960",
      "logradouro": "",
      "complemento": "",
      "bairro": "",
      "localidade": "Belo Horizonte",
      "uf": "MG",
      "ibge": "3106200",
      "gia": "",
      "ddd": "31",
      "siafi": "4123"
  }
]


API_URL = 'https://viacep.com.br'

const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;

 describe('Teste na API ViaCEP', () => {
  it('Testar a busca de determinado CEP', () => {

    request(API_URL).get('/ws/01001000/json/')
      .expect(STATUS_OK)
      .then(response => {
        expect(response.body).toEqual(expectResponse)
      })
  })

  it('Testar a busca de determinado CEP sem /json', () => {
    request(API_URL).get('/ws/01001000/')
      .expect(STATUS_BAD_REQUEST)
  })

  it('Busca por CEP com estado, cidade e rua', () => {
    request(API_URL).get('/ws/MG/Ribeirao Das Neves/Diamantina/json/').expect(STATUS_OK)
      .then(response => {
        expect(response.body).toEqual(expectResponseBuscaPorEstadoCidadeRua)
      })
  })

  it('Busca por CEP inválido', () => {
    request(API_URL).get('/ws/00000000/json').expect(STATUS_OK)
      .then(response => {
        expect(response.body).toEqual({"erro": true})
      })
  })
it('Buscar por CEP com cidade', () => {
  request(API_URL).get('/ws/MG/Belo Horizonte/json/')
  .expect(STATUS_OK)
  .then(response => {
    expect(response.body).toEqual(responsePorCidade)
  })
})

 })
