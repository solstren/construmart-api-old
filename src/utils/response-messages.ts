export class ResponseMessages {
    static SUCCESS = 'success';
    static ERROR = 'Something went wrong...please retry';
    static CREATE_CATEGORY_SUCCESS = 'Category created successfuly';
    static UPDATE_CATEGORY_SUCCESS = 'Category updated successfully';
    static CATEGORY_EXISTS = 'A category with that name already exists';
    static CATEGORY_DOES_NOT_EXIST = 'That category does not exist';
    static PRODUCT_DOES_NOT_EXIST_IN_CATEGORY = 'That product does not exist in this category';
    static CREATE_PRODUCT_SUCCESS = 'Product created successfuly';
    static UPDATE_PRODUCT_SUCCESS = 'Product updated successfully';
    static PRODUCT_EXISTS = 'A Product with that name already exists';
    static PRODUCT_DOES_NOT_EXIST = 'That Product does not exist';
    static UPDATE_INVENTORY_SUCCESS = 'Inventory has been updated successfully';
    static UPDATE_INVENTORY_HISTORY_FAILURE = 'Failed to update inventory history';
}