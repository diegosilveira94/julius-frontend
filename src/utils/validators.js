export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email?.trim()) errors.email = "Informe o e-mail.";
  else if (!isValidEmail(email)) errors.email = "E-mail inválido.";
  if (!password) errors.password = "Informe a senha.";
  return errors;
}

export function validateRegister({ name, email, password }) {
  const errors = {};
  if (!name?.trim()) errors.name = "Informe o nome.";
  if (!email?.trim()) errors.email = "Informe o e-mail.";
  else if (!isValidEmail(email)) errors.email = "E-mail inválido.";
  if (!password) errors.password = "Informe a senha.";
  else if (password.length < 6)
    errors.password = "A senha deve ter ao menos 6 caracteres.";
  return errors;
}

export function validateCategory({ name }) {
  const errors = {};
  if (!name?.trim()) errors.name = "Informe o nome da categoria.";
  return errors;
}

export function validateExpense({ description, amount, date, categoryId }) {
  const errors = {};
  if (!description?.trim()) errors.description = "Informe a descrição.";
  if (amount === "" || amount === null || amount === undefined)
    errors.amount = "Informe o valor.";
  else if (Number(amount) <= 0) errors.amount = "O valor deve ser maior que zero.";
  if (!date) errors.date = "Informe a data.";
  if (!categoryId) errors.categoryId = "Selecione uma categoria.";
  return errors;
}
