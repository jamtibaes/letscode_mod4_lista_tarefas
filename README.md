# Lista de Tarefas

https://jamtibaes.github.io/letscode_mod4_lista_tarefas/


## O que é? 
Trabalho de conclusão do modulo 4 da Let's Code Santander onde foi proposta alguns exemplos de aplicações para ser desenvolvidos com Javascript Vanilla, escolhi a opção de "Lista de Tarefas"

## Requisitos
1. Seletores
2. Manipulação de DOM
3. Escuta de Eventos
4. Manipulação de classes de CSS

## Funcionamento
Existem 3 botões na tela principal (Adicionar, Apagar e Cancelar Tarefas).


Existe um "Listener" ouvindo cada evento de click dos botões:


### Adicionar
  Ao clicar no botão adicionar, aparece uma caixa de texto e um botão para confirmar a adição da tarefa, o mesmo botão de adição se torna a opção cancelar e os outros botões aparecem desativados.
  
  
  Caso o campo esteja vazio é mostrado um alerta usando a metodo setTime(), informando que o o campo está vazio.
  
  
  O metodo setTime também é acionando assim que foi inserido uma tarefa válida informando um alerta que foi inserido uma tareda com sucesso
  
### Apagar
  Ao clicar no botão apagar, aparece um botão para confirmar a remoção da tarefa, o mesmo botão apagar se torna a opção cancelar e os outros botões aparecem desativados.
  
  
  Simultaneamente aparece em cada item da lista um campo de seleção, após selecionar os itens a serem apagados é necessário confirmar clicando no botão confirma.
  
  
  Será apresentado um alerta informando que os itens foram apagados com sucesso.
  
### Cancelar
  A ideia do botão cancelar e fazer com que a lista seja marcado como cancelado, sem precisar excluir a tarefa, assim é possível que o usuário saiba que o item foi cancelado e por isso não foi executado.
  
  
  Ao clicar no botão cancelar, aparece um botão para confirmar o cancelamento da tarefa, o mesmo botão cancelar se torna a opção cancelar e os outros botões aparecem desativados.
  
  
  Simultaneamente aparece em cada item da lista um campo de seleção, após selecionar os itens a serem cancelados é necessário confirmar clicando no botão confirma, assim o texto da lista aparece com uma listra no meio do texto.
  
  
  Será apresentado um alerta informando que os itens foram cancelados com sucesso.


## Requisitos cumpridos
- [x] Seletores
- [x] Manipulação de DOM
- [x] Escuta de Eventos
- [x] Manipulação de classes de CSS


## Desafios
1. Salvar todos os itens da lista no LocalStorage como um array.


## Ideias de melhorias
- [ ] Inserir data e hora na lista de tarefas
- [ ] Melhorar o estilo do campo de seleção, onde ao seleciona o texto da lista, já selecione o campo


