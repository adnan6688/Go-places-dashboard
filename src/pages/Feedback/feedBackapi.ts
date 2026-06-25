import axiosInstance from "../../baseUrl/baseurl"



export type TReview = {
  _id: string;
  comment: string;
  rating: number;

  isFlagged: boolean;

  reviewer: string;
  reviewerName: string;
  reviewerRole: string;

  reviewee: string;
  revieweeName: string;
  revieweeRole: string;

  ride: string;

  createdAt: string;
  updatedAt: string;
};




export const feedBackApiDataLoad = async (page?: number) => {

  const params: { page?: number } = {}
  if (page) {
    params.page = page
  }
  return await axiosInstance.get('/review', { params })
}