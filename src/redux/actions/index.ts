import { CommentActions } from './comment.actions';
import { UiActions } from './ui.actions';
import { UserActions } from './user.actions';

type Action = UserActions | CommentActions | UiActions;

export default Action;
