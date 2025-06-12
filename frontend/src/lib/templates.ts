export const templateComponents = {
	templateMemora: './templates/TemplateMemora.svelte',
	templateBasic: './templates/TemplateBasic.svelte'
} as const;

/**
 * Get the component path for a template ID
 * @param templateId The ID of the template
 * @returns The component path
 */
export const getTemplatePath = (templateId: string) => {
	return templateComponents[templateId as keyof typeof templateComponents];
}
