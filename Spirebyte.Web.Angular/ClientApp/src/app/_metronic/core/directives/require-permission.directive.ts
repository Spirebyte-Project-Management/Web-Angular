import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '../services/permission.service';

@Directive({
    selector: '[requirePermission]',
})
export class RequirePermissionDirective {

    constructor(private view: ViewContainerRef, private route: ActivatedRoute, private templateRef: TemplateRef<any>, private permissionService: PermissionService) { }

    @Input() set requirePermission(permissionKey: string | string[]) {
        if (!permissionKey) {
            return;
        }

        let permissionKeys: string[] = [];
        permissionKeys = permissionKeys.concat(permissionKey);

        this.route.paramMap.subscribe(params => {
            const projectId = params.get('key');

            this.permissionService.getAllowanceByKeys(permissionKeys, projectId).subscribe(res => {
                this.view.clear();
                if(res){
                    this.view.createEmbeddedView(this.templateRef);
                }
            })
        });
    }
}