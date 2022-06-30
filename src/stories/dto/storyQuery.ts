import { SortBy } from './sortBy.enum';

export class StoryQuery {
  offset?: number;
  limit?: number;
  keyword?: string;
  sortBy?: SortBy;
  categories?: string;
  status?: string;
  worldViews?: string;
  personalities?: string;
  sex?: string;
  style?: string;
  author?: string;
  converter?: string;
}
