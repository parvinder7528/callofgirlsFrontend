import { CategoryResponse, MasterDataResponse, ProfileQueryParams, ProfilesResponse } from "@/types/providerType";
import { baseApi } from "../rtk.config";

export const providerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProfiles: builder.query<ProfilesResponse, ProfileQueryParams | void>({
      query: (params) => {
        return {
          url: '/provider/get-allprofiles',
          method: 'GET',
          params: {
            city: params?.city,
            category: params?.categoryId,
            all: params?.all,
          },
        };
      },
      providesTags: ['User'],
    }),
    getProfileById:builder.query<ProfilesResponse, | void>({
      query:(id)=>({
        url:`/provider/get-profileById/${id}`
      }),
      providesTags: ['User'],
    }),

    // 2. Get All Categories
    getAllCategories: builder.query<CategoryResponse, void>({
      query: () => '/provider/get-allcategory',
      providesTags: ['User'],
    }),
    getAllCityCategoryService:builder.query<MasterDataResponse,void>({
      query:()=>"/provider/get-city-category-service",
      providesTags: ['locationData'],
    })
  }),
});

export const {
  useGetProfileByIdQuery, 
  useGetAllProfilesQuery,
   useGetAllCategoriesQuery,
   useGetAllCityCategoryServiceQuery } = providerApi;