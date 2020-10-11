import { AddressModel } from '../../auth/_models/address.model';
import { SocialNetworksModel } from '../../auth/_models/social-networks.model';


export class UpdateModel {
  id: string;
  fullname: string;
  pic: string;
  file: string;
  companyName: string;
  phone: string;
  address?: AddressModel;
  socialNetworks?: SocialNetworksModel;

  setUpdateModel(user: any) {
    this.id = user.id;
    this.fullname = user.fullname || '';
    this.pic = user.pic;
    this.file = user.file;
    this.companyName = user.companyName || '';
    this.phone = user.phone || '';
    this.address = user.address;
    this.socialNetworks = user.socialNetworks;
  }
}
