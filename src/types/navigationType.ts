export interface INavigation {
    label: string,
    href: string,
    isActive?: boolean,
    subNav?: Array<INavigation>
}