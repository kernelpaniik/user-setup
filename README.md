# Setup
1. `npm install`
2. `npm start`

# Resolved
`module.exports.data` and the global `data` in top-level initially have the same array reference.
While `init()` executes, it updates the reference of the top-level `data` to point to the newly created array. However, it does not update the reference in `module.exports.data`. Therefore, `module.exports.data`, still points to the original array.

The solution is to explicitly update `module.exports.data` in `init()`. Although, I'm not sure if this is good practice.