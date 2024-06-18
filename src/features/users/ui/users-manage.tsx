import { sessionStore } from "@/entities/session";
import { CreateSessionData } from "@/entities/session/model/session.store";
import { usersStore } from "@/entities/user";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";
import { UiImage } from "@/shared/ui/ui-avatar/ui-image";
import { UiGridInput } from "@/shared/ui/ui-grid-input/ui-grid-input";
import { UiGridPassword } from "@/shared/ui/ui-grid-password/ui-grid-password";
import { ICell } from "@/shared/ui/ui-table-grid/table-grid-row/table-grid-row";
import { cellStyleBody, cellStyleHeader } from "@/shared/ui/ui-table-grid/table.contants";
import { UiTableGrid } from "@/shared/ui/ui-table-grid/ui-table-grid";
import clsx from "clsx";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const UsersManage = () => {
  const { t } = useTranslation();
  const _users = useAppSelector(usersStore.selectors.selectAll);
  const sessionUser = useAppSelector(sessionStore.selectors.selectSession);
  const dispatch = useAppDispatch();

  const editUserAvatar = (value: string, field: string, id: string) => {
    dispatch(usersStore.actions.editUser({value, field, id}));
    if (sessionUser?.userId === id) {
      dispatch(sessionStore.actions.updateAvatar({field: field as keyof CreateSessionData, value}));
    }
  }
  
  const header: ICell[] = [
    {
      value: t('manage_id'),
      size: '1fr',
      styles: {...cellStyleHeader, borderTopLeftRadius: '5px'}
    },
    {
      value: t('manage_name'),
      size: '1fr',
      styles: cellStyleHeader
    },
    {
      value: t('manage_avatar'),
      size: 'minmax(70px, 70px)',
      styles: cellStyleHeader
    },
    {
      value: t('manage_password'),
      size: '1fr',
      styles: {...cellStyleHeader, borderTopRightRadius: '5px'}
    },
  ]

  const body = useMemo(() => {
    const _body: ICell[][] = [];
    _users.forEach((u, index) => {
      const editName = (value: string) => {
        dispatch(usersStore.actions.editUser({value, field: 'name', id: u.id}));
      }
      const changePassword = (value: string) => {
        dispatch(usersStore.actions.editPassword({value, id: u.id}));
      }
      const cell: ICell[] = [
        {
          size: '1fr',
          value: u.id,
          styles: cellStyleBody
        },
        {
          size: '1fr',
          value: u.name,
          styles: cellStyleBody,
          component: <UiGridInput value={u.name} isEdit={true} saveValue={editName} />
        },
        {
          size: 'auto',
          value: 'minmax(70px, 70px)',
          component: <UiImage isEdit={true} editFunc={editUserAvatar} field="avatar" id={u.id} base64={u.avatar} />,
          styles: cellStyleBody
        },
        {
          size: '1fr',
          value: '******',
          styles: cellStyleBody,
          component: <UiGridPassword savePassword={changePassword} />
        }
      ]
      if (index === _users.length - 1) {
        cell[0].styles = {...cell[0].styles, borderBottomLeftRadius: '5px'};
        cell[cell.length - 1].styles = {...cell[cell.length - 1].styles, borderBottomRightRadius: '5px'}
      }
      _body.push(cell);
    });
    return _body;
  }, [_users])

  return (
    <div className="user-manage-content overflow-auto h-full">
      <h3 className={clsx('text-center font-bold text-[var(--primary)]')}>{t('user_manage')}</h3>
      <div className={cn('min-w-[650px]')}>
        <UiTableGrid header={header} body={body} />
      </div>
    </div>
  )
}