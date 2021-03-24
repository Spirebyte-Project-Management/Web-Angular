import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import { IssueHistoryModel } from '../../../_models/issue-history.model';


@Injectable()
export class IssueHistoryEntityService
    extends EntityCollectionServiceBase<IssueHistoryModel> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('IssueHistory', serviceElementsFactory);

    }

}