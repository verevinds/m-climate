export type TNavigationItem = { name: string; url: string; favorite?: boolean };

export interface INavigation {
    items: TNavigationItem[];
    noLocation?: boolean;
}
