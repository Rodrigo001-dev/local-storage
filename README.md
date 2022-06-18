## :page_with_curl: Projeto

<LINKEDIN>
Utilizando armazenamento local em um app!
</LINKEDIN>

Quando falamos de armazenamento no mobile, temos algumas estratégias:

- Online: quando falamos de armazenamento online podemos pensar em um firebase ou em uma API que vai fazer o gerenciamento do armazenamento das informações e que usa por exemplo um postgre.

- Offline: quando utilizamos uma estratégia offline, são aquelas estratégias em que é armazenado tudo localmente. Temos algumas opções como por exemplo: SQLite e Async Storage. Nesse caso optei por utilizar o Async Storage.

- Híbrido: nessa estratégia é uma junção das duas estratégias(online e offline). Nessa estratégia é sempre utilizado os dados offline e de tempo em tempo eu faço uma solicitação para alguma API por exemplo para verificar se existe algum dado novo e se existir, isso tem que refletir no armazenamento local para trazer essas mudanças, ou seja, no armazenamento híbrido temos as informações a princípio local e de tempo em tempo a minha aplicação pergunta para a API se existe algum dado novo.