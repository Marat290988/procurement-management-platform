import { UiSelect, UiSelectType } from './../../../shared/ui/ui-select/ui-select';
import { useState } from 'react';

export function UpdateTheme() {

  const options: UiSelectType['options'] = [
    {title: 'Light', value: 'light'},
    {title: 'Dark', value: 'dark'}
  ]

  const [themeValue, setThemeValue] = useState(options[0].value);


  const onChangeTheme = (theme: string) => {
    setThemeValue(theme);
  }

  return (
    <div>
      <UiSelect
        selectWidthClass='w-[90px]'
        options={options}
        value={themeValue}
        onValueChange={onChangeTheme}
      />
    </div>
  );
}