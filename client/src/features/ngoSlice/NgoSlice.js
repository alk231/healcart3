import { apiSlice } from "../api/apiSlice";

export const ngoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerNgo: builder.mutation({
      query: (body) => ({
        url: "/ngo/register",
        method: "POST",
        body,
      }),
    }),

    validateNgoVerificationId: builder.mutation({
      query: (verificationId) => ({
        url: "/ngo/verify",
        method: "POST",
        body: { verificationId },
      }),
    }),
  }),
});

export const { useRegisterNgoMutation, useValidateNgoVerificationIdMutation } =
  ngoApi;
