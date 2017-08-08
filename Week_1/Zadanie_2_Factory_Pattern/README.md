<img alt="logo" src="http://coderslab.pl/svg/logo-coderslab.svg" width="400">

# Factory Pattern & Revealing Module Pattern &ndash; sklep

## Zadanie

### Napisz aplikację pozwalającą dodawać nowe produkty do bazy sklepu. 

### 1. Przygotowanie do pracy

W `index.html` znajdziesz stworzony formularz służący dodawaniu produktów, a w `style.css` &ndash; potrzebne style. Nic w tych plikach nie zmieniaj. Edytuj tylko i wyłącznie plik `app.js`.

W tym zadaniu będziesz korzystać z Wzorca Odkrytego Modułu i Wzorca Fabryki. Odpowiednie szablony są już w pliku `app.js`. Nasz kod uruchomi się dopiero przy zdarzeniu `DOMContentLoaded`, więc swobodnie możesz operować drzewem DOM. 
W kodzie znajdziesz też zmienną `Shop`, do której jest przypisane samowywołujące się wyrażenie funkcyjne (__IFEE__) zwracające obiekt.

 
### 2. Fabryka &ndash; obsługa

Każdy produkt w sklepie powinien zawierać następujące dane:
* nazwę,
* kraj pochodzenia,
* informację, czy trzeba przechowywać w lodówce,
* typ produktu (vegetable, fruit, meat, fish).

Mięso i ryby muszą być przechowywane w lodówce, a owoce i warzywa &ndash; nie.


W kodzie znajdziesz następujące konstruktory:
* `vegetable()` &ndash; warzywo,
* `fruit()` &ndash; owoc,
* `meat()` &ndash; mięso,
* `fish()` &ndash; ryba.

Napisz konstruktory. Pamiętaj, że każdy z nich przyjmuje obiekt jako parametr.



Konstruktor powinien wyglądać następująco:
```
function Vegetable(options) {
    this.name = options.name;
    this.country = options.country;
    this.fridge = false;
    this.type = "vegetable";
}
```
Napisz pozostałe konstruktory zgodnie z powyższym przykładem.


W kodzie znajduje się funkcja `CreateItemFactory`, która jest fabryką/konstruktorem. Jej zadaniem jest tworzenie nowych obiektów na podstawie przekazanych danych.


### 3. Fabryka &ndash; działanie

Mamy już wszystkie typy produktów. Czas dokończyć fabrykę.

Do naszego głównego konstruktora `CreateItemFactory` dodajemy poprzez prototyp metodę `createItem`, która powinna przyjmować dwa następujące parametry:
* obiekt z danymi,
* ciąg znaków.

Metoda powinna zwracać nowy obiekt w zależności od przekazanego drugiego parametru. Skorzystaj z instrukcji `switch`.

Gdy drugim parametrem dla `createItem` jest `"vegetable"`, to zwracamy nowy obiekt przy pomocy odpowiedniego konstruktora i słowa kluczowego `new`. Jednocześnie przekazujemy konstruktowi pierwszy parametr metody:
```
//...
CreateItemFactory.prototype.createItem = function(options, type) {
//...
    return new Vegetable(options);
//...
}
```

### 4. Fabryka &ndash; uruchomienie

Nasza fabryka to też konstruktor. Należy zatem go wywołać. Stwórz zmienną `ShopDatabase`, do której zapisz obiekt zwrócony przez konstruktor. Nie zapomnij o słowie kluczowym `new`.

Jeśli zatem chcesz dodać nowy produkt, to skorzystaj z instancji znajdującej się w `ShopDatabase`:

```
var newItem = ShopDatabase.createItem(options, type)
```

Przetestuj działanie metody i zobacz, czy tworzy ona nowe obiekty w odpowiedni sposób.


### 5. Odkryty Moduł &ndash; omówienie

Dalsza część zadania to wykorzystanie naszej Fabryki wewnątrz Odkrytego Modułu. W pliku `app.js` znajduje się szkielet wzorca. Funkcje należy dokończyć w odpowiedni sposób. Wewnątrz szkieletu znajdują się trzy zmienne:
* `listOfItems` &ndash; jest to tablica, która będzie przechowywać wszystkie obiekty stworzone przy pomocy Fabryki,
* `shopForm` &ndash; jest to zmienna odwołująca się do formularza,
* `showItems` &ndash; jest to zmienna odwołująca się do miejsca, w którym będą dodawane nowe produkty.


### 6. Odkryty Moduł &ndash; dodanie obsługi zdarzenia

Do funkcji `attachEvent()` dopisz kod, który nałoży formularzowi nasłuchiwanie zdarzenia. W naszym przypadku będzie to `submit`. Gdy nastąpi zdarzenie związane z wysłaniem formularza, to niech wywoła się funkcja, która wykona następujące czynności:
* zablokuje standardowe zachowanie formularza przy pomocy `event.preventDefault()`,
* wypisze w konsoli wartości wszystkich elemetów `input` oraz `select` w konsoli.


### 7. Odkryty Moduł &ndash; dodanie obsługi zdarzenia, ciąg dalszy

W funkcji `attachEvent()` stwórz obiekt o nazwie `item`, który będzie miał następujące właściwości:
* `name`,
* `country`,
* `type`.

Wartościami tych właściwości niech będą odpowiednie dane pobrane z formularza. Następnie wypisz obiekt w konsoli.


### 8. Odkryty Moduł &ndash; dodanie produktów


Zadaniem funkcji `addItemToShop()` jest:

* stworzenie produktu,
* dodanie produktu do bazy sklepu,
* wyświetlenie nowego produktu.

Niech funkcja `addItemToShop()` przyjmuje dwa parametry:
* obiekt opisujący dany produkt,
* typ danego produktu.

W funkcji `addItemToShop()` wywołaj Fabrykę `ShopDatabase.createItem()` i przekaż Fabrycę te same parametry, które przyjmuje funkcja `addItemToShop()`.
Obiekt zwrócony przez Fabrykę zapisz do zmiennej i dodaj do tablicy `listOfItems`.



Dane pobrane z formularza przekaż funkcji `addItemToShop()`. 
Pamiętaj o odpowiednim przekazaniu funkcji danych pobranych z formularza.@@@@

Wywołaj funkcję `addItemToShop()` wewnątrz `attachEvent()`. 



### 8. Odkryty Moduł &ndash; wyświetlanie produktów

Kolejnym zadaniem jest dodanie nowego paragrafu jako ostatniego dziecka `showItems`. Dopisz zatem do `render()` odpowiedni kod. Ta funkcja jako parametr ma przyjmować obiekt.

Paragraf powinien zawierać wszystkie dane produktu (nazwa, kraj pochodzenia, typ, informację o przechowywaniu).

Wywołaj funkcję `render()` na końcu `addItemToShop()`. Przekaż funkcji jako parametr obiekt stworzony przez Fabrykę.@@@

### 9. Koniec :)