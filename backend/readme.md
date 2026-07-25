## Get Game State

- import fs, import path.
- create a GS_FILENAME using path.
- create a `saveGameState()`
  fs.writeFileSync(filename, JSON.stringify(gs, null, 2), 'utf-8');
- update readGameState function with the following:  
  if file doesn't exist (check using `fs.existSync(filename)`)  
  => create a file using function saveGameState().

* then (if file exist) read a file => create a variable `data = fs.readFileSync(filename, 'utf-8')`
* then parse it `GSparsed = Json.parse(data)`
* then return it `return GSparsed`

**check**

```curl
curl -X POST http://localhost:3000/api/wheel/reset
```

## Reset

- create a new state `{...initialState}`
- `saveGameState(new state)`
- return new state

## Spin

1. get current state
2. spin (choose from wheel sectors based on probability) and save result
3. update game state with a new spin result
4. save updated game state
5. return updated game state
   check if works

```
curl -X POST http://localhost:3000/api/wheel/spin  -H "Content-Type: application/json"
```
