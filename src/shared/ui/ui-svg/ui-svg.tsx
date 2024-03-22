import { ICONS } from "./svgs";

export const UiSvg = (
  { svgName, className = '' }: {svgName: (keyof (typeof ICONS)), className?: string}
) => {

  return(
    <div
      style={{backgroundColor: 'inherit'}}
      className={className}
      dangerouslySetInnerHTML={{ __html: ICONS[svgName] }}
    >
    </div>
  );
}