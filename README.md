## Installation

```shell script
$ npm install use-update
```
or
```shell script
$ yarn add use-update
```

## How to use

You use useUpdate almost the same way as useEffect. 
When it is given the list of dependencies useUpdate is invoked when any dependence from the list change occurs.
When it is given an empty array as a dependencies or no dependencies argument(undefined) it will work like componentDidMount and is invoked immediately after updating of state or props occurs.

### Sync example

Parent Component
```ecmascript 6
import { useState } from 'react';
import InputContent from './InputContent.js';

const App = () => {
  const [name, setName] = useState('');
  return (
    <div>
      <input
        name="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br/>
      <InputContent
        contentName="name"
        contentValue={name}
      />
    </div>
  );
};

export default App;
```

Child component
```ecmascript 6
import { useState, useEffect } from 'react'
import { useUpdate } from './useUpdate';

const InputContent = ({ contentName = 'input', contentValue }) => {
  const [text, setText] = useState(`No ${contentName} provided yet`);

  useUpdate(() => {
    console.log("Will be called only if contentValue prop change");
    setText(`${contentName} is ${contentValue}`);
  }, [contentValue]);

  return (
    <>
      {/*The initial text will be "No name provided yet"
      and after the input value will be changed by user the text will be updated to input value */}

      <div>{text}</div></>
  );
};

export default InputContent;
```

### Async example

Parent Component
```ecmascript 6
import { useState } from 'react';
import Genres from './Test';

function App() {
  const [genres, setGenres] = useState('');

  return (
    <div className="App">
      <Genres
        genres={genres}
        setGenres={setGenres}
      />
    </div>
  );
}

export default App;
```

Child component
```ecmascript 6
import { useState, useEffect } from 'react';
import {useUpdate} from 'use-update';

const Genre = ({genres, setGenres}) => {
  const [genresList, setGenresList] = useState(null);

  useEffect(() => {
    setGenres(['genre 0']);

    const fetchGenres = () => {
      setTimeout(() => {
        setGenres(['genre 1', 'genre 2']);
        console.log('genres fetched');
      }, 3000);
    }

    fetchGenres();
  }, []);

  useUpdate(() => {
    const mappedGenres = genres.map((genre) => {
      return <li key={genre}>{genre}</li>
    });

    setGenresList(mappedGenres);
  }, [genres]);

  return (
    <div>
      {/*Firstly you will see the list with one item: "genre 0"
      and in 3 seconds it will change to list with 2 items: "genre1" and "genre 2" */}
      <ul>
        {genresList}
      </ul>
    </div>
  )
}

export default Genre;
```

