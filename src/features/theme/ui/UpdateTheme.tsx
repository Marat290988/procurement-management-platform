import { useAppSelector } from '@/shared/lib/redux';
import { useThemeActions } from '../model/use-theme.actions';
import { UiSelect, UiSelectType } from './../../../shared/ui/ui-select/ui-select';
import { themeStore } from '../model';

export function UpdateTheme() {

  const options: UiSelectType['options'] = [
    {title: 'Light', value: 'light'},
    {title: 'Dark', value: 'dark'}
  ]

  const { setTheme } = useThemeActions();
  const _theme = useAppSelector(themeStore.selectors.selectTheme);
 
  const onChangeTheme = (theme: 'light' | 'dark') => {
    setTheme(theme);
  }

  return (
    <div>
      <UiSelect
        selectWidthClass='w-[90px]'
        options={options}
        value={_theme}
        onValueChange={onChangeTheme}
      />
    </div>
  );
}