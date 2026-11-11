/**
 * Dados dos livros da Book Store usados nos testes.
 * Conferidos em https://demoqa.com/books e na API (GET /BookStore/v1/Books).
 */
export default {
  gitPocketGuide: {
    isbn: '9781449325862',
    title: 'Git Pocket Guide',
    subTitle: 'A Working Introduction',
    author: 'Richard E. Silverman',
  },

  /* Buscas e quantos livros cada uma deve mostrar.
     A busca olha título, autor e editora. */
  searches: [
    { term: 'JavaScript', count: 4 },
    { term: 'ECMAScript', count: 1 },
    { term: 'No Starch', count: 2 }, // editora
  ],

  notFoundSearch: 'livro-que-nao-existe',

  /* Livro falso, usado no mock de rede (06-mock-de-rede.spec.ts). */
  mockBook: {
    isbn: '9999999999999',
    title: 'Playwright para Iniciantes',
    subTitle: 'Aula de Novembro',
    author: 'Renata Andrade',
    publish_date: '2026-11-01T00:00:00.000Z',
    publisher: 'Testing With Renata',
    pages: 42,
    description: 'Um livro que só existe dentro deste teste.',
    website: 'https://testingwithrenata.com',
  },
};
