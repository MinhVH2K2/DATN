export class CategoriRequest {
    categoriesId?: string;
    categoriesName?: string;
    constructor(categoriesId?: string, categoriesName?: string){
        this.categoriesId = categoriesId;
        this.categoriesName = categoriesName;
    }
}