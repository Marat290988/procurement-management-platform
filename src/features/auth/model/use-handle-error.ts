import { FormState } from "react-hook-form";

export function useHandleError(formState: FormState<{ username: string, password: string }>) {
  let usernameError = null;
  let passwordError = null;

  if (formState.errors.username) {
    usernameError = 'Min character count is 5';
  }

  if (formState.errors.password) {
    passwordError = 'Min character count is 5';
  }

  return {
    usernameError, passwordError
  }
}