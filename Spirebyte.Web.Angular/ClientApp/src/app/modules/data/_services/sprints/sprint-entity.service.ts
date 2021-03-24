import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import { SprintModel } from '../../_models/sprint.model';


@Injectable()
export class SprintEntityService
    extends EntityCollectionServiceBase<SprintModel> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('Sprint', serviceElementsFactory);

    }

}