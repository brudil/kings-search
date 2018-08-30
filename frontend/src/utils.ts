import { Result, SearchResultForm } from './types';

export function getForm(result: Result) {
  if (result.link.startsWith('/organisation')) {
    return SearchResultForm.StudentGroup;
  }

  if (result.link.startsWith('/news')) {
    return SearchResultForm.News;
  }
  if (result.link.startsWith('/events')) {
    return SearchResultForm.Event;
  }

  return SearchResultForm.Page;
}

export const formLangs = (form: SearchResultForm): string => {
  switch (form) {
    case SearchResultForm.News:
      return 'News';
    case SearchResultForm.Event:
      return 'Event';
    case SearchResultForm.StudentGroup:
      return 'Student Group';
    case SearchResultForm.Page:
      return 'Page';
  }
};
