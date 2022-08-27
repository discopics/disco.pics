export type ImageType = {
  uploaded_by: string;
  uploaded_at: string;
  img_url: string;
  id: string;
  slug: string;
};

export type UserType = {
  user: {
    id: string;
    email: string;
    created_at: string;
    token_number: string;
  };
  images: ImageType[];
};
