# Set Up
1. `npm install`
2. create `.env`
3. create `MONGODB_URI` environment variable for connection string

# Background
This is a simple example of a bug that I am unable fix in my express application. I've extracted the main functionality that is resulting in this 'bug'. The actual source of the bug is a helper module for building the user database when running tests (e.g., creating tokens, hashes, saving, deleting, etc).

The `helper.js ` module exposes a set of functions that progressively build `userData`.
The process of building the user data is as follows:

1. Generate a  `passwordHash` for each user as a new array. The new array overrides the previous state of `userData`. Each object at this point has the following structure:
    ``` javascript 
    {
        name: ...,
        username: ...,
        passwordHash: ...
    }
    ```

2. Save `userData` to the MongoDB collection, and `await` the result. The results have the following structure and override the previous state of `userData`.
    ``` javascript 
    {
        name: ...,
        username: ...,
        passwordHash: ...,
        _id: ...,
        __v: ...
    }
    ```
    
`index.js` contains a main function that starts the process by invoking `await initDb()`.

# Problem
If I output the `userData` after invoking `await helper.initDb()`, it outputs the original definition of `userData` as if it was never modified (not what I want...). However, if I output `userData` as the last line of `initDb()`, it outputs the correct data.

It seems as if the final update to `userData` in `initDb()` does not get reflected by the time control returns to `main()`. I believe this issue may be related to the event loop and the queueing of micro & macro tasks.

I would like to have the correct data displayed when control is returned to `main()`. Where could I possibly be messing up? All help is greatly appreciated!!