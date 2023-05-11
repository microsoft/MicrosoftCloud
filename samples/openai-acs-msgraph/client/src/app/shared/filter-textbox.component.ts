import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-filter-textbox',
    template: `
        {{ label }} <input type="text" [(ngModel)]="filter" style="width: 250px" />
    `,
    standalone: true,
    imports: [FormsModule]
})
export class FilterTextboxComponent {

    @Input() label = 'Filter Data:';

    private _filter = '';
    @Input() get filter() {
        return this._filter;
    }

    set filter(val: string) {
        this._filter = val;
        this.changed.emit(this.filter); // Raise changed event
    }

    @Output() changed: EventEmitter<string> = new EventEmitter<string>();

}
