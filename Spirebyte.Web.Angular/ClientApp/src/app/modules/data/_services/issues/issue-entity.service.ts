import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import { IssueModel } from '../../_models/issue.model';


@Injectable()
export class IssueEntityService
    extends EntityCollectionServiceBase<IssueModel> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('Issue', serviceElementsFactory);

    }

}