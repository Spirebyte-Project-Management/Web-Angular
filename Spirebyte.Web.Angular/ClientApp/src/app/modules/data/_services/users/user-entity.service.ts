import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import { UserModel } from 'src/app/_models/user.model';

@Injectable()
export class UserEntityService
    extends EntityCollectionServiceBase<UserModel> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('User', serviceElementsFactory);

    }

}