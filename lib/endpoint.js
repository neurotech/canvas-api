const config = require('../config');

let _baseUrl = () => {
  return `https://${config.domain}/api/${config.apiVersion}`;
};

module.exports = {
  base: () => {
    return _baseUrl();
  },
  sis: {
    imports: () => {
      return `${_baseUrl()}/accounts/self/sis_imports/`;
    },
    upload: () => {
      return `/api/${config.apiVersion}/accounts/self/sis_imports.json?import_type=instructure_csv`;
    }
  },
  course: {
    migrate: (destination) => {
      return `${_baseUrl()}/courses/${destination}/content_migrations`;
    }
  },
  assignment: {
    create: (course) => {
      return `${_baseUrl()}/courses/${course}/assignments`;
    },
    modify: (course, assignment) => {
      return `${_baseUrl()}/courses/${course}/assignments/${assignment}`;
    }
  }
};
