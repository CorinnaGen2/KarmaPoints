import { DeedCategory } from './types';

export const categories: DeedCategory[] = [
  'Environment',
  'Education',
  'Health',
  'Fight Poverty',
  'Animals',
  'Community',
];
export const suggestionsByCategory: Record<DeedCategory, string[]> = {
  Environment: ['Planted trees in a local park', 'Picked up litter on a walk', 'Used a reusable bottle'],
  Education: ['Tutored a student after school', 'Donated books to a school library', 'Shared a useful resource'],
  Health: ['Checked in on a neighbor', 'Supported a wellness event', 'Shared healthy habits'],
  'Fight Poverty': ['Donated food to a local pantry', 'Helped with a food drive', 'Supported a community fund'],
  Animals: ['Volunteered at an animal rescue', 'Helped foster a pet for a weekend', 'Fed stray animals'],
  Community: ['Joined a neighborhood cleanup', 'Helped at a local event', 'Supported a friend in need'],
};