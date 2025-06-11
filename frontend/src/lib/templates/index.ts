import TemplateBasic from './TemplateBasic.svelte';
import TemplateMemora from './TemplateMemora.svelte';

export const templates = [
    {
        id: 'basic',
        name: 'Basic Template',
        description: 'A simple and clean template for obituaries'
    },
    {
        id: 'memora',
        name: 'Memora',
        description: 'A beautiful and modern template with a photo section'
    }
] as const;

export const templateComponents = {
    'templateBasic': TemplateBasic,
    'templateMemora': TemplateMemora
} as const;

export type TemplateId = keyof typeof templateComponents;
export type TemplateInfo = typeof templates[0];
