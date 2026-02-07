export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

export type Profile = {
  name: string;
  role: string;
  summary?: string;
  photo?: SanityImage;
};
