O método filter é uma função usada em JavaScript para trabalhar com listas (ou arrays). Ele serve para filtrar elementos de um array com base em uma condição. Ao usar filter, você passa uma função que será executada para cada item do array. Essa função deve retornar verdadeiro ou falso. Apenas os itens para os quais a função retorna verdadeiro são mantidos no novo array gerado pelo filter.

No exemplo que você mostrou, o código está verificando se existe um valor em uma variável chamada tipocriatura. Se esse valor existir, o array chamado resultado será filtrado. O filtro funciona da seguinte forma: ele percorre cada item do array e verifica se o valor da propriedade tipo_criatura daquele item é igual ao valor da variável tipocriatura. Se for igual, o item é mantido no novo array. Caso contrário, ele é descartado.

No fim do processo, a variável resultado passa a conter apenas os itens cujo tipo de criatura corresponde exatamente ao que foi especificado em tipocriatura.

Esse é um arrow function (função de seta), uma forma mais curta de escrever funções em JavaScript.
