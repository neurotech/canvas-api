const test = require('tape');
const course = require('../lib/course');

let source = process.env.CANVAS_API_TEST_MIGRATION_SRC_ID;
let destination = process.env.CANVAS_API_TEST_MIGRATION_DEST_ID;

test('Course - Migration', (t) => {
  t.plan(1);
  course.migrate(source, destination, (error, results) => {
    if (error) {
      t.fail(error.statusCode);
    } else {
      t.ok(typeof results.body.id, 'number');
    }
  });
});
