
type SortOrder = 'ASC' | 'DESC';
import { v4 as uuidv4 } from 'uuid';
export class BaseService {
    protected page: number
    protected limit: number
    protected offset: number
    protected total: number
    protected totalPages: number
    protected searchFieldName: string
    protected searchFieldValue: string
    protected sortBy: string = 'id';
    protected sortOrder: SortOrder = 'ASC';

    setSearchProperties(search: any) {
        this.limit = search.limit || 10;
        this.page = search.page || 1;
        this.offset = (this.page > 1 ? (this.page - 1) : 0) * this.limit;
        this.searchFieldName = search.fieldName || '';
        this.searchFieldValue = search.fieldValue || '';
        this.total = 0;
        this.totalPages = 0;
        this.sortBy = search?.sortBy ?? this.sortBy;
        this.sortOrder = search?.sortOrder ?? this.sortOrder;
    }
    setPage(page: number) {
        this.page = page;
    }
    setLimit(limit: number) {
        this.limit = limit;
    }
    setOffset(offset: number) {
        this.offset = offset;
    }
    setTotal(total: number) {
        this.total = total;
    }
    setTotalPages(totalPages: number) {
        this.totalPages = totalPages;
    }
    setSearchFieldName(searchFieldName: string) {
        this.searchFieldName = searchFieldName;
    }
    setSearchFieldValue(searchFieldValue: string) {
        this.searchFieldValue = searchFieldValue;
    }
    getPage() {
        return this.page;
    }
    getLimit() {
        return this.limit;
    }
    getOffset() {
        return this.offset;
    }
    getTotal() {
        return this.total;
    }
    getTotalPages() {
        return this.totalPages;
    }
    getSearchFieldName() {
        return this.searchFieldName;
    }
    getSearchFieldValue() {
        return this.searchFieldValue;
    }
    getPagination() {
        return {
            page: this.page,
            limit: this.limit,
            offset: this.offset,
            total: this.total,
            totalPages: this.totalPages,
        };
    }
    getSearchField() {
        return {
            fieldName: this.searchFieldName,
            fieldValue: this.searchFieldValue,
        };
    }

    generateOid(): string {
        return uuidv4().replace(/-/g, '');
    }
}