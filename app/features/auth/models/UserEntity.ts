export type TUserGroup = {
  groupId: number;
  groupName: string;
};

export type TApplication = {
  id: number;
  name: string;
};

export type UserEntity = {
  userId: string;
  wpUserId?: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdAt: Date | string | null;
  groups: TUserGroup[];
  applications: {
    id: number;
    name: string;
  }[];
};
