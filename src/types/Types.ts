export type ImageType = {
  uploaded_by: string;
  uploaded_at: string;
  img_url: string;
  id: string;
  slug: string;
  domain: string;
};

export type UserType = {
  user: {
    id: string;
    email: string;
    created_at: string;
    token_number: string;
    embed_title: string;
    embed_site_name: string;
    embed_site_url: string;
    embed_colour: string;
    embed_author_name: string;
    embed_desc: string;
    custom_css: string;
    domains: string[];
  };
  images: ImageType[];
};
