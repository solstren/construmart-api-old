import { Tag } from './../entities/tag.entity';
import { TagResponse } from './../models/response-dto/tag-response';
import { Category } from '../entities/category.entity';
import { CategoryResponseDto } from '../models/response-dto/category-response-dto';
import { Product } from '../entities/product.entity';
import { ProductResponse } from '../models/response-dto/product-response';
import { InventoryResponse } from '../models/response-dto/inventory-response-dto';
import { Inventory } from '../entities/inventory.entity';
import { InventoryRequestDto } from '../models/request-dto/inventory-request-dto';
import { InventoryHistory } from '../entities/inventory-history.entity';

export class ObjectMapper {
    public static mapToCategoryResponse(category: Category): CategoryResponseDto {
        let productIDs: number[];
        category.products.forEach((value, index, products) => productIDs.push(value.id));
        //map to response
        const response: CategoryResponseDto = {
            id: category.id,
            name: category.name,
            description: category.description,
            imageFileName: category.imageName,
            dateCreated: category.dateCreated,
            dateUpdated: category.dateUpdated,
            rowVersion: category.rowVersion,
            productIDs: productIDs
        };
        return response;
    }

    public static mapToProductResponse(product: Product): ProductResponse {
        let tag: TagResponse = null;
        if (product.tag) {
            tag = {
                id: product.tag.id,
                name: product.tag.name
            }
        }
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            tag: tag,
            imageName: product.imageName,
            categoryId: product.category.id,
            categoryName: product.category.name,
            dateCreated: product.dateCreated,
            dateUpdated: product.dateUpdated
        };
    }

    public static mapToInventoryResponse(inventory: Inventory | InventoryHistory): InventoryResponse {
        return {
            id: inventory.id,
            initialPrice: inventory.initialPrice,
            initialQuantity: inventory.initialQuatity,
            currentPrice: inventory.currentPrice,
            currentQuantity: inventory.currentQuantity,
            productId: inventory.product.id,
            productName: inventory.product.name,
            dateCreated: inventory.dateCreated,
            dateUpdated: inventory.dateUpdated
        };
    }

    public static mapToInventoryEntity(request: InventoryRequestDto): Inventory {
        let inventory = new Inventory();
        inventory.currentPrice = request.currentPrice;
        inventory.currentQuantity = request.currentQuantity;
        inventory.initialPrice = request.initialPrice;
        inventory.initialQuatity = request.initialQuantity;
        return inventory;
    }

    public static mapToTagResponse(tag: Tag): TagResponse {
        return {
            id: tag.id,
            name: tag.name,
        };
    }
}
