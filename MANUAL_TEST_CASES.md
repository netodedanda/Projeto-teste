# Casos de Teste Manuais - automationexercise

Abaixo estão passos manuais detalhados para validar os fluxos principais.

## Caso 1 - Registro de Usuário (positivo)
- Pré-condições: Acesso à internet; site `https://automationexercise.com` disponível.
- Passos:
  1. Abrir o navegador e acessar `https://automationexercise.com`.
  2. Clicar em `Signup / Login`.
  3. Preencher "Name" e "Email Address" com valores válidos.
  4. Clicar em "Signup".
  5. Em "Enter Account Information", preencher os campos obrigatórios (Title, Password, First name, Last name, Address, Country, State, City, Zipcode, Mobile Number).
  6. Clicar em "Create Account".
  7. Verificar mensagem "Account Created" e clicar em Continue.
  8. Verificar que o usuário está logado (texto "Logged in as <Name>").
- Resultado esperado: Conta criada com sucesso; usuário logado.

## Caso 2 - Registro com email já existente (negativo)
- Pré-condições: Existe um email já cadastrado.
- Passos:
  1. Acessar `Signup / Login`.
  2. Informar um email já registrado e clicar em Signup.
  3. Verificar se a mensagem "Email Address already exist!" é exibida.
- Resultado esperado: Exibição da mensagem de erro apropriada.

## Caso 3 - Adicionar produto ao carrinho e verificar (manual)
- Pré-condições: Usuário na home.
- Passos:
  1. Ir para `Products`.
  2. Clicar em `View Product` no primeiro produto.
  3. Anotar o nome do produto e clicar em `Add to cart`.
  4. No modal, clicar em `View Cart`.
  5. Verificar que o produto apareça na lista do carrinho com o nome correto.
- Resultado esperado: Produto aparece no carrinho com o nome correto e preço exibido.

## Caso 4 - Finalizar compra (manual)
- Pré-condições: Produto(s) no carrinho; usuário logado.
- Passos:
  1. Ir para `Cart` e clicar em `Proceed To Checkout`.
  2. Verificar os endereços de entrega e cobrança.
  3. Adicionar comentário se desejado.
  4. Clicar em `Place Order`.
  5. Preencher os dados do cartão (Name on Card, Card Number, CVC, Expiry Month/Year).
  6. Clicar em `Pay and Confirm Order`.
  7. Verificar mensagem de confirmação `Order Placed!`.
- Resultado esperado: Pedido finalizado e mensagem de confirmação exibida.

## Caso 5 - Remover item do carrinho
- Pré-condições: Pelo menos um item no carrinho.
- Passos:
  1. Ir para `Cart`.
  2. Clicar no ícone de excluir (delete) do item.
  3. Verificar que o item deixou de existir no carrinho e que o total foi atualizado.
- Resultado esperado: Item removido com sucesso.

## Notas gerais para execução manual
- Sempre limpar cache/seções previas antes de testar (usar modo incógnito se necessário).
- Registrar evidências (prints ou gravação de vídeo) em cada execução.
- Em caso de falha, coletar logs do console do navegador e capturas de tela.
