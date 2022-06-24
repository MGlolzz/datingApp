export type CardItemT = {
  age?: string;
  orientation?: string;
  status?: string;
  height?: number;
  hasActions?: boolean;
  hasVariant?: boolean;
  image?:string;
  matches?: string;
  name: string;
  summary?: string;
};

export type IconT = {
  name: any;
  size: number;
  color: string;
  style?: any;
};

export type MessageT = {
  image: any;
  lastMessage: string;
  name: string;
};

export type ProfileItemT = {
  id: number;
  matches?: string,
  //preference
  summary: string;
  image: any;
  firstDate?:string;


  //background
  education?: string,
  ethnicity?: string,
  income?: string,
  job?: string,
  religion?: string,
  speaks?: string,

  //lifestyle
  diet?: string,
  drinks?: string,
  drugs?: string,
  offspring?: string,
  pets?: string,
  smokes?: string,

  //basic information
  name: string;
  age?: string;
  gender?: string;
  status?: string;
  orientation?: string;
  bodyType?: string;
  height?: string;
  sign?:string;
  state?: string;
};

export type TabBarIconT = {
  focused: boolean;
  iconName: any;
  text: string;
};

export type DataT = {
  id: number;
  name: string;
  isOnline: boolean;
  match: string;
  summary: string;
  firstDate?:string;
  message: string;
  image: any;
  age?: string;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  location?: string;
};

export type AccountT = {
  id: number;
  //preference
  summary: string;
  image: any;
  firstDate?:string;


  //background
  education?: string,
  ethnicity?: string,
  income?: string,
  job?: string,
  religion?: string,
  speaks?: string,

  //lifestyle
  diet?: string,
  drinks?: string,
  drugs?: string,
  offspring?: string,
  pets?: string,
  smokes?: string,

  //basic information
  name: string;
  age?: string;
  gender?: string;
  status?: string;
  orientation?: string;
  bodyType?: string;
  height?: string;
  sign?:string;
  state?: string;



};

export type LoginT = {
  email?: string;
  password?: string;
};

export type ChatT = {

  id:number,
  date:string, 
  type:string, 
  message: string,
};
