import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import { loginSchema } from '../schemas/auth.schema';
import { prisma } from '@/prisma';
import { ApiResponse } from '@/shared/types';
import * as bcrypt from 'bcryptjs';
import { useAppSession } from '@/shared/utils/session';
import { redirect } from '@tanstack/react-router';
import { UserEntity } from './models/UserEntity';

type DBUser = Prisma.userGetPayload<{
  include: {
    User_Groups: {
      include: {
        RoleGroup: true;
      };
    };
    user_applications: {
      include: {
        Applications: true;
      };
    };
  };
}>;

const userInclude = {
  User_Groups: {
    include: {
      RoleGroup: true,
    },
  },
  user_applications: {
    include: {
      Applications: true,
    },
  },
};

export const login = createServerFn({ method: 'POST' })
  .validator(zodValidator(loginSchema))
  .handler(async ({ data }): Promise<ApiResponse<UserEntity | null>> => {
    const { email, password } = data;
    const dbUser = await prisma.user.findFirst({
      where: { email },
      include: userInclude,
    });

    if (!dbUser) {
      return {
        status: 'unauthorized',
        data: null,
        context: {
          message: 'Invalid credentials',
        },
      };
    }

    if (!dbUser.isActive) {
      return {
        status: 'unauthorized',
        data: null,
        context: {
          message: 'User is not active',
        },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, dbUser.password ?? '');

    if (!isPasswordValid) {
      return {
        status: 'unauthorized',
        data: null,
        context: {
          message: 'Invalid credentials',
        },
      };
    }

    const user = normalizeUser(dbUser);

    const session = await useAppSession();

    await session.update({
      userId: user.userId,
    });

    return {
      status: 'success',
      data: user,
    };
  });

export const logout = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession();

  await session.clear();

  throw redirect({ to: '/sign-in' });
});

export const getUser = createServerFn({ method: 'GET' }).handler(
  async (): Promise<ApiResponse<UserEntity | null>> => {
    try {
      const session = await useAppSession();
      if (!session.data.userId) {
        return {
          status: 'unauthorized',
          data: null,
          context: {
            message: 'User not found',
          },
        };
      }

      const user = await prisma.user.findFirst({
        where: {
          userId: session.data.userId,
        },
        include: userInclude,
      });

      if (!user) {
        return {
          status: 'unauthorized',
          data: null,
          context: {
            message: 'User not found',
          },
        };
      }

      return {
        status: 'success',
        data: normalizeUser(user),
      };
    } catch (error) {
      console.error(['getUser'], error);
      return {
        status: 'error',
        data: null,
        context: {
          message: 'Failed to get user',
        },
      };
    }
  }
);

function normalizeUser(user: DBUser): UserEntity {
  return {
    userId: user.userId,
    email: user.email,
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    isActive: user.isActive,
    createdAt: user.createdAt ? new Date(user.createdAt) : null,
    groups: user.User_Groups.map((g) => ({ groupId: g.RoleGroup.id, groupName: g.RoleGroup.name })),
    applications: user.user_applications.map((a) => ({
      id: a.Applications.id,
      name: a.Applications.name,
    })),
  };
}
