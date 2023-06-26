const { sanitizeQuery } = require('express-validator');

// Função genérica para sanitização de campos
const sanitizeField = (fieldValue) => {
  return sanitizeQuery(fieldValue).trim().escape();
};

// Função genérica para sanitização de objetos
const sanitizeObject = (object) => {
  const sanitizedObject = {};
  for (const [key, value] of Object.entries(object)) {
    sanitizedObject[key] = sanitizeField(value);
  }
  return sanitizedObject;
};

module.exports = {
  sanitizeField,
  sanitizeObject,
};