export interface NavItemData {
    label: string;
    href?: string;
    items?: DropdownItemData[];
}

export interface DropdownItemData {
    label: string;
    href: string;
}