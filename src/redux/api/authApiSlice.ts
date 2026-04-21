import { baseApi } from "../rtk.config";

// 1. Response Interfaces
interface UserData {
    _id: string;
    name: string;
    email: string;
    age?: number;
    phoneNumber?: string;
    currentStep: number;
    isProfileComplete: boolean;
    // Baaki fields add karein...
}

interface UserResponse {
    success: boolean;
    message: string;
    data: UserData;
    token?: string;
}

// 2. Request Interfaces
interface SignupRequest {
    name: string;
    email: string;
    password?: string;
    age: number;
    phoneNumber: string;
}

interface UpdateStepRequest {
    step: number;
    data: any;
}
interface UploadResponse {
    success: boolean;
    message: string;
    paths: string[]; // Backend se aane wale images ke path
}
interface LoginRequest {
    email: string;
    password: string;
}
interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        isProfileComplete: boolean;
        currentStep: number;
        user: {
            id: string;
            name: string;
            email: string;
        }
    };
}
// 3. API Injection with Correct Typing
export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Mutation<ReturnType, ArgType>
        signup: builder.mutation<UserResponse, SignupRequest>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),
        manageProfile: builder.mutation<UserResponse, UpdateStepRequest>({
            query: ({ step, data }) => ({
                url: '/auth/manage-profile',
                method: 'PUT',
                body: { step, data },
            }),
            invalidatesTags: ['User'],
        }),
        getCurrentStep: builder.query({
            query: () => "/auth/currect-step",
        }),

        getProfile: builder.query<UserResponse, void>({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),
        getCityCategoryService: builder.query({
            query: () => ({
                url: "/auth/getCityCategoryService",
                method: "GET"
            }),
            providesTags: ['locationData'],

        }),
        uploadPhotos: builder.mutation<UploadResponse, FormData>({
            query: (formData) => ({
                url: '/file/upload', // Base URL ke baad ka path
                method: 'POST',
                body: formData,

            }),
            invalidatesTags: ['User'], // Taaki profile photos update ho jayein
        }),
    }),
    overrideExisting: false,
});

// Hooks export
export const {
    useLoginMutation,
    useUploadPhotosMutation,
    useGetCurrentStepQuery,
    useGetCityCategoryServiceQuery,
    useSignupMutation,
    useManageProfileMutation,
    useGetProfileQuery
} = userApi;