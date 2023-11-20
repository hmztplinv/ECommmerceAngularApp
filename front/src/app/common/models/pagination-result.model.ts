export class PaginationResultModel<T> {
    datas: T;
    pageNumber = 1;
    pageSize = 10;
    isFirstPage = true;
    isLastPage = false;
    totalPageCount = 0;

    // constructor(datas: T) {
    //     this.datas = datas;
    // }
}