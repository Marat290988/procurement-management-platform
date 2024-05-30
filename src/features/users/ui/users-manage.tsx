import { usersStore } from "@/entities/user";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/shared/lib/redux";
import { UiImage } from "@/shared/ui/ui-avatar/ui-image";
import { ICell } from "@/shared/ui/ui-table-grid/table-grid-row/table-grid-row";
import { cellStyleBody, cellStyleHeader } from "@/shared/ui/ui-table-grid/table.contants";
import { UiTableGrid } from "@/shared/ui/ui-table-grid/ui-table-grid";
import clsx from "clsx";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const UsersManage = () => {
  const { t } = useTranslation();
  const _users = useAppSelector(usersStore.selectors.selectAll);
  
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
      const cell: ICell[] = [
        {
          size: '1fr',
          value: u.id,
          styles: cellStyleBody
        },
        {
          size: '1fr',
          value: u.name,
          styles: cellStyleBody
        },
        {
          size: 'auto',
          value: 'minmax(70px, 70px)',
          component: <UiImage isEdit={true} />,
          styles: cellStyleBody
        },
        {
          size: '1fr',
          value: '******',
          styles: cellStyleBody
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