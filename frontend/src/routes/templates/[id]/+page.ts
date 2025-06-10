import type { PageLoad } from './$types';
import { pb } from '$lib/pb';

export const load: PageLoad = async ({ params }) => {
  try {
    const templateRecord = await pb.collection('templates').getOne(params.id);
    return {
      template: {
        id: templateRecord.id,
        name: templateRecord.name,
        component_id: templateRecord.component_id,
        description: templateRecord.description,
        preview_url: templateRecord.preview_url
      }
    };
  } catch (error) {
    return {
      status: 404,
      error: new Error('Template not found')
    };
  }
};