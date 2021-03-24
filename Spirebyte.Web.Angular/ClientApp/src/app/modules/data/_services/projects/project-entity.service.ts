import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import { ProjectModel } from '../../_models/project.model';


@Injectable()
export class ProjectEntityService
    extends EntityCollectionServiceBase<ProjectModel> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('Project', serviceElementsFactory);

    }

}