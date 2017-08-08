<img alt="Logo" src="http://coderslab.pl/svg/logo-coderslab.svg" width="400">

# Revealing Module Pattern &ndash; Kalkulator

## Zadanie

Napisz obsługę kalkulatora wykonującego następujące działania:
  * dodawanie,
  * odejmowanie,
  * mnożenie,
  * dzielenie.

Kalkulator powinien obsługiwać liczby dziesiętne oraz mieć historię wcześniejszych działań.


### 1. Przygotowanie do pracy

Pliki `index.html` oraz `style.css` są już przygotowane. Nic w nich nie zmieniaj. Interesuje Cię tylko i wyłącznie plik `app.js`, w którym znajdziesz szablon kodu.

Dzięki zastosowaniu Wzorca Odkrytego Modułu wszystkie funkcje obsługujące kalkulator będą ukryte (prywatne). Publiczna (widoczna z poziomu przeglądarki) jest tylko jedną metoda, która dzięki domknięciom ma dostęp do wszystkich prywatnych zmiennych i funkcji.

W kodzie znajdują się cztery zmienne:
  * `buttons` &ndash; tablica ze wszystkimi przyciskami w naszym kalkulatorze,
  * `historyView` &ndash; element drzewa DOM odpowiadający za wyświetlanie historii operacji,
  * `equationView` &ndash; element drzewa DOM odpowiadający za wyświetlanie obecnego wyrażenia,
  * `operations` &ndash; tablica ze wszystkimi operacjami matematycznymi, jakie może wykonać użytkownik.

Jest też zmienna `Calculator`, do której jest przypisane samowywołujące się wyrażenie funkcyjne (__IFEE__) zwracające obiekt.

Kod uruchomi się dopiero przy zdarzeniu `DOMContentLoaded`, więc możesz swobodnie operować drzewem DOM. 

**Twoim zadaniem jest rozbudowanie istniejących funkcji, tak aby mieć sprawnie działający kalkulator**.


 
### 2. Obsługa zdarzeń

Do funkcji `attachEvents()` dopisz kod nakładający nasłuchiwanie zdarzeń wszystkim przyciskom (__oprócz ostatniego__).
Po kliknięciu ma wywołać się funkcja, która wykona następujące zadania:
  * zablokuje standardowe zachowanie przycisku `event.preventDefault()`,
  * wypisze w konsoli tekst `Naciśnięto przycisk!`.

Do ostatniego przycisku (**=**) również dodaj nasłuchiwanie zdarzenia (kliknięcia). Wykonaj te same czynności, a w konsoli wypisz tekst `Sprawdzam wynik działania!`.

Wywołaj funkcję `attachEvents()` wewnątrz funkcji `init()`.
Pamiętaj, że `init()` zwracamy dalej. Dzięki temu staje się ona metodą obiektu zapisanego w zmiennej `Calculator`. Przed końcem pliku znajduje się więc wywołanie tej metody.

Jeśli wszystkie kroki zostały wykonane, kliknięcie na przycisk powinno wyświetlić w konsoli odpowiedni komunikat.



### 3. Wyświetlanie liczb

Zajmiemy się teraz funkcją `addCharacter()`. Jej zadaniem jest dodanie parametru jako ostatni element w tekście występującym wewnątrz `equationView`. Jako parametr ma ona przyjmować ciąg znaków. Oto wyjaśnienie, w tym przykładzie użytkownik wpisuje liczbę **98**:

* "" &ndash; pusty string, wartość początkowa,
* "9" &ndash; wartość po kliknięciu **9**,
* "98" &ndash; wartość po kliknięciu **8**.

Po prostu każda kolejno wpisana cyfra jest ostatnim znakiem w zmiennej `equationView`. 


Funkcja `addCharacter()` przyjmuje zatem parametr `data`, w którym przykazywany jest &ndash; dzięki właściwości `innerHTML` &ndash; wybrany przez użytkownika znak:

```
// ...
event.preventDefault();
addCharacter(event.target.innerHTML);
// ...
```

Na samym końcu należy wywołać tę funkcję na wszystkie przyciski (oprócz ostatniego) wewnątrz `attachEvents()`.



### 4. Obliczanie wartości wyrażenia

Teraz zajmij się funkcją `calculate()`, która powinna wykonać następujące czynności:
  * pobrać tekst znajdujący się wewnątrz `equationView` i zapisać go do zmiennej **eq**,
  * wywołać funkcję `eval()`, do której przekazujemy wyrażenie zapisane w zmiennej z poprzedniego punktu,
  * wynik wywołania `eval()` zapisać do zmiennej **sum**,
  * zmienną **sum** wyświetlić wewnątrz `equationView`.


Funkcja `eval()` wykonuje kod/wyrażenie przekazane w zmiennej. Daje nam ona możliwość wywołania kodu, który można dołączyć do programu w trakcie jego działania.

Wywołaj funkcję `calculate()` wewnątrz nasłuchiwania zdarzeń nałożonego na ostatni przycisk (button ze znakiem równości).

Jeśli wszystkie kroki zostały odpowiednio wykonane, aplikacja powinna pozwolić na wpisanie jakiegokolwiek wyrażenia, a naciśnięcie przycisku ze znakiem równości obliczy wyrażenie i wypisze je w odpowiednim miejscu.

Teoretycznie kalkulator jest już skończony. Czy zauważasz jednak pewne problemy?

---
#### Uwaga


Korzystamy z `eval()` do stworzenia prostego kalkulatora. Należy bardzo uważać. Do aplikacji mającej taką funkcję łatwo się włamać. Korzystaj z `eval()` z bardzo dużą rozwagą, a najlepiej unikaj tej funkcji.

---



### 5. Sprawdzanie wyrażenia

Musimy sprawdzić, czy wybrany przez użytkownika znak może zostać dodany do wyrażenia. Kiedy nie może?
1. Gdy użytkownik chce wprowadzić znak operatora po raz kolejny. Nie możemy mu pozwolić na takie działania: **2 ** 2**, **2 ++ 2**, **2 +- 2**. Może jednak wprowadzić np. **1 + 2** lub ** 1 + 2 + 3**.
1. Gdy użytkownik chce zacząć wyrażenie od operatora, a nie od liczby, niedopuszczalne jest zatem np. **+ 2**.

Jest to zadanie `checkEquation()`, która jako parametr przyjmuje tekst. Ta funkcja ma zwracać `false` w dwóch przypadkach:
* jeśli ostatnim znakiem wewnątrz naszego wyrażenia jest znak z tablicy `operations` (wtedy mielibyśmy dwa znaki pod rząd), a //użytkownik wprowadza operator po raz kolejny,
* jeśli nasze wyrażenie nie ma żadnych znaków i chcemy dodać znak z tablicy `operations` (nie możemy zaczynać wyrażenia od operatora).


Aby łatwiej skonstruować funkcję `checkEquation()`, skorzystaj z funkcji pomocniczej `checkIfCharIsOperation()`, której celem jest sprawdzenie, czy dany znak znajduje się w tablicy `operations`. Funkcja zwraca `true`, jeśli tak jest lub `false`, gdy parametr jest liczbą.


Wywołaj zatem funkcję `checkEquation()` wewnątrz nasłuchiwania zdarzeń na wszystkie przyciski oprócz ostatniego. Przekaż funkcji jako parametr tekst, który znajduje się w akurat naciśniętym przycisku (wykorzystaj `event.target`). Zapisz to, co zwraca funkcja, do zmiennej (np.: `canIAddChar`).


### 6. Modyfikacja dodawania znaku

Dzięki funkcjom opisanym w punkcie 6. mamy pewność, że wartość ukryta pod naciśniętym przyciskiem może zostać dodana do wyrażenia.

Zmodyfikuj `addCharacter()` w takim sposób, aby funkcja przyjmowała dwa parametry:
* pierwszy niech zostanie taki sam (czyli `data` opisana w punkcie 3.),
* drugi niech będzie flagą &ndash; wartością logiczną.

Funkcja `addCharacter()` powinna dodawać tekst do wyrażenia tylko wtedy, gdy flaga jest prawdą (`true`).

Przykładowe wywołanie funkcji:
```
//...
event.preventDefault();
var canIaddChar = checkEquation(event.target.innerHTML);
addCharacter(event.target, canIaddChar);
//...
```

### 7. Modyfikacja obliczania wyrażenia
Użytkownik nie może przekazać do kalkulatora np. takiego wyrażenia: **2+**.
Pozwalamy jednak wpisać takie działanie **2+2+**. Gdy jednak ostatnim znakiem w naszym wyrażeniu jest znak znajdujący się w tablicy `operations`, to otrzymamy błąd.

Dopisz taki kod do funkcji `calculate()`, który będzie usuwał ostatni znak wyrażenia, jeśli znajduje się on w tablicy `operations`. Dopiero po tej operacji wywołaj funkcję `eval()`.

//Może dopisać, jeśli znajduje się on w tablicy operations i wystąpił już wcześniej w wyrażeniu?

### 8. Historia operacji

Nasz kalkulator jest gotowy, hurra! Ale na tym nie koniec.
Dodamy do niego jeszcze ostatnią funkcjonalność &ndash; historię operacji.

Funkcja `updateHistory()` powinna jako parametr przyjmować ciąg znaków. Jej zadaniem jest dodanie do `historyView` jako element `p` operacji, która została właśnie wykonana. Wywołaj funkcję wewnątrz `calculate()`.

Przykład wywołania:
```
var currentEquation = equationView.innerHTML;  
//...
var answer = eval(currentEquation);
updateHistory(currentEquation + "=" + answer);
equationView.innerHTML = answer;
//...
```



### 9. Koniec, mnóż swoją wiedzę, dziel się nią z innymi, dodawaj nowe zagadnienia :)

