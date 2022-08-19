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
}

export interface CheckboxItem {
    id: number;
    category: string;
    checked: boolean;
}

export type ContentItemType = 'Code Sample' | 'Documentation' | 'Video';