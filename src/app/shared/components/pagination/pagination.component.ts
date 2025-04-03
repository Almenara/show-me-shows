import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input('page') public page: number = 1;
  @Input('totalPages') public totalPages: number = 1;
  @Output('pageChange') private pageChange = new EventEmitter<number>();

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.pageChange.emit(this.page);
    }
  }
}
