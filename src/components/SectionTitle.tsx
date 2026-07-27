export interface SectionTitleProps
  extends Readonly<{
    title: string;
    className?: string;
  }> {}

export function SectionTitle({ title, className = "" }: SectionTitleProps) {
  return (
    <div className={`title-bar flex items-center gap-2 px-3 py-1 text-sm font-bold ${className}`}>
      <span className="h-2 w-2 bg-cyanCore shadow-cyanGlow dark:bg-cyanCore" />
      <span className="truncate text-slate-100 dark:text-slate-100">{title}</span>
    </div>
  );
}
