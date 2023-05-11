/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { GraphService } from "../core/graph.service";

@Component({
    template: ``
})
export abstract class RelatedContentBaseComponent {
    graphService: GraphService = inject(GraphService);
    
    @Output()
    dataLoaded: EventEmitter<any> = new EventEmitter();

    private _data: any[] = [];
    @Input() get data(): any[] {
      return this._data;
    }

    set data(value: any[]) {
      this._data = value;
      this.dataLoaded.emit(value);
    }

    private _searchText = '';
    @Input() get searchText(): string {
      return this._searchText;
    }
  
    set searchText(value: string) {
      this._searchText = value;
      //if (value) {
        this.search(value as string);
      //}
    }

    dataChange(e: CustomEvent) {
      const value = e.detail.response.value[0];
      const hits: any[] = [];
      if (value.hitsContainers && value.hitsContainers[0].hits) {
        for (const hit of value.hitsContainers[0].hits) {
          hits.push(hit);
        }
      }
      this.data = hits;
    }

    abstract search(searchText: string) : Promise<any>;
}