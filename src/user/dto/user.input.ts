import { BaseModelInput } from  '../../base.input'

export interface UserInput extends BaseModelInput {
  
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  active?: number;
  isPhoneVerified?: number;
  isEmailVerified?: number;
  credits?: string;
  city?: string;
  isVerified?: boolean;
  details?: any;
//   role?: Role;
//   mediaItem?: MediaItem;
//   assets?: MediaItem[];

}
