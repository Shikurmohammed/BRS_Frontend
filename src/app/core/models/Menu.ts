export interface MenuItem {
    icon?: string;
    label?: string;
    routeLink?: string;
    queryParam?:any;
    subMenuItem?:MenuItem
  }