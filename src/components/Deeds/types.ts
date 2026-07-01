export type DeedCategory =
  | 'Environment'
  | 'Education'
  | 'Health'
  | 'Fight Poverty'
  | 'Animals'
  | 'Community';

  export interface AddDeedsProps {
  visible?: boolean;
  onClose?: () => void;
  onSubmit?: (payload: { category: DeedCategory; description: string }) => void;
}