export type TNavigationItem = {
  id: string;
  name: string;
  url: string;
  favorite?: boolean;
};

export interface INavigation {
  items: TNavigationItem[];
  noLocation?: boolean;
}
