import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import { ProjectGroupModel } from '../../_models/projectGroup.model';


@Injectable()
export class ProjectGroupEntityService
    extends EntityCollectionServiceBase<ProjectGroupModel> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('ProjectGroup', serviceElementsFactory);

    }

}