import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import { CommentModel } from '../../../_models/comment.model';


@Injectable()
export class CommentEntityService
    extends EntityCollectionServiceBase<CommentModel> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('Comment', serviceElementsFactory);

    }

}