export interface SiteContent {
    metadata: Metadata;
    navbar: Navbar;
    header: Header;
    items: ContentItem[];
}

export interface Metadata {
    title: string;
    description: string;
    themeColors: any;
}

export interface Navbar {
    imageUrl: string;
    imageAlt: string;
    links: Link[];
}

export interface Header {
    title: string;
    subtitle: string;
}

export interface Feature {
    type: string;
    imageUrl: string;
    url: string;
    title: string;
    description: string;
}

export interface ContentItem {
    id: string;
    title: string;
    url: string;
    type: string;
    cloudCategories: string[];
    services: string[];
    technologies: string[];
    description: string;
    relatedContentItems?: string[];
    feature?: Feature;
}

export interface Link {
    title: string;
    url: string;
}

export interface CheckboxItem {
    id: number;
    category: string;
    checked: boolean;
}

export type ContentItemType = 'Code Sample' | 'Documentation' | 'Video';