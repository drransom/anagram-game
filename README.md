WORD GUESSING GAME
=====================
[Live demo][live]
This is a word guessing game implemented in React. The words come from
[Wordnik][wordnik].

The Game
-------
I implemented the game using a React component that creates the game DOM
and pure JavaScript for the game logic. A React component is just a view and
should have minimal state, so the state is contained entirely within the game
object.

* `WordGameView`: A React component that creates the DOM, holds no state, and
is re-rendered on any change in the game's state.
* `GameIntermediary`: Sets event listeners on the DOM, acts as an interface
between the, and makes calls to the Rails server.
* `WordGame`: holds the logic of the game.

Ths Server
-----------

This is a single-page app with no user accounts, login, or stored
history. However, the project specifications required the use of
Wordnik, which requires an API key, and therefore a server is needed to protect
the key.

I chose to use a Rails server because Rails has a good React gem that
that allows the app to be initialized with
```Ruby
<%= react_component('WordGameView', words: @words_arr,
url: url_for(controller: 'games', action: 'new')) %>
```

Todos
-------------
* Write tests. I am a TDD believer but in this case writing the tests ended
up taking a back seat to getting a production version of the project up.
* Better styling and user interactivity
* Accept any English word that is an anagram of the word provided by Wordnik.
This cannot be implemented through Wordnik because Wordnik has no 'provide anagrams'
feature. Implementing this will require integrating a third party API that can
provide anagrams of a given word.

Todo When Supported by Wordnik
------------------------------
* Better removal of proper nouns. This is currently implemented by removing any
word that is not entirely lowercase letters. The reason for this is that the
Wordnik API does not properly support removing multiple types of proper nouns.

[wordnik]: https://www.wordnik.com/
[live]: https://anagram-game.herokuapp.com/
