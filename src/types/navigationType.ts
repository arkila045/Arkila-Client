export interface INavigation {
    label: string,
    href: string,
    isActive?: boolean,
    icon?: any,
    subNav?: Array<INavigation>
}