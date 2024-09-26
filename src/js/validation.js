class FormValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "FormValidationError";
    this.field = field;
  }
}

function validateForm(formData) {
  const errors = [];
  const username = formData.get("username");

  if (!username) {
    errors.push(
      new FormValidationError("username", "사용자 이름을 입력하세요.")
    );
  }

  if (errors.length > 0) {
    throw errors;
  }
}

export { validateForm, FormValidationError };
