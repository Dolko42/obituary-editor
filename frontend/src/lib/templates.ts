export const templateComponents: Record<string, () => Promise<any>> = {
	templateMemora: () => import('$lib/templates/TemplateMemora.svelte'),
	templateBasic: () => import('$lib/templates/TemplateBasic.svelte'),
	// keys should match component_id in PocketBase
};
