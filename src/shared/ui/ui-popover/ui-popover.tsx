import { Popover, PopoverTrigger } from "@/shared/shadcn/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Dispatch, ReactNode, SetStateAction } from "react";
import styles from './ui-popover.module.scss';
import { cn } from "@/lib/utils";

export const UiPopover = (
  { children, content, isOpen, setIsOpen }:
    { children?: ReactNode, content: ReactNode, isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }
) => {

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          {children}
        </PopoverTrigger>
        <PopoverContent className={cn(styles.content)}>
          {content}
        </PopoverContent>
      </Popover>
    </>
  );
}