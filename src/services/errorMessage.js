export default function getErrorMessage(err) {
  switch (err) {
    case "User already exists":
      return "Аккаунт с таким email уже существует";
    case "Email, password and name are required fields":
      return "Необходимо заполнить все поля";
    case "email or password are incorrect":
      return "Проверьте email или пароль";
    default:
      return "Что-то пошло не так. Повторите запрос"
  }
};
