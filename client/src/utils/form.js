export function getFormValuesAsObject(form, schema = {}) {
  const formData = new FormData(form);
  const formEntries = Array.from(formData.entries());
  return formEntries.reduce((acc, [key, val]) => {
    if (schema[key] === 'number') {
      acc[key] = Number.parseFloat(val);
    } else {
      acc[key] = val;
    }
    return acc;
  }, {});
}
