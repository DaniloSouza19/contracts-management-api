# Requisitos da aplicação

## Cadastro de usuários (Users)

**RF**
- [x] Deve ser possível cadastrar uma usuário.

**RNF**
- [x] Deve utilizar o bcrypt para criptografar a senha.

**RN**
- [x] Não deve ser possível cadastrar um usuário com um e-mail já existente.
- [x] A senha deve ser criptografada antes de ser armazenada no banco de dados.

## Cadastro de pessoas (People)

**RF**
- [x] Deve ser possível cadastrar uma pessoa.

**RN**
- [x] Para cadastrar uma pessoa, o usuário que irá cadastra-lo deve ser um administrador.
- [x] Não deve ser possível cadastrar uma pessoa com um endereço inexistente.
- [x] Não deve poder cadastrar um usuário com um CPF/CNPJ já existente (document_id)

## Cadastro de endereço de pessoas (People_address)

**RF**
- [x] Deve ser possível cadastrar um endereço para uma pessoa.

**RN**
- [x] Para cadastrar um endereço o usuário deve ser um administrador
- [x] Será possível somente um endereço para cada pessoa.

## Cadastro de endereço de imóvel (Property_address)

**RF**
- [x] Deve ser possível cadastrar um endereço para uma imovel.

**RN**
- [x] Para cadastrar um endereço o usuário deve ser um administrador
- [x] Será possível somente um endereço para cada imovel.

## Cadastro de imóvel (Property)

**RF**
- [x] Deve ser possível cadastrar um imovel.

**RN**
- [x] Para cadastrar um imóvel, o usuário deve ser um administrador.
- [x] Ao cadastrar um imóvel deve ser associa-lo a um proprietário. (person_id)
- [x] Não deve ser possível cadastrar um imóvel associando um proprietário não existente.
- [x] Não deve ser possível cadastrar um imóvel associando um endereço inexistente.

## Cadastro de contratos (Contracts)

**RF**
- [] Deve ser possível cadastrar um contrato.

**RN**
- [] Para cadastrar um contrato, o usuário deve ser um administrador.
- [] Ao cadastrar um contrato deve ser associa-lo a um contratante. (contractor_id -> Users)
- [] Ao cadastrar um contrato deve ser associa-lo a um contratado. (customer_id -> Users)
- [] O Contrato deve ter um período de validade associado (inicio e fim).
- [] Não deve ser possível cadastrar um contrato com um contratante inexistente.
- [] Não deve ser possível cadastrar um contrato com um contratado inexistente.

## Lançamento/registro de pagamentos (Payments)

**RF**
- [] Deve ser possível cadastrar/registrar um pagamento.

**RN**
- [] Para registrar um pagamento, o usuário deve ser um administrador.
- [] Não deve ser possível registrar um pagamento com um contrato inexistente.
- [] Não deve ser possível registrar um pagamento com um contrato vencido.

## Renovação de contratos (Contracts_renewal_history)

**RF**
- [] Deve ser possível renovar um contrato.

**RN**
- [] Não deve ser possível renovar um contrato inexistente.
- [] Ao renovar um contrato a data inicio deverá ser informada não prendendo a data de renovação (data atual)
- [] Deve registrar um historico de renovação de contratos, contendo o valor anterior, data de contrato anterior (incio e fim) e data da renovação. (Renovations_contracts)
