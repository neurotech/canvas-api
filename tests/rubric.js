const test = require('tape');
const rubric = require('../lib/rubric');

let course = process.env.CANVAS_API_TEST_COURSE_ID;
let assignment = process.env.CANVAS_API_TEST_ASSIGNMENT_ID;
let params = {
  data: {
    per_page: 100
  }
};

test('Rubric - List', (t) => {
  t.plan(1);
  rubric.list(course, params, (error, results) => {
    if (error) {
      t.fail(error);
    } else {
      console.log(`${results.length} Rubrics returned.`);
      t.ok(typeof results[0].id, 'number');
    }
  });
});

test('Rubric - Detail', (t) => {
  t.plan(1);
  rubric.detail(course, assignment, params, (error, results) => {
    if (error) {
      t.fail(error);
    } else {
      t.ok(typeof results.rubric_settings.id, 'number');
    }
  });
});
