import { UiSelect } from "@/shared/ui/ui-select/ui-select"
import { useEffect, useState } from "react"
import { LanguageState } from "../model/types";
import { useTranslation } from "react-i18next";
import { langRepository } from "../model/language.repository";

export const UpdateLang = () => {

  useEffect(() => {
    langRepository.loadLang().then(data => {
      setLang(data.lang);
      i18n.changeLanguage(data.lang);
    });
  })

  const [lang, setLang] = useState<LanguageState['lang']>('en');
  const { i18n } = useTranslation();

  const options = [
    {title: 'EN', value: 'en'},
    {title: 'RU', value: 'ru'}
  ]

  const onChangeLang = (lang: LanguageState['lang']) => {
    setLang(lang);
    langRepository.saveLang(lang);
    i18n.changeLanguage(lang);
  }

  return (
    <div>
      <UiSelect
        selectWidthClass='w-[60px]'
        options={options}
        value={lang}
        onValueChange={onChangeLang}
      />
    </div>
  );

}