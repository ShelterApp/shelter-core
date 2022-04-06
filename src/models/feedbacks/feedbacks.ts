import { File } from '../files';
import { Service } from '../services';
import { User } from '../users';

enum FeedbackType {
  Service = 'SERVICE',
  App = 'APP',
}

interface FeedbackLocation {
  readonly type?: string;
  readonly coordinates?: readonly [number, number];
}

interface Feedback {
  readonly _id?: string;
  readonly id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly message?: string;
  readonly files?: readonly string[];
  readonly coordinates?: readonly [number, number];
  readonly location?: FeedbackLocation;
  readonly subject?: string;
  readonly type?: FeedbackType;
  readonly service?: string | Service;
  readonly serviceOwner?: string | User;
  readonly user?: string | User;
  readonly isArchive?: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export {
  Feedback,
  FeedbackType,
};
