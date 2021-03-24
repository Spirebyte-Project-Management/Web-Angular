import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import { IssueCommentModel } from '../../../_models/issue-comment.model';


@Injectable()
export class IssueCommentEntityService
    extends EntityCollectionServiceBase<IssueCommentModel> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('IssueComment', serviceElementsFactory);

    }

}