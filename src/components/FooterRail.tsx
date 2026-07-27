export interface FooterRailProps extends Readonly<Record<string, never>> {}

export function FooterRail(_props: FooterRailProps) {
  return (
    <footer className="mt-4 flex justify-center">
      <div className="h-1 w-1/3 bg-gradient-to-r from-transparent via-cyanCore to-transparent opacity-60 dark:via-cyanCore" />
    </footer>
  );
}
