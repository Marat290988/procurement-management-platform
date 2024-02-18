import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/components/ui/select";
import clsx from "clsx";
import classes from './ui-select.module.scss';

export type UiSelectType = {
  selectWidthClass: string,
  options: {value: string, title: string}[],
  value: string,
  onValueChange: (change: string) => void
}

export function UiSelect({
  selectWidthClass,
  options,
  value,
  onValueChange
}: UiSelectType) {

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={clsx(selectWidthClass, classes['select-main'])}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className={clsx(classes['select-content'])}>
        <SelectGroup className={clsx(classes['select-group'])}>
          {options.map(o => 
            <SelectItem 
              key={o.value} 
              value={o.value} 
              className={clsx(classes['select-item'])}
            >
              {o.title}
            </SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
