# Requisitos da aplicação

## Cadastro de usuários/pessoas (Users)

**RF**
- [] Deve ser possível cadastrar uma pessoa.

**RN**
- [] Para cadastrar uma pessoa, o usuário que irá cadastra-lo deve ser um administrador.
- [] Não deve poder cadastrar um usuário com um CPF/CNPJ já existente (document_id)

## Cadastro de endereço de pessoas/usuários (User_address)

**RF**
- [] Deve ser possível cadastrar um endereço para uma pessoa.

**RN**
- [] Para cadastrar um endereço o usuário deve ser um administrador
- [] Será possível somente um endereço para cada pessoa.

## Cadastro de imovel (Property)

**RF**
- [] Deve ser possível cadastrar um imovel.

**RN**
- [] Para cadastrar um imóvel, o usuário deve ser um administrador.
- [] Ao cadastrar um imóvel deve ser associa-lo a um proprietário. (user_id)
- [] Não deve ser possível cadastrar um imóvel associando um proprietário não existente

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

## Renovação de contratos

**RF**
- [] Deve ser possível renovar um contrato.

**RN**
- [] Não deve ser possível renovar um contrato inexistente.
- [] Ao renovar um contrato a data inicio deverá ser a data de renovação (data atual)
- [] Deve registrar um historico de renovação de contratos, contendo o valor anterior
