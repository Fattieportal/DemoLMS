import api from "~/lib/api";
import type { WPUser } from "~/models/user.model";

export const userService = {
  getMe: async (): Promise<WPUser> => {
    const res = await api.get<WPUser>("/wp/v2/users/me");
    return res.data;
  },
};