import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import { PermissionSchemeModel } from '../../_models/permission-scheme.model';


@Injectable()
export class PermissionSchemeEntityService
    extends EntityCollectionServiceBase<PermissionSchemeModel> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('PermissionScheme', serviceElementsFactory);

    }

}