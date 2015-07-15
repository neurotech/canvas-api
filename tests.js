var test = require('tape')

// Example test

test('basic arithmetic', function (t) {
  t.plan(2)
  t.equal(2 + 3, 5)
  t.equal(7 * 8 + 9, 65)
})
