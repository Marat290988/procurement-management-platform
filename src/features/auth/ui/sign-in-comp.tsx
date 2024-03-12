import { UiInputField } from "@/shared/ui/ui-input-filed/ui-input-field";
import { useForm } from "react-hook-form";
import { useHandleError } from "../model/use-handle-error";
import { UiButton } from "@/shared/ui/ui-button/ui-button";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";
import { usersStore } from "@/entities/user";
import { useState } from "react";
import { comparePassword } from "@/lib/utils";
import { sessionStore } from "@/entities/session";
import { useTranslation } from "react-i18next";

export function SignInComp() {

  const { t } = useTranslation();

  const { register, handleSubmit, formState } = useForm<{
    username: string,
    password: string
  }>({
    defaultValues: {
      username: '',
      password: ''
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [submitError, setSubmitError] = 
    useState<null | {subNameError: null | string, subPasswordError: null | string}>(null);

  const { usernameError, passwordError } = useHandleError(formState);
  const _users = useAppSelector(usersStore.selectors.selectAll);

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(data => {
    const username = data.username;
    const password = data.password;
    const loginUser = _users.find(u => u.name === username);
    if (!loginUser) {
      setSubmitError((prevCount: any) => ({...prevCount, subNameError: 'Incorrect username'}));
      return;
    }
    if (!comparePassword(loginUser.password, password)) {
      setSubmitError((prevCount: any) => ({...prevCount, subPasswordError: 'Incorrect password'}));
      return;
    }
    dispatch(sessionStore.actions.createSession({name: loginUser.name, userId: loginUser.id, avatarBlob: loginUser.avatarBlob}));
  });

  const onInput = () => {
    if (submitError) {
      setSubmitError(null);
    }
  }

  return (
    <div className="flex flex-col grow items-center justify-center">
      <div 
        className="@apply bg-[var(--border-color)] text-[var(--base-background-color)] px-[10px] py-[5px] text-[14px] rounded-[15px] mb-[-16px] z-10"
      >
        {t('please_login')}
      </div>
      <form onSubmit={onSubmit} onInput={onInput} className="px-[45px] py-[30px] border-solid border-[2px] rounded-[5px] @apply border-[var(--border-color)]">
        <UiInputField
          inputProps={{
            type: 'text',
            ...register('username', { minLength: 5 })
          }}
          label={t('username')}
          formState={formState}
          errorMessage={submitError && submitError.subNameError ? submitError.subNameError : usernameError}
        />
        <UiInputField
          inputProps={{
            type: 'password',
            ...register('password', { minLength: 5 })
          }}
          label={t('password')}
          formState={formState}
          errorMessage={submitError && submitError.subPasswordError ? submitError.subPasswordError : passwordError}
        />
        <div className="w-full text-center mt-2">
          <UiButton variant="primary" className="mx-auto">{t('login')}</UiButton>
        </div>
      </form>
      <div 
        className="@apply bg-[var(--border-color)] text-[var(--base-background-color)] px-[10px] py-[5px] text-[14px] rounded-[15px] mt-[-16px] z-10"
      >
        {t('default')}
      </div>
    </div>
  );
}