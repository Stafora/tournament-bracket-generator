# tournament-bracket-generator
# Выполнение тестового задания - реализация генератора турнирной сетки 

```
Задание дается на 4 дня, состоит из двух частей, первая часть обязательна к выполнению, т.к. вторая не имеет без нее смысла<br><br>

Сдается в любом состоянии в виде репозитория gitlab/github с сопроводительным текстом:<br>
- сколько времени потрачено на: поиск решения, решение<br>
- какие возникли трудности<br><br>

Исполнение исключительно с использованием VueJS.<br><br>

Часть 1:<br><br>

Реализовать отображение турнирной сетки (playoff, на вылет) для любого количества игроков, с возможностью масштабирования (zoom in/out).<br><br>

Дерево двоичное, структура:<br>
name: String,
children: [
  {name: String, players: [{...}, {...}], children: ...}
]
<br><br>

Кол-во игроков задается в text input на странице (по умолчанию 8), после чего турнирная сетка отрисовывается автоматически. 1 ячейка в дереве = участник! 2 блока = матч<br><br>

Часть 2:<br><br>

Есть список игроков (реализовать рандомный список с рандомными названиями и уникальными id). <br>
Реализовать возможность размещения игроков в первый раунд посредством двух методов:<br>
- рандомное распределение по кнопке<br>
- драг/дроп<br><br>

Перетаскивание разрешить только в первый раунд, параметр разрешающий бросить игрока в раунд должен быть управляем свойством компонента "матч"

```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
