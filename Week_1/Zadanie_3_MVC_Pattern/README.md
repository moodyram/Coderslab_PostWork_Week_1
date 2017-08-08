<img alt="logo" src="http://coderslab.pl/svg/logo-coderslab.svg" width="400">

# Model View Controller &ndash; Slider

## Zadanie

### Napisz prosty slider z zachowaniem następującej kolejności:
1. Pobierz dane na temat zdjęć z zewnętrznego zasobu (link znajdziesz w pliku `app.js`).
2. Napisz obsługę slidera z użyciem wzorca MVC (Model-View-Controller).


### 1. Przygotowanie do pracy

W projekcie znajdziesz następują pliki:
1. `index.html`, jest w nim element **div**, a inne elementy będziesz do tego pliku dołączać z nowo utworzonych obiektów.
2. `style.css`, w którym są przygotowane style do wyżej wymienionych elementów.

**Nic nie zmieniaj w powyższych plikach., Edytuj tylko i wyłącznie `app.js`**. 

W pliku `app.js` znajdziesz szablon wzorca MVC. Kod uruchomi się dopiero przy zdarzeniu `DOMContentLoaded`, więc swobodnie możesz operować drzewem DOM. Każda część aplikacji (Model, View, Controller) to inny konstruktor. Aby uruchomić aplikację, trzeba zatem stworzyć obiekty i połaczyć je na podstawie konstruktorów. //

* `Model` odpowiada za warstwę danych &ndash; w naszym przypadku łączenie się z zewnętrznym serwisem i zwracaniem tychże danych,
* `View` odpowiada za warstwę wizualną &ndash; w naszym przypadku są to wszystkie modyfikacje drzewa DOM,
* `Controller` odpowiada za połączenie modelu i widoku, tak aby wszystkie trzy części ze sobą współgrały.

 
### 2. Poznaj bind()

Jest to metoda wykonująca następujące czynności:
* tworzy nową funkcję na podstawie istniejącej,
* przepina nowej funkcji kontekst wywołania.

Przy pomocy `bind()` tworzymy zatem nową funkcję, w której możemy sami wskazać, jaki ma być wewnątrz niej `this`.

Przykład:
```
var Abc = {
    name: "Obiekt Abc",
    showName: function() {
        console.log(this.name);
    }
}

var Def = {
    name: "Obiekt Def"
}

Abc.showName(); // Wypisze "Obiekt Abc"

var newFunc = Abc.showName.bind(Def);
newFunc();     // Wypisze "Obiekt Def"
```

`bind()` jako pierwszy parametr przyjmuje nowy kontekst, każdy kolejny parametr zostanie wykorzystany jako już normalny parametr dla nowej funkcji.


### 3. Model

Zaczniemy od warstwy danych. Konstruktor `Model` ma trzy właściwości:
* `url` &ndash; jest to adres, z którym będziemy się łączyć,
* `data` &ndash; tutaj będziemy przechowywać dane, które pobierzemy (będzie to tablica),
* `items` &ndash; jest to długość tablicy z danymi.

`Model` ma również dwie metody dodane poprzez prototyp:
* `getAllItems(fn)`,
* `getItem(id)` &ndash; która zwraca z tablicy element o danym `id`.

Oto, co robi `getAllItems(fn)`:
* łączy się z adresem zapisanym w `url`,
* pobiera wszystkie dane,
* zapisuje dane w `data`,
* zapisuje długość tablicy w `items`,
* wywołuje funkcję przekazaną jako parametr.

Uzupełnij obie metody w odpowiedni sposób. 

Aby sprawdzić, czy wszystko działa, możesz dodać `console.log()` w odpowiednie miejsca. Nie zapomnij o utworzeniu obiektu na podstawie konstruktora:

```
//...
var sliderModel = new Model();
sliderModel.getAllItems();
//...
```

### 4. View &ndash; cześć pierwsza

Wyłączne zadanie `View` to odpowiadanie za Widok. Ma on dwie właściwości:
* `element` &ndash; jest element drzewa DOM, do którego będziemy dołączać nowe elementy,
* `onClick` &ndash; metoda wywoływana na kliknięcie przycisku, zostanie ona zaimplementowana wewnątrz Kontrolera i przekazana do Widoku później.

Zauważ, że konstruktor `View` jako parametr przyjmuje element z drzewa DOM.

Mamy tu jeszcze jedną metodę &ndash; `render()`. Przyjmuje ona jako parametr obiekt (taki, który znajduje się w tablicy danych w modelu). Zadaniem tej metody jest wstrzyknięcie elementów HTML wypełnionych danymi w odpowiednie miejsce i nałożenie zdarzeń na przyciski do obsługi slidera.

Poniżej znajduje się ciąg znaków reprezentujący elementy, które należy wstrzyknąć:
```
//...
this.element.innerHTML = '<h3>' + item.name + '</h3>' +
    '<div class="slider-image" style="background-image: url(' + item.image + ');"></div>' +
    '<h4>' + item.author + '</h4>' + '<button id="prev">Prev</button>' +
    '<button id="next">Next</button>';
//...
```
gdzie `item` to właśnie obiekt z danymi.


Gdy uzupełnisz metodę `render()`, spróbuj ją wywołać i sprawdzić, czy działa:

```
//...
var myObj = {
    name: "Test",
    image: "http://coderslab.pl/svg/logo-coderslab.svg",
    author: "Coders Lab"
}

var targetElement = document.getElementById('slider');
var sliderView = new View(targetElement);
sliderView.render(myObj);
//...
```


**Nie przejmuj się wyglądem. Ważne, aby działo**.

Jeśli widok oraz model działają, to możesz przejść dalej.

### 5. Controller &ndash; start

Nasz konstruktor `Controller` ma na starcie trzy właściwości:
* `myView` &ndash; odniesienie do widoku stworzonego przy pomocy konstruktora `View`,
* `myModel` &ndash; odniesienie do modelu stworzonego przy pomocy konstruktora `Model`,
* `index` &ndash; zmienna odpowiadająca za numer aktualnie wyświetlanego elementu z bazy.

`Controller` ma również trzy metody dodane poprzez prototyp:
* `init()` &ndash; rozpoczyna działanie całej aplikacji,
* `onClick()` &ndash; obsługuje kliknięcie mające na celu zmianę slajdu,
* `show()` &ndash; wykorzystuje pobieranie danego elementu z naszej "bazy" (czyli `Model.getItem(id)`) i wykorzystuje te dane, aby wyświetlić ja na Widoku (czyli `View.render(data)`).

Teraz należy stworzyć odpowiednie obiekty na podstawie konstruktorów.

```
//...
var sliderModel = new Model();
var targetElement = document.getElementById('slider');
var sliderView = new View(targetElement);
var sliderController = new Controller(sliderView, sliderModel);
//...
```
Pamiętaj. Od teraz wewnątrz kontrolera jesteśmy w stanie odwołać się do Modelu i Widoku. Są one dostępne jako właściwości obiektu stworzonego przez konstruktor `Controller` &ndash; `this.myModel` oraz `this.myView`.



### 6. Controller &ndash; show()

Metoda `show()` odpowiada za spięcie Modelu i Widoku w odpowiedni sposób. Wykonuje ona następujące czynności:
* pobiera dane z modelu za pomocą odpowiedniej metody na podstawie obecnego indeksu (`index` w `Controller`),
* zapisuje te dane do zmiennej,
* wywołuje metodę `render()` przekazuje metodzie jako parametr wcześniej pobrane dane.

Gdy napiszesz metodę `show()`, wklej poniższy kod pod koniec pliku:


```
//...
var sliderModel = new Model();
var targetElement = document.getElementById('slider');
var sliderView = new View(targetElement);
var sliderController = new Controller(sliderView, sliderModel);

var sliderHelper = sliderController.show.bind(sliderController);

sliderController.myModel.getAllItems(sliderHelper);
//...
```

Powyższy kod tworzy odpowiednie obiekty na podstawie konstruktorów. Najciekawszy kawałek kodu to:

```
var sliderHelper = sliderController.show.bind(sliderController);
```

Tworzymy funkcję `sliderHelper()` działającą identycznie jak `sliderController.show()`, ma jednak na sztywno ustawiony kontekst (`this`).

Powyższy kod połączy się z serwerem, a gdy otrzyma dane, to wywoła nasz `sliderHelper()`. Wynikiem tej operacji powinien być widok pokazujący zdjęcia, ich nazwy, autorów oraz przyciski.


### 7. Controller &ndash; onClick()

Przedostatnia metoda to `onClick()`, która jako parametr przyjmuje `event`. Będzie ona wywoływana na kliknięcie. Metoda ta wykonuje następujące czynności:
* wyłącza naturalne zachowanie elementu,
* przy pomocy `event.currentTarget` sprawdza po `id`, który przycisk został naciśnięty,
* jeśli został naciśnięty przycisk `next`, to zwiększa `index` o jeden, sprawdza jednocześnie, czy `index` może istnieć, jeśli nie, to ustawia go na zero,
* jeśli został naciśnięty przycisk `prev` to zmniejsza `index` o jeden, sprawdza jednocześnie, czy `index` może istnieć, jeśli nie, to ustawia go na ostatni element w tablicy,
* wywołuje z modelu metodę `getItem`, przekazuje metodzie jako parametr nowy `index`,
* zapisuje poprzednie wywołanie do zmiennej,
* wywołuje metodę `show()`, przekazuje jej jako parametr zmienną z poprzedniego podpunktu.

Aby sprawdzić, czy wszystko działa, musimy jeszcze dokonać kilku zmian.


### 8. Controller &ndash; metoda init()

Metoda `init()` ma na celu rozpoczęcie działania całej aplikacji. Nie przyjmuje ona parametrów i wykonuje następujące czynności:
* wywołuje z modelu &ndash; w odpowiedni sposób &ndash; metodę `getAllItems()`, 
* przekazuje jako parametr metodę `show()` z ustawionym na sztywno kontekstem wywołania (w tym przypadku `.bind(this)`),
* ustawia właściwość `onClick` w widoku na metodę `onClick` z kontrolera z ustawionym na sztywno kontekstem (również `.bind(this`)).

Po wykonaniu tego kodu mamy dostęp w widoku do metody onClick, w której `this` będzie wskazywać na kontroler.  

Bez przypięcia kontektu na sztywno, nasze metody nie mogłyby działać, gdyż `this` nie wskazywałby tam, gdzie trzeba.


### 9. View &ndash; część druga

Została nam ostatnia czynność. Podpięcie nasłuchiwania zdarzeń do przycisków. Należy to wykonać pod koniec metody `render()`. Wykonaj następujące kroki:
* złap przycisk `prev` i zapisz go do zmiennej,
* złap przycisk `next` i zapisz go do zmiennej,
* nałóż na te przyciski nasłuchiwanie, dzięki czemu na kliknięcie ma zadziałać metoda zapisana pod `this.onClick` przekazana wcześniej z kontrolera.

Jeśli wszystkie kroki zostały wykonane poprawnie, powinien zostać utworzony slider wykorzystujący jako wzorzec właśnie MVC.

### 9. Koniec. Sprawdź, czy slider dobrze działa. :)

